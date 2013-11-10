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
                        }),
                        new TreeBurst.Node({
                            id: 5,
                            parentId: 2,
                            title: "grand child 1"
                        }),
                        new TreeBurst.Node({
                            id: 6,
                            parentId: 3,
                            title: "grand child 2"
                        }),
                        new TreeBurst.Node({
                            id: 7,
                            parentId: 3,
                            title: "grand child 3"
                        }),
                        new TreeBurst.Node({
                            id: 8,
                            parentId: 7,
                            title: "grand grand child 1"
                        }),
                        new TreeBurst.Node({
                            id: 9,
                            parentId: 7,
                            title: "grand grand child 2"
                        }),
                        new TreeBurst.Node({
                            id: 10,
                            parentId: 7,
                            title: "grand grand child 3"
                        }),
                        new TreeBurst.Node({
                            id: 11,
                            parentId: 6,
                            title: "grand grand child 4"
                        }),
                        new TreeBurst.Node({
                            id: 12,
                            parentId: 6,
                            title: "grand grand child 5"
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
