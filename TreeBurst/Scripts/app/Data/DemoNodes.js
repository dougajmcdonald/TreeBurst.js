var DMC;
(function (DMC) {
    (function (TreeBurst) {
        (function (Data) {
            var DemoNodes = (function () {
                function DemoNodes() {
                    this.nodes = [
                        new TreeBurst.Node({
                            id: 1,
                            parentId: null,
                            title: "root"
                        }),
                        new TreeBurst.Node({
                            id: 2,
                            parentId: 1,
                            title: "child 1"
                        }),
                        new TreeBurst.Node({
                            id: 3,
                            parentId: 1,
                            title: "child 2"
                        })
                    ];
                }
                DemoNodes.prototype.GetNodes = function () {
                    return this.nodes;
                };
                return DemoNodes;
            })();
            Data.DemoNodes = DemoNodes;
        })(TreeBurst.Data || (TreeBurst.Data = {}));
        var Data = TreeBurst.Data;
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
//# sourceMappingURL=DemoNodes.js.map
