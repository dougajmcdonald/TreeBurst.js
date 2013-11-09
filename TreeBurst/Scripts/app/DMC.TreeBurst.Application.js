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
                    this.LoadNodes(opts.nodes);
                } else {
                    console.log("Error: No nodes passed to application.");
                }

                this.tree.Draw();
            }
            Application.prototype.LoadNodes = function (nodes) {
                this.tree = new TreeBurst.NodeTree({
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
