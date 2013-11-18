var DMC;
(function (DMC) {
    /// <reference path="references.ts" />
    (function (TreeBurst) {
        var TreeManager = (function () {
            function TreeManager(opts) {
                this.$ = opts.$;
                this.nodes = opts.nodes;

                // TODO: Construct a node tree from the nodes
                this.parseNodes();
            }
            // parse all nodes in the tree, setting their tier
            TreeManager.prototype.parseNodes = function () {
                // set the root
                var depth = 0;
                this.root = this.getRootNode();
                this.root.depth = depth;

                // then recursively set tiers on all children
                this.parseChildren(this.root, depth);
            };

            //private createRandomTree(numberOfNodes: number): Node[] {
            //    var nodes = new Array<Node>();
            //    var tiers = Math.floor(Math.random() * numberOfNodes / 10);
            //    for (var i = 0; i < numberOfNodes % tiers; i++) {
            //    }
            //}
            TreeManager.prototype.getNodes = function () {
                return this.nodes;
            };

            TreeManager.prototype.getRootNode = function () {
                var root;

                $.each(this.nodes, function (index, node) {
                    if (node.isRoot()) {
                        root = node;
                    }
                });

                if (!root) {
                    console.log("Error: No root node defined within nodes");
                }

                return root;
            };

            TreeManager.prototype.parseChildren = function (node, depth) {
                node.depth = depth;

                var kids = this.getChildren(node);

                if (kids.length > 0) {
                    depth++;

                    for (var i = 0; i < kids.length; i++) {
                        this.parseChildren(kids[i], depth);
                    }
                }
            };

            TreeManager.prototype.getChildren = function (parentNode) {
                // todo: should we store children in a node?
                // seems heavy to go through them all each time we need a child
                return this.nodes.filter(function (value, index) {
                    return value.parentId === parentNode.id;
                });
            };

            TreeManager.prototype.printNodesToConsole = function (nodes) {
                $.each(nodes, function (index, node) {
                    console.log(node.toString());
                });
            };

            TreeManager.prototype.printTreeToConsole = function () {
                $.each(this.nodes, function (index, node) {
                    console.log(node.toString());
                });
            };
            return TreeManager;
        })();
        TreeBurst.TreeManager = TreeManager;
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
