/// <reference path="references.ts" />
module TreeBurst {

    //jQuery plugin bits
    //function init($: JQueryStatic, opts: TreeBurstOptions) {
    //    return new Application($, opts);
    //}

    //// methods available through jQuery plugin
    //export function selectPalette(index: number) {
        
    //}

    //export function drawTree(nodeSetIndex: number) {

    //}


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
        private paletteManager: PaletteManager;
        private canvasEl: HTMLCanvasElement;

        public appState: State;

        constructor($: JQueryStatic, opts: TreeBurstOptions) {

            if (opts.nodes) {
                this.loadNodes(opts.nodes);                
            } else {
                console.log("Error: No nodes passed to application.")
                this.appState = State.Errored;
            }

            this.canvasEl = <HTMLCanvasElement>document.getElementById(opts.canvasElId);
            this.setupCanvas(this.canvasEl, opts.width, opts.height);
            this.setupPalettes();

            this.treeCanvas = new TreeCanvas({
                $: $,
                treeManager: this.treeManager,
                canvas: this.canvasEl,
                radius: opts.radius,
                debug: opts.debug,
                rotation: opts.rotation,
                paletteManager: this.paletteManager
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

        private setupPalettes(): void {

            this.paletteManager = new PaletteManager({
                //greyscalePalette: new Palettes.Greyscale({}),
                randomPalette: new Palettes.Random({})               
            });

            this.paletteManager.Create(PaletteType.RANDOM);
        }

        public SetPalette(paletteIndex: number) : void {
            this.paletteManager.Create(paletteIndex);
            this.treeCanvas.drawTree();
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