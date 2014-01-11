/// <reference path="references.ts" />
var TreeBurst;
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
        Node.prototype.isRoot = function () {
            return this.parentId === null;
        };

        Node.prototype.toString = function () {
            return 'id: ' + this.id + ', ' + 'parentId: ' + this.parentId + ', ' + 'depth: ' + this.depth + ', ' + 'title: ' + this.title;
        };
        return Node;
    })();
    TreeBurst.Node = Node;
})(TreeBurst || (TreeBurst = {}));
