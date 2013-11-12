var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        /**
        * main application entry point
        */
        var Application = (function () {
            function Application($, opts) {
                if (opts.nodes) {
                    this.loadNodes(opts.nodes);
                } else {
                    console.log("Error: No nodes passed to application.");
                }
                this.canvasEl = document.getElementById(opts.canvasElId);
                this.setupCanvas(this.canvasEl, opts.width, opts.height);

                this.treeCanvas = new TreeBurst.TreeCanvas({
                    $: $,
                    treeManager: this.treeManager,
                    canvas: this.canvasEl,
                    radius: opts.radius,
                    debug: opts.debug
                });
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
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
