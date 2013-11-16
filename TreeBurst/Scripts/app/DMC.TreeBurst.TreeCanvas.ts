/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface TreeCanvasOptions {
        $: JQueryStatic;
        canvas: HTMLCanvasElement;
        treeManager: TreeManager;
        radius: number;
        debug: boolean;
        rotation?: number;
    }

    export class TreeCanvas {

        private $: JQueryStatic;
        private canvas: HTMLCanvasElement;
        private treeManager: TreeManager;
        private context2d: CanvasRenderingContext2D;
        private width: number;
        private height: number;
        private radius: number;
        private debug: boolean;
        private rotation: number = 0;

        private tooltip: Tooltip;

        private xOrigin: number;
        private yOrigin: number;
        private nodes: CanvasNode[];
        private circle: number = Math.PI * 2;

        private currentColour: string;
        private mouseX: number;
        private mouseY: number;
        private mouseMoveInterval: number;

        private canvasXOffset: number;
        private canvasYOffset: number;

        private rotationStep: number = Math.PI / 8;

        constructor(opts: TreeCanvasOptions) {

            this.$ = opts.$;
            this.canvas = <HTMLCanvasElement>opts.canvas;
            this.treeManager = opts.treeManager;
            this.context2d = this.canvas.getContext("2d");
            this.radius = opts.radius;
            this.debug = opts.debug;

            if (opts.rotation) {
                this.rotation = opts.rotation;
            }

            this.xOrigin = this.canvas.width / 2;
            this.yOrigin = this.canvas.height / 2;

            this.canvasXOffset = this.canvas.getBoundingClientRect().left;
            this.canvasYOffset = this.canvas.getBoundingClientRect().top;

            this.nodes = new Array<CanvasNode>();

            this.createCanvasNodes();

            this.drawTree();

            // set a blank tooltip
            this.tooltip = new Tooltip({
                $: this.$,
                title: '',
                content: '',
                x: 0,
                y: 0
            });

            // setup the handler to detect the current pixel for tooltip
            this.$(this.canvas).on('mousemove', (e: JQueryEventObject) => {

                //this.mouseX = parseInt((e.clientX - this.canvasXOffset).toString(), 10);
                //this.mouseY = parseInt((e.clientY - this.canvasYOffset).toString(), 10);

                this.mouseX = parseInt((e.clientX - this.canvas.getBoundingClientRect().left).toString(), 10);
                this.mouseY = parseInt((e.clientY - this.canvas.getBoundingClientRect().top).toString(), 10);

                this.getNodeInfo(this.mouseX, this.mouseY)

            });

            this.$('#rRight').on('click', (e: JQueryEventObject) => {

                this.rotation -= this.rotationStep;

                if (this.rotation < 0) {
                    this.rotation += this.circle;
                }

                this.clear();

                this.rotate();

                this.drawTree();
            });

            this.$('#rLeft').on('click', (e: JQueryEventObject) => {

                this.rotation += this.rotationStep;

                if (this.rotation > this.circle) {
                    this.rotation -= this.circle;
                }

                this.clear();

                this.rotate();

                this.drawTree();
            });

        }

        private clear(): void {

            // Store the current transformation matrix
            this.context2d.save();

            // Use the identity matrix while clearing the canvas
            this.context2d.setTransform(1, 0, 0, 1, 0, 0);
            this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Restore the transform
            this.context2d.restore();

        }

        public startThrottleTimer(): void {

            this.mouseMoveInterval = window.setInterval(this.getNodeInfo(this.mouseX, this.mouseY), 500);

            if (this.mouseX < 0 || this.mouseY < 0) {
                console.log("clearing time");
                window.clearInterval(this.mouseMoveInterval);
            }            

        }

        public rotate() {

            this.nodes.length = 0;
            this.createCanvasNodes();            

        }

        private getNode(x: number, y: number) : CanvasNode {

            //1. get the radius via basic trig
            var radius = Math.sqrt(Math.pow(x - this.xOrigin, 2) + Math.pow(y - this.yOrigin, 2));
            //console.log(radius);

            //2. get angle between origins x axis and mouse y value
            var arctan = Math.atan2(y - this.yOrigin, x - this.xOrigin);
            var radAngle = (y - this.yOrigin) < 0 ? this.circle + arctan : arctan;

            //2. find the node from the array based on the 
            return this.filterNodeByPosition(radAngle, radius);            

        }

        private filterNodeByPosition(angle: number, radius: number): CanvasNode {

            return this.nodes.filter((node: CanvasNode) => {

                if (node.startRadian < node.endRadian) {

                    return node.startRadian <= angle &&
                        node.endRadian >= angle &&
                        this.radius + (node.depth * this.radius) > radius &&
                        this.radius + ((node.depth > 0 ? node.depth - 1 : - 1) * this.radius) < radius;

                } else {

                    return ((angle >= node.startRadian && angle < this.circle) || (angle <= node.endRadian && angle >= 0)) &&
                        this.radius + (node.depth * this.radius) > radius &&
                        this.radius + ((node.depth > 0 ? node.depth - 1 : - 1) * this.radius) < radius;

                }
            })[0];

        }

        private getNodeInfo(x: number, y: number): void {

            if (x < 0 || y < 0) {
                return;
            }

            var node = this.getNode(x, y);
            $('#mousePosition').text("x: " + x + "  " + "y: " + y);

            if (node) {

                this.tooltip.show();

                this.tooltip.update(x + 200, y - 200, node.title, node.content);

                if (this.debug) {
                    
                    $('#pixelColour').text(node.colour);
                    $('#pixelPallette').css('background-color', node.colour);

                    if (node) {

                        $('#nodeInfo').text(
                            "{ id: " + node.id + ", " +
                            "parentId: " + node.parentId + ", " +
                            "colour: " + node.colour + ", " +
                            "depth: " + node.depth + ", " +
                            "title: " + node.title + ", " +
                            "content: " + node.content +
                            "}");
                    }
                }

            } else {
                this.tooltip.hide();
            }

        }

        private getRandomColour(): string {
            var colour = 'rgba('
            for (var i = 0; i < 3; i++) {
                colour += Math.floor((Math.random() * 255)).toString() + ',';
            }
            colour += '255)';
            return colour;
        }

        public drawTree(): void {

            // sort the nodes by depth, we want to draw from the outside in as we overwrite portions of the outer circle with the inner
            // circles until we reach the root
            var sortedNodes = this.sortByDepth(this.nodes);

            for (var i = sortedNodes.length - 1; i >= 0; i--) {

                var currentNode = sortedNodes[i];

                this.context2d.fillStyle = currentNode.colour;
                this.context2d.beginPath();
                this.context2d.moveTo(this.xOrigin, this.yOrigin);
                this.context2d.arc(this.xOrigin, this.yOrigin, currentNode.radius, currentNode.startRadian, currentNode.endRadian);
                this.context2d.fill();
                this.context2d.closePath();

            }

            console.log(this.nodes);
        }

        private sortByDepth(nodes: CanvasNode[]): CanvasNode[]{

            return this.nodes.sort((a: CanvasNode, b: CanvasNode) => {

                return a.depth - b.depth;
            });
        }

        public createCanvasNodes() {

            // get root
            var root: Node = this.treeManager.getRootNode();
            var canvasNode = <CanvasNode>root;

            if (!canvasNode.colour) {
                canvasNode.colour = this.getRandomColour();
            }
            // todo, work out radius from depth
            canvasNode.radius = this.radius;
            canvasNode.startRadian = 0;
            canvasNode.endRadian = this.circle;

            this.nodes.push(canvasNode);
            this.createCanvasChildren(canvasNode);
        }

        private createCanvasChildren(parentNode: CanvasNode): void {

            // get children
            var children = this.treeManager.getChildren(parentNode);

            // notch is the radian angle needed for each child
            var notch: number = (parentNode.endRadian - parentNode.startRadian) / children.length;

            children.forEach((child: Node, index: number) => {

                var canvasNode = <CanvasNode>child;

                // only set a random colour if we haven't had one provided from our initial data
                if (!canvasNode.colour) {
                    canvasNode.colour = this.getRandomColour();
                }
                // set radius and start/end angles
                canvasNode.radius = (canvasNode.depth + 1) * this.radius;
                canvasNode.startRadian = parentNode.startRadian + (notch * index);
                canvasNode.endRadian = parentNode.startRadian + (notch * (index + 1));

                // add on the rotations but only at the first depth, all others will shunt on respectively as they are based on parent start/ends
                if (canvasNode.depth === 1) {
                    
                    canvasNode.startRadian += this.rotation;
                    canvasNode.endRadian += this.rotation;

                    // cater for wrapping
                    if (canvasNode.startRadian > this.circle) {
                        canvasNode.startRadian -= this.circle;
                    }

                    if (canvasNode.endRadian > this.circle) {
                        canvasNode.endRadian -= this.circle;
                    }
                }

                // push the child onto the canvas tree and create its children
                this.nodes.push(canvasNode);
                this.createCanvasChildren(canvasNode);

            });
        }
    }
}