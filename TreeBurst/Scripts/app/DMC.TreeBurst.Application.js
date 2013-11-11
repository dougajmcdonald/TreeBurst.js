var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        /**
        * main application entry point
        */
        var Application = (function () {
            function Application($, opts) {
                console.log("Welcome to TreeBurst");

                if (opts.nodes) {
                    this.loadNodes(opts.nodes);
                } else {
                    console.log("Error: No nodes passed to application.");
                }
                this.canvasEl = document.getElementById(opts.canvasElId);
                this.setupCanvas(this.canvasEl, opts.width, opts.height);

                this.treeCanvas = new TreeBurst.TreeCanvas({
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
            Application.prototype.setupDebugControls = function () {
                var _this = this;
                // setup the handler to detect the current pixel for tooltip
                $(this.canvasEl).on('mousemove', function (e) {
                    var x = parseInt((e.clientX - _this.canvasEl.getBoundingClientRect().left).toString(), 10);
                    var y = parseInt((e.clientY - _this.canvasEl.getBoundingClientRect().top).toString(), 10);

                    if (x < 0 || y < 0) {
                        return;
                    }

                    var pixel = _this.canvasEl.getContext("2d").getImageData(x, y, 1, 1);

                    var rgba = "rgba(" + pixel.data[0] + ", " + pixel.data[1] + ", " + pixel.data[2] + ", " + pixel.data[3] + ")";

                    $('#mousePosition').text("x: " + x + "  " + "y: " + y);
                    $('#pixelColour').text(rgba);
                    $('#pixelPallette').css('background-color', rgba);
                });
            };

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
