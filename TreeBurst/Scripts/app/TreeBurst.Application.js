/// <reference path="references.ts" />
var TreeBurst;
(function (TreeBurst) {
    (function (State) {
        State[State["Initialised"] = 0] = "Initialised";
        State[State["LoadingNodes"] = 1] = "LoadingNodes";
        State[State["Drawing"] = 2] = "Drawing";
        State[State["Errored"] = 3] = "Errored";
    })(TreeBurst.State || (TreeBurst.State = {}));
    var State = TreeBurst.State;

    /**
    * main application entry point
    */
    var Application = (function () {
        function Application($, opts) {
            if (opts.nodes) {
                this.loadNodes(opts.nodes);
            } else {
                console.log("Error: No nodes passed to application.");
                this.appState = State.Errored;
            }

            this.canvasEl = document.getElementById(opts.canvasElId);
            this.setupCanvas(this.canvasEl, opts.width, opts.height);
            this.setupPalettes();

            this.treeCanvas = new TreeBurst.TreeCanvas({
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
        Application.prototype.setupCanvas = function (canvas, width, height) {
            // size it up
            canvas.width = width;
            canvas.height = height;

            // centre it horizontally
            var pw = $(canvas).parent().width();
            canvas.style.left = (pw - canvas.width) / 2 + "px";
        };

        Application.prototype.setupPalettes = function () {
            this.paletteManager = new TreeBurst.PaletteManager({
                //greyscalePalette: new Palettes.Greyscale({}),
                randomPalette: new TreeBurst.Palettes.Random({})
            });

            this.paletteManager.Create(TreeBurst.PaletteType.RANDOM);
        };

        Application.prototype.SetPalette = function (paletteIndex) {
            this.paletteManager.Create(paletteIndex);
            this.treeCanvas.drawTree();
        };

        // load the nodes we recieved into the nodetree
        Application.prototype.loadNodes = function (nodes) {
            this.treeManager = new TreeBurst.TreeManager({
                $: this.$,
                nodes: nodes
            });

            console.log("Successfully loaded (" + nodes.length + ") nodes");
        };
        return Application;
    })();
    TreeBurst.Application = Application;
})(TreeBurst || (TreeBurst = {}));
