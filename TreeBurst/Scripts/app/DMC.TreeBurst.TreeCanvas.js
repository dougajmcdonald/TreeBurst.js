var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        var TreeCanvas = (function () {
            function TreeCanvas(opts) {
                var _this = this;
                this.circle = Math.PI * 2;
                this.$ = opts.$;
                this.canvas = opts.canvas;
                this.treeManager = opts.treeManager;
                this.context2d = this.canvas.getContext("2d");
                this.radius = opts.radius;

                this.xOrigin = this.canvas.width / 2;
                this.yOrigin = this.canvas.height / 2;

                this.nodes = new Array();

                this.createCanvasNodes();
                this.drawTree();

                // set a blank tooltip
                this.tooltip = new TreeBurst.Tooltip({
                    $: this.$,
                    title: '',
                    content: '',
                    x: 0,
                    y: 0
                });

                // setup the handler to detect the current pixel for tooltip
                $(this.canvas).on('mousemove', function (e) {
                    var x = parseInt((e.clientX - _this.canvas.getBoundingClientRect().left).toString(), 10);
                    var y = parseInt((e.clientY - _this.canvas.getBoundingClientRect().top).toString(), 10);

                    if (x < 0 || y < 0) {
                        return;
                    }

                    var pixel = _this.canvas.getContext("2d").getImageData(x, y, 1, 1);

                    var rgba = "rgba(" + pixel.data[0] + "," + pixel.data[1] + "," + pixel.data[2] + "," + pixel.data[3] + ")";

                    var node = _this.getNodeByColour(rgba);

                    if (node) {
                        _this.tooltip.show();

                        _this.throttle(_this.tooltip.update(e.clientX, e.clientY, node.title, node.content), 1000, _this);
                    } else {
                        _this.tooltip.hide();
                    }
                });
            }
            TreeCanvas.prototype.throttle = function (fn, threshhold, scope) {
                var _this = this;
                threshhold || (threshhold = 250);

                var last, deferTimer;
                return function () {
                    var context = scope || _this;

                    var now = +new Date(), args = arguments;
                    if (last && now < last + threshhold) {
                        // hold on to it
                        clearTimeout(deferTimer);
                        deferTimer = setTimeout(function () {
                            last = now;
                            fn.apply(context, args);
                        }, threshhold);
                    } else {
                        last = now;
                        fn.apply(context, args);
                    }
                };
            };

            TreeCanvas.prototype.getNodeByColour = function (colour) {
                return this.nodes.filter(function (node, index) {
                    return node.colour === colour;
                })[0];
            };

            TreeCanvas.prototype.getRandomColour = function () {
                var colour = 'rgba(';
                for (var i = 0; i < 3; i++) {
                    colour += Math.floor((Math.random() * 255)).toString() + ',';
                }
                colour += '255)';
                return colour;
            };

            TreeCanvas.prototype.drawTree = function () {
                // sort the nodes by depth, we want to draw from the outside in as we overwrite portions of the outer circle with the inner
                // circles until we reach the root
                var sortedNodes = this.sortByDepth(this.nodes);

                for (var i = sortedNodes.length - 1; i >= 0; i--) {
                    var currentNode = sortedNodes[i];

                    this.context2d.fillStyle = currentNode.colour;
                    this.context2d.beginPath();
                    this.context2d.moveTo(this.xOrigin, this.yOrigin);
                    this.context2d.arc(this.xOrigin, this.yOrigin, currentNode.radius, currentNode.startRadian, currentNode.endRadian);
                    this.context2d.fill();
                    this.context2d.closePath();
                }
            };

            TreeCanvas.prototype.sortByDepth = function (nodes) {
                return this.nodes.sort(function (a, b) {
                    return a.depth - b.depth;
                });
            };

            TreeCanvas.prototype.createCanvasNodes = function () {
                // get root
                var root = this.treeManager.getRootNode();
                var canvasNode = root;

                if (!canvasNode.colour) {
                    canvasNode.colour = this.getRandomColour();
                }

                // todo, work out radius from depth
                canvasNode.radius = this.radius;
                canvasNode.startRadian = 0;
                canvasNode.endRadian = this.circle;

                this.nodes.push(canvasNode);
                this.createCanvasChildren(canvasNode);
            };

            TreeCanvas.prototype.createCanvasChildren = function (parentNode) {
                var _this = this;
                // get children
                var children = this.treeManager.getChildren(parentNode);

                // notch is the radian angle needed for each child
                var notch = (parentNode.endRadian - parentNode.startRadian) / children.length;

                children.forEach(function (child, index) {
                    var canvasNode = child;

                    if (!canvasNode.colour) {
                        canvasNode.colour = _this.getRandomColour();
                    }

                    // set radius and start/end angles
                    canvasNode.radius = (canvasNode.depth + 1) * _this.radius;
                    canvasNode.startRadian = parentNode.startRadian + (notch * index);
                    canvasNode.endRadian = parentNode.startRadian + (notch * (index + 1));

                    // push the child onto the canvas tree and create its children
                    _this.nodes.push(canvasNode);
                    _this.createCanvasChildren(canvasNode);
                });
            };
            return TreeCanvas;
        })();
        TreeBurst.TreeCanvas = TreeCanvas;
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
