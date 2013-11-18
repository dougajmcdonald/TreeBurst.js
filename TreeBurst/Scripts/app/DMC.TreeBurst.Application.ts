/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface TreeBurstOptions {
        nodes: Node[];
        canvasElId: string;
        width: number;
        height: number;
        radius: number;
        debug: boolean;
        rotation?: number;
    }

    export enum State {
        Initialised,
        LoadingNodes,
        Drawing,
        Errored
    }

    /**
    * main application entry point
    */
    export class Application {

        private $: JQueryStatic;
        private treeManager: TreeManager;
        private treeCanvas: TreeCanvas;
        private canvasEl: HTMLCanvasElement;

        public appState: State;

        constructor($: JQueryStatic, opts: TreeBurstOptions) {

            if (opts.nodes) {
                this.loadNodes(opts.nodes);                
            } else {
                console.log("Error: No nodes passed to application.")
                this.appState.Errored;
            }

            this.canvasEl = <HTMLCanvasElement>document.getElementById(opts.canvasElId);
            this.setupCanvas(this.canvasEl, opts.width, opts.height);

            this.treeCanvas = new TreeCanvas({
                $: $,
                treeManager: this.treeManager,
                canvas: this.canvasEl,
                radius: opts.radius,
                debug: opts.debug,
                rotation: opts.rotation
            });

            this.appState = State.Initialised;
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

        // load the nodes we recieved into the nodetree
        private loadNodes(nodes: Node[]): void {

            this.treeManager = new TreeManager({
                $: this.$,
                nodes: nodes
            });

            console.log("Successfully loaded (" + nodes.length + ") nodes");

        }        
    }
}