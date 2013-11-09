var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        var Node = (function () {
            function Node(opts) {
                this.parentId = null;
                this.content = null;
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
            Node.prototype.toString = function () {
                return 'id: ' + this.id + ',' + 'parentId: ' + this.parentId + ',' + 'title: ' + this.title;
            };
            return Node;
        })();
        TreeBurst.Node = Node;
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
//# sourceMappingURL=DMC.TreeBurst.Node.js.map
