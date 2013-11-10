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

        private getRandomColour(): string {
            var colour = '#'
            for (var i = 0; i < 6; i++) {
                colour += Math.floor((Math.random() * 9)).toString();
            }
            return colour;
        }

        public drawTree(): void {

            // sort the nodes by depth
            var sortedNodes = this.nodes.sort((a: CanvasNode, b: CanvasNode) => {

                return a.getDepth() - b.getDepth();

                //var aDepth = a.getDepth();
                //var bDepth = b.getDepth();
                //var aId = a.getId();
                //var bId = b.getId();
                
                //return (aDepth < bDepth) ? -1 : (aDepth > bDepth) ? 1 : ((aId > bId) ? -1 : (aId < bId) ? 1 : 0);

            });
                
            var currentNode = sortedNodes.pop();

            while (currentNode) {

                console.log("Drawing:");
                console.log(currentNode);
            
                this.context2d.fillStyle = currentNode.colour;
                this.context2d.beginPath();
                this.context2d.moveTo(this.xOrigin, this.yOrigin);
                this.context2d.arc(this.xOrigin, this.yOrigin, currentNode.radius, currentNode.startRadian, currentNode.endRadian);
                console.log("arc(" + this.xOrigin + "," + this.yOrigin + "," + currentNode.radius + "," + currentNode.startRadian + "," + currentNode.endRadian + ")");
                this.context2d.fill();
                this.context2d.closePath();

                currentNode = this.nodes.pop();
            }

        }

        public createCanvasNodes() {

            // get root
            var root: Node = this.treeManager.getRootNode();

            var canvasNode = <CanvasNode>root;
            console.log(canvasNode);

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
            // draw children
            var children = this.treeManager.getChildren(parentNode);

            children.forEach((child: Node, index: number) => {

                var canvasNode = <CanvasNode>child;                

                // only set a random colour if we haven't had one provided from our initial data
                if (!canvasNode.colour) {
                    canvasNode.colour = this.getRandomColour();
                }

                canvasNode.radius = (canvasNode.getDepth() + 1) * this.radius;                

                canvasNode.startRadian = parentNode.startRadian + ((parentNode.endRadian / children.length) * index);
                console.log("pStart:" + parentNode.startRadian);
                console.log("cStart: " + canvasNode.startRadian);


                canvasNode.endRadian = parentNode.startRadian + ((parentNode.endRadian / children.length) * (index + 1));;                
                console.log("pEnd:" + parentNode.endRadian);
                console.log("cEnd: " + canvasNode.endRadian);               

                this.nodes.push(canvasNode);
                this.createCanvasChildren(canvasNode);

            });
        }
    }
}