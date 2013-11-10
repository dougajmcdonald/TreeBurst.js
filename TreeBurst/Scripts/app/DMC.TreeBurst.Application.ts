/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface TreeBurstOptions {
        name: string;
        nodes: Node[];
        canvasEl: HTMLCanvasElement;
        width: number;
        height: number;
        radius: number;
    }

    /**
    * main application entry point
    */
    export class Application {

        private $: JQueryStatic;
        private treeManager: TreeManager;
        private treeCanvas: TreeCanvas;
        private canvasEl: HTMLCanvasElement;

        constructor($: JQueryStatic, opts: TreeBurstOptions) {

            console.log("Welcome to TreeBurst: " + opts.name);

            if (opts.nodes) {
                this.loadNodes(opts.nodes);
            } else {
                console.log("Error: No nodes passed to application.")
            }
            this.canvasEl = opts.canvasEl;
            this.setupCanvas(opts.canvasEl, opts.width, opts.height);

            this.treeCanvas = new TreeCanvas({
                treeManager: this.treeManager,
                canvas: opts.canvasEl,
                radius: opts.radius
            });

        }

        // setup the canvas for use
        private setupCanvas(canvas: HTMLCanvasElement, width: number, height: number): void {

            // size it up
            canvas.width = width; 
            canvas.height = height;

            // centre it horizontally
            var pw = $(canvas).parent().width();
            canvas.style.left = (pw - canvas.width) / 2 + "px";
        }

        public clearCanvas(): void {

            this.canvasEl.width = 0;
            this.canvasEl.height = 0;

        }

        // load the nodes we recieved into the nodetree
        private loadNodes(nodes: Node[]) : void {

            this.treeManager = new TreeManager({
                $: this.$,
                nodes: nodes
            });

            console.log("Successfully loaded (" + nodes.length + ") nodes");

        }
    }
}