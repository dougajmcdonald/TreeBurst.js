/// <reference path="references.ts" />
module DMC.TreeBurst {


    export interface TreeCanvasOptions {

        canvas: HTMLCanvasElement;
        treeManager: TreeManager;
        radius: number;
    }

    export class TreeCanvas {

        private canvas: HTMLCanvasElement;
        private treeManager: TreeManager;
        private context2d: CanvasRenderingContext2D;
        private width: number;
        private height: number;
        private radius: number;

        private xOrigin: number;
        private yOrigin: number;
        private nodes: CanvasNode[];
        private circle: number = Math.PI * 2;

        constructor(opts: TreeCanvasOptions) {

            this.canvas = <HTMLCanvasElement>opts.canvas;
            this.treeManager = opts.treeManager;
            this.context2d = this.canvas.getContext("2d");
            this.radius = opts.radius;

            this.xOrigin = this.canvas.width / 2;
            this.yOrigin = this.canvas.height / 2;

            this.nodes = new Array<CanvasNode>();

            this.createCanvasNodes();
            this.drawTree();

        }

        public getPixelColour(): string {

            return "";

        }

        private getRandomColour(): string {
            var colour = '#'
            for (var i = 0; i < 6; i++) {
                colour += Math.floor((Math.random() * 9)).toString();
            }
            return colour;
        }

        public drawTree(): void {

            // sort the nodes by depth, we want to draw from the outside in as we overwrite portions of the outer circle with the inner
            // circles until we reach the root
            var sortedNodes = this.nodes.sort((a: CanvasNode, b: CanvasNode) => {
                return a.getDepth() - b.getDepth();
            });
                
            var currentNode = sortedNodes.pop();

            while (currentNode) {
            
                this.context2d.fillStyle = currentNode.colour;
                this.context2d.beginPath();
                this.context2d.moveTo(this.xOrigin, this.yOrigin);
                this.context2d.arc(this.xOrigin, this.yOrigin, currentNode.radius, currentNode.startRadian, currentNode.endRadian);
                this.context2d.fill();
                this.context2d.closePath();

                currentNode = this.nodes.pop();
            }

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
                canvasNode.radius = (canvasNode.getDepth() + 1) * this.radius;     
                canvasNode.startRadian = parentNode.startRadian + (notch * index);
                canvasNode.endRadian = parentNode.startRadian + (notch * (index + 1));                

                // push the child onto the canvas tree and create its children
                this.nodes.push(canvasNode);
                this.createCanvasChildren(canvasNode);

            });
        }
    }
}