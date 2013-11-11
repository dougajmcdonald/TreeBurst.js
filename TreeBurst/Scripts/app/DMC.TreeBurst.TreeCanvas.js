var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        var TreeCanvas = (function () {
            function TreeCanvas(opts) {
                this.circle = Math.PI * 2;
                this.canvas = opts.canvas;
                this.treeManager = opts.treeManager;
                this.context2d = this.canvas.getContext("2d");
                this.radius = opts.radius;

                this.xOrigin = this.canvas.width / 2;
                this.yOrigin = this.canvas.height / 2;

                this.nodes = new Array();

                this.createCanvasNodes();
                this.drawTree();
            }
            TreeCanvas.prototype.getPixelColour = function () {
                return "";
            };

            TreeCanvas.prototype.getRandomColour = function () {
                var colour = '#';
                for (var i = 0; i < 6; i++) {
                    colour += Math.floor((Math.random() * 9)).toString();
                }
                return colour;
            };

            TreeCanvas.prototype.drawTree = function () {
                // sort the nodes by depth, we want to draw from the outside in as we overwrite portions of the outer circle with the inner
                // circles until we reach the root
                var sortedNodes = this.nodes.sort(function (a, b) {
                    return a.getDepth() - b.getDepth();
                });

                var currentNode = sortedNodes.pop();

                while (currentNode) {
                    this.context2d.fillStyle = currentNode.colour;
                    this.context2d.beginPath();
                    this.context2d.moveTo(this.xOrigin, this.yOrigin);
                    this.context2d.arc(this.xOrigin, this.yOrigin, currentNode.radius, currentNode.startRadian, currentNode.endRadian);
                    this.context2d.fill();
                    this.context2d.closePath();

                    currentNode = this.nodes.pop();
                }
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
                    canvasNode.radius = (canvasNode.getDepth() + 1) * _this.radius;
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
