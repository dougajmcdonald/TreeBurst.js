/// <reference path="references.ts" />
var TreeBurst;
(function (TreeBurst) {
    var TreeCanvas = (function () {
        function TreeCanvas(opts) {
            var _this = this;
            this.rotation = 0;
            this.circle = Math.PI * 2;
            this.rotationStep = Math.PI / 8;
            this.mouseRotation = false;
            this.$ = opts.$;
            this.canvas = opts.canvas;
            this.treeManager = opts.treeManager;
            this.paletteManager = opts.paletteManager;
            this.context2d = this.canvas.getContext("2d");
            this.radius = opts.radius;
            this.debug = opts.debug;

            if (opts.rotation) {
                this.rotation = opts.rotation;
            }

            this.xOrigin = this.canvas.width / 2;
            this.yOrigin = this.canvas.height / 2;

            this.canvasXOffset = this.canvas.getBoundingClientRect().left;
            this.canvasYOffset = this.canvas.getBoundingClientRect().top;

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
            this.$(this.canvas).off().on('mousemove', function (e) {
                _this.mouseX = parseInt((e.clientX - _this.canvasXOffset).toString(), 10);
                _this.mouseY = parseInt((e.clientY - _this.canvasYOffset).toString(), 10);

                _this.getNodeInfo(_this.mouseX, _this.mouseY);
            });

            this.$('#enableMouseRotate').on('click', function (e) {
                _this.mouseRotation = !_this.mouseRotation;
            });

            this.$('#rRight').off().on('click', function (e) {
                _this.rotation -= _this.rotationStep;
                _this.rotate();
            });

            this.$('#rLeft').off().on('click', function (e) {
                _this.rotation += _this.rotationStep;
                _this.rotate();
            });
        }
        TreeCanvas.prototype.drawTree = function () {
            // sort the nodes by depth, we want to draw from the outside in as we overwrite portions of the outer circle with the inner
            // circles until we reach the root
            var sortedNodes = this.sortByDepth(this.nodes);

            for (var i = sortedNodes.length - 1; i >= 0; i--) {
                var currentNode = sortedNodes[i];

                this.context2d.fillStyle = currentNode.colour.rgba;
                this.context2d.beginPath();
                this.context2d.moveTo(this.xOrigin, this.yOrigin);
                this.context2d.arc(this.xOrigin, this.yOrigin, currentNode.radius, currentNode.startRadian, currentNode.endRadian);
                this.context2d.fill();
                this.context2d.closePath();
            }
        };

        TreeCanvas.prototype.createCanvasNodes = function () {
            // get root
            var root = this.treeManager.getRootNode();
            var canvasNode = root;

            if (!canvasNode.colour) {
                canvasNode.colour = this.paletteManager.GetColour();
                //this.getRandomColour();
            }

            // todo, work out radius from depth
            canvasNode.radius = this.radius;
            canvasNode.startRadian = 0;
            canvasNode.endRadian = this.circle;

            this.nodes.push(canvasNode);
            this.createCanvasChildren(canvasNode);
        };

        TreeCanvas.prototype.rotate = function () {
            // clear the canvas
            this.clear();

            if (this.rotation < 0) {
                this.rotation += this.circle;
            } else if (this.rotation > this.circle) {
                this.rotation -= this.circle;
            }

            // clear the nodes and re-create them based on the new rotation
            this.nodes.length = 0;
            this.createCanvasNodes();

            // redraw the tree with newly rotated nodes
            this.drawTree();
        };

        TreeCanvas.prototype.clear = function () {
            // Store the current transformation matrix
            this.context2d.save();

            // Use the identity matrix while clearing the canvas
            this.context2d.setTransform(1, 0, 0, 1, 0, 0);
            this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Restore the transform
            this.context2d.restore();
        };

        TreeCanvas.prototype.mouseRotate = function (x, y) {
            if (x > this.xOrigin) {
                // right
                this.rotation += 0.01;
            }
            if (x < this.xOrigin) {
                // left
                this.rotation -= 0.01;
            }

            //// top right quadrant
            //this.rotation += 0.1;
            //// top left quadrant
            //this.rotation -= 0.1;
            //// bottom right quandrant
            //this.rotation += 0.1;
            //// bottom left quandrant
            //this.rotation -= 0.1;
            this.rotate();
        };

        TreeCanvas.prototype.getNode = function (x, y) {
            //1. get the radius via basic trig
            var radius = Math.sqrt(Math.pow(x - this.xOrigin, 2) + Math.pow(y - this.yOrigin, 2));

            //2. get angle between origins x axis and mouse y value
            var arctan = Math.atan2(y - this.yOrigin, x - this.xOrigin);
            var radAngle = (y - this.yOrigin) < 0 ? this.circle + arctan : arctan;

            //2. find the node from the array based on the
            return this.filterNodeByPosition(radAngle, radius);
        };

        TreeCanvas.prototype.filterNodeByPosition = function (angle, radius) {
            var _this = this;
            return this.nodes.filter(function (node) {
                if (node.startRadian < node.endRadian) {
                    return angle >= node.startRadian && angle <= node.endRadian && _this.radius + (node.depth * _this.radius) > radius && _this.radius + ((node.depth > 0 ? node.depth - 1 : -1) * _this.radius) < radius;
                } else {
                    return ((angle >= node.startRadian && angle < _this.circle) || (angle <= node.endRadian && angle >= 0)) && _this.radius + (node.depth * _this.radius) > radius && _this.radius + ((node.depth > 0 ? node.depth - 1 : -1) * _this.radius) < radius;
                }
            })[0];
        };

        TreeCanvas.prototype.getNodeInfo = function (x, y) {
            if (x < 0 || y < 0) {
                return;
            }

            var node = this.getNode(x, y);

            if (node) {
                this.tooltip.show();

                this.tooltip.update(x + 100, y - 200, node.title, node.content);

                if (this.debug) {
                    $('#mousePosition').text("x: " + x + "  " + "y: " + y);
                    $('#pixelColour').text(node.colour.rgba);
                    $('#pixelPallette').css('background-color', node.colour.rgba);

                    if (node) {
                        $('#nodeInfo').text("{ id: " + node.id + ", " + "parentId: " + node.parentId + ", " + "colour: " + node.colour.rgba + ", " + "depth: " + node.depth + ", " + "title: " + node.title + ", " + "content: " + node.content + "}");
                    }
                }
            } else {
                if (this.mouseRotation) {
                    this.mouseRotate(x, y);
                }
                this.tooltip.hide();
            }
        };

        TreeCanvas.prototype.sortByDepth = function (nodes) {
            return this.nodes.sort(function (a, b) {
                return a.depth - b.depth;
            });
        };

        TreeCanvas.prototype.createCanvasChildren = function (parentNode) {
            var _this = this;
            // get children
            var children = this.treeManager.getChildren(parentNode);

            var notch;

            if (parentNode.endRadian > parentNode.startRadian) {
                notch = (parentNode.endRadian - parentNode.startRadian) / children.length;
            } else {
                notch = ((this.circle - parentNode.startRadian) + parentNode.endRadian) / children.length;
            }

            children.forEach(function (child, index) {
                var canvasNode = child;

                if (!canvasNode.colour) {
                    canvasNode.colour = _this.paletteManager.GetColour();
                }

                // set radius and start/end angles
                canvasNode.radius = (canvasNode.depth + 1) * _this.radius;
                canvasNode.startRadian = parentNode.startRadian + (notch * index);
                canvasNode.endRadian = parentNode.startRadian + (notch * (index + 1));

                if (canvasNode.depth === 1) {
                    canvasNode.startRadian += _this.rotation;
                    canvasNode.endRadian += _this.rotation;
                }

                if (canvasNode.startRadian > _this.circle) {
                    canvasNode.startRadian -= _this.circle;
                }

                if (canvasNode.endRadian > _this.circle) {
                    canvasNode.endRadian -= _this.circle;
                }

                // push the child onto the canvas tree and create its children
                _this.nodes.push(canvasNode);
                _this.createCanvasChildren(canvasNode);
            });
        };
        return TreeCanvas;
    })();
    TreeBurst.TreeCanvas = TreeCanvas;
})(TreeBurst || (TreeBurst = {}));
