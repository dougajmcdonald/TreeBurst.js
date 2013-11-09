var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        var NodeTree = (function () {
            function NodeTree(opts) {
                this.$ = opts.$;
                this.nodes = opts.nodes;
                // TODO: Construct a node tree from the nodes
            }
            NodeTree.prototype.Draw = function () {
                $.each(this.nodes, function (index, node) {
                    console.log(node.toString());
                });
            };
            return NodeTree;
        })();
        TreeBurst.NodeTree = NodeTree;
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
//# sourceMappingURL=DMC.TreeBurst.NodeTree.js.map
