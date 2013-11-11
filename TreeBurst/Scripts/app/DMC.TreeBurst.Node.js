var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        var Node = (function () {
            function Node(opts) {
                this.parentId = null;
                this.content = null;
                this.depth = null;
                this.colour = null;
                this.id = opts.id;
                this.title = opts.title;

                if (opts.parentId) {
                    this.parentId = opts.parentId;
                }
                if (opts.content) {
                    this.content = opts.content;
                }
                if (opts.colour) {
                    this.colour = opts.colour;
                }
            }
            Node.prototype.setDepth = function (depth) {
                this.depth = depth;
            };

            Node.prototype.getDepth = function () {
                return this.depth;
            };

            Node.prototype.getParentId = function () {
                return this.parentId;
            };

            Node.prototype.getId = function () {
                return this.id;
            };

            Node.prototype.isRoot = function () {
                return this.parentId === null;
            };

            Node.prototype.toString = function () {
                return 'id: ' + this.id + ', ' + 'parentId: ' + this.parentId + ', ' + 'depth: ' + this.depth + ', ' + 'title: ' + this.title;
            };
            return Node;
        })();
        TreeBurst.Node = Node;
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
