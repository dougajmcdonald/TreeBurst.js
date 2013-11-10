var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        /**
        * main application entry point
        */
        var Application = (function () {
            function Application($, opts) {
                console.log("Welcome to TreeBurst: " + opts.name);

                if (opts.nodes) {
                    this.loadNodes(opts.nodes);
                } else {
                    console.log("Error: No nodes passed to application.");
                }
                this.canvasEl = opts.canvasEl;
                this.setupCanvas(opts.canvasEl, opts.width, opts.height);

                this.treeCanvas = new TreeBurst.TreeCanvas({
                    treeManager: this.treeManager,
                    canvas: opts.canvasEl,
                    radius: opts.radius
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

            Application.prototype.clearCanvas = function () {
                this.canvasEl.width = 0;
                this.canvasEl.height = 0;
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
//# sourceMappingURL=DMC.TreeBurst.Application.js.map
