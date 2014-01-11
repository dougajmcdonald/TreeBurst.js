/// <reference path="references.ts" />
module TreeBurst {

    export interface TreeCanvasOptions {
        $: JQueryStatic;
        canvas: HTMLCanvasElement;
        treeManager: TreeManager;
        paletteManager: PaletteManager;
        radius: number;
        debug: boolean;
        rotation?: number;
    }

    export class TreeCanvas {

        private $: JQueryStatic;
        private canvas: HTMLCanvasElement;
        private treeManager: TreeManager;
        private paletteManager: PaletteManager;  
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
        private mouseRotation: boolean = false;
        private timeout: number;

        constructor(opts: TreeCanvasOptions) {

            this.$ = opts.$;
            this.canvas = <HTMLCanvasElement>opts.canvas;
            this.treeManager = opts.treeManager;
            this.paletteManager = opts.paletteManager;
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
            this.$(this.canvas).off().on('mousemove', (e: JQueryEventObject) => {

                this.mouseX = parseInt((e.clientX - this.canvasXOffset).toString(), 10);
                this.mouseY = parseInt((e.clientY - this.canvasYOffset).toString(), 10);

                this.getNodeInfo(this.mouseX, this.mouseY);

            });


            this.$('#enableMouseRotate').on('click', (e: JQueryEventObject) => {
                this.mouseRotation = !this.mouseRotation;
            });

            this.$('#rRight').off().on('click', (e: JQueryEventObject) => {
                this.rotation -= this.rotationStep;
                this.rotate();
            });

            this.$('#rLeft').off().on('click', (e: JQueryEventObject) => {
                this.rotation += this.rotationStep;
                this.rotate();
            });

        }

        public drawTree(): void {

            // sort the nodes by depth, we want to draw from the outside in as we overwrite portions of the outer circle with the inner
            // circles until we reach the root
            var sortedNodes = this.sortByDepth(this.nodes);

            for (var i = sortedNodes.length - 1; i >= 0; i--) {

                var currentNode = sortedNodes[i];

                this.context2d.fillStyle = currentNode.colour.rgba;
                this.context2d.beginPath();
                this.context2d.moveTo(this.xOrigin, this.yOrigin);
                this.context2d.arc(this.xOrigin, this.yOrigin, currentNode.radius, currentNode.startRadian, currentNode.endRadian);
                this.context2d.fill();
                this.context2d.closePath();

            }
        }

        public createCanvasNodes() {

            // get root
            var root: Node = this.treeManager.getRootNode();
            var canvasNode = <CanvasNode>root;

            if (!canvasNode.colour) {
                canvasNode.colour = this.paletteManager.GetColour();
                //this.getRandomColour();
            }
            // todo, work out radius from depth
            canvasNode.radius = this.radius;
            canvasNode.startRadian = 0;
            canvasNode.endRadian = this.circle;

            this.nodes.push(canvasNode);
            this.createCanvasChildren(canvasNode);
        }

        private rotate() {

            // clear the canvas
            this.clear();

            // establise the rotation and ensure between 0 and 2pie
            if (this.rotation < 0) {
                this.rotation += this.circle;
            } else if (this.rotation > this.circle) {
                this.rotation -= this.circle;
            }

            // clear the nodes and re-create them based on the new rotation
            this.nodes.length = 0;
            this.createCanvasNodes();

            // redraw the tree with newly rotated nodes
            this.drawTree();

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

        private mouseRotate(x: number, y: number): void {

            if (x > this.xOrigin) {
                // right
                this.rotation += 0.01;
            }
            if (x < this.xOrigin) {
                // left
                this.rotation -= 0.01;
            }

            //// top right quadrant
            //this.rotation += 0.1;
            //// top left quadrant
            //this.rotation -= 0.1;
            //// bottom right quandrant
            //this.rotation += 0.1;
            //// bottom left quandrant
            //this.rotation -= 0.1;
            this.rotate();

        }

        private getNode(x: number, y: number): CanvasNode {

            //1. get the radius via basic trig
            var radius = Math.sqrt(Math.pow(x - this.xOrigin, 2) + Math.pow(y - this.yOrigin, 2));

            //2. get angle between origins x axis and mouse y value
            var arctan = Math.atan2(y - this.yOrigin, x - this.xOrigin);
            var radAngle = (y - this.yOrigin) < 0 ? this.circle + arctan : arctan;

            //2. find the node from the array based on the 
            return this.filterNodeByPosition(radAngle, radius);

        }

        private filterNodeByPosition(angle: number, radius: number): CanvasNode {

            return this.nodes.filter((node: CanvasNode) => {

                //TODO: clean this up
                if (node.startRadian < node.endRadian) {
                    return angle >= node.startRadian &&
                        angle <= node.endRadian &&
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

            if (node) {

                this.tooltip.show();

                this.tooltip.update(x + 100, y - 200, node.title, node.content);

                if (this.debug) {

                    $('#mousePosition').text("x: " + x + "  " + "y: " + y);
                    $('#pixelColour').text(node.colour.rgba);
                    $('#pixelPallette').css('background-color', node.colour.rgba);

                    if (node) {

                        $('#nodeInfo').text(
                            "{ id: " + node.id + ", " +
                            "parentId: " + node.parentId + ", " +
                            "colour: " + node.colour.rgba + ", " +
                            "depth: " + node.depth + ", " +
                            "title: " + node.title + ", " +
                            "content: " + node.content +
                            "}");
                    }
                }

            } else {
                if (this.mouseRotation) {
                    this.mouseRotate(x, y);
                }
                this.tooltip.hide();
            }
        }

        private sortByDepth(nodes: CanvasNode[]): CanvasNode[] {

            return this.nodes.sort((a: CanvasNode, b: CanvasNode) => {

                return a.depth - b.depth;
            });
        }

        private createCanvasChildren(parentNode: CanvasNode): void {

            // get children
            var children = this.treeManager.getChildren(parentNode);

            var notch: number;

            //TODO: clean this up
            if (parentNode.endRadian > parentNode.startRadian) {
                notch = (parentNode.endRadian - parentNode.startRadian) / children.length;
            } else {
                notch = ((this.circle - parentNode.startRadian) + parentNode.endRadian) / children.length;
            }

            children.forEach((child: Node, index: number) => {

                var canvasNode = <CanvasNode>child;

                // only set a random colour if we haven't had one provided from our initial data
                if (!canvasNode.colour) {
                    canvasNode.colour = this.paletteManager.GetColour();
                }
                // set radius and start/end angles
                canvasNode.radius = (canvasNode.depth + 1) * this.radius;
                canvasNode.startRadian = parentNode.startRadian + (notch * index);
                canvasNode.endRadian = parentNode.startRadian + (notch * (index + 1));

                // add on the rotations but only at the first depth, all others will shunt on respectively as they are based on parent start/ends
                if (canvasNode.depth === 1) {
                    canvasNode.startRadian += this.rotation;
                    canvasNode.endRadian += this.rotation;
                }

                // cater for wrapping at all levels, so anything over a 2pies has 2pies taken away
                // TODO: decide if this is needed or not
                if (canvasNode.startRadian > this.circle) {
                    canvasNode.startRadian -= this.circle;
                }

                if (canvasNode.endRadian > this.circle) {
                    canvasNode.endRadian -= this.circle;
                }

                // push the child onto the canvas tree and create its children
                this.nodes.push(canvasNode);
                this.createCanvasChildren(canvasNode);

            });
        }
    }
}