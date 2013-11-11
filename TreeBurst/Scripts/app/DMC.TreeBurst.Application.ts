/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface TreeBurstOptions {
        nodes: Node[];
        canvasElId: string;
        width: number;
        height: number;
        radius: number;
        debug: boolean;
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

            if (opts.nodes) {
                this.loadNodes(opts.nodes);
            } else {
                console.log("Error: No nodes passed to application.")
            }
            this.canvasEl = <HTMLCanvasElement>document.getElementById(opts.canvasElId);
            this.setupCanvas(this.canvasEl, opts.width, opts.height);

            this.treeCanvas = new TreeCanvas({
                $: $,
                treeManager: this.treeManager,
                canvas: this.canvasEl,
                radius: opts.radius
            });

            if (opts.debug) {
                this.setupDebugControls();
            } else {
                $("#debugControls").empty().hide();
            }
        }

        private setupDebugControls(): void {

            // setup the handler to detect the current pixel for tooltip
            $(this.canvasEl).on('mousemove', (e: JQueryEventObject) => {

                var x = parseInt((e.clientX - this.canvasEl.getBoundingClientRect().left).toString(), 10);
                var y = parseInt((e.clientY - this.canvasEl.getBoundingClientRect().top).toString(), 10);

                if (x < 0 || y < 0) {
                    return;
                }

                var pixel = this.canvasEl.getContext("2d").getImageData(x, y, 1, 1);

                var rgba = "rgba(" + pixel.data[0] + "," + pixel.data[1] + "," + pixel.data[2] + "," + pixel.data[3] + ")";

                $('#mousePosition').text("x: " + x + "  " + "y: " + y);
                $('#pixelColour').text(rgba);
                $('#pixelPallette').css('background-color', rgba);

                var node: CanvasNode = this.treeCanvas.getNodeByColour(rgba);

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