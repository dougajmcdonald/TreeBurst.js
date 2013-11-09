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

        constructor(opts: TreeCanvasOptions) {

            this.canvas = <HTMLCanvasElement>opts.canvas;
            this.treeManager = opts.treeManager;
            this.context2d = this.canvas.getContext("2d");
            this.radius = opts.radius;

            this.xOrigin = this.canvas.width / 2;
            this.yOrigin = this.canvas.height / 2;

            this.draw();

        }


        public draw() {

            var root: Node = this.treeManager.getRootNode();

            this.context2d.fillStyle = "#123456";
            this.context2d.beginPath();
            this.context2d.arc(this.xOrigin, this.yOrigin, this.radius, 0, 2 * Math.PI);
            this.context2d.fill();

        }
    }
}