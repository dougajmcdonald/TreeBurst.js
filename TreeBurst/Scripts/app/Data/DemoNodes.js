var DMC;
(function (DMC) {
    (function (TreeBurst) {
        (function (Data) {
            var DemoNodes = (function () {
                function DemoNodes(treeId) {
                    this.setupNodes(treeId);
                }
                DemoNodes.prototype.getNodes = function () {
                    return this.nodes;
                };

                DemoNodes.prototype.setupNodes = function (treeId) {
                    switch (treeId) {
                        case 1:
                            this.nodes = [
                                new TreeBurst.Node({
                                    id: 1,
                                    parentId: null,
                                    title: "root"
                                })
                            ];
                            break;
                        case 2:
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
                            break;
                        case 3:
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
                                    parentId: 2,
                                    title: "grand child 2"
                                }),
                                new TreeBurst.Node({
                                    id: 7,
                                    parentId: 3,
                                    title: "grand child 3"
                                }),
                                new TreeBurst.Node({
                                    id: 8,
                                    parentId: 3,
                                    title: "grand child 4"
                                })
                            ];

                            break;
                        case 4:
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
                                    parentId: 3,
                                    title: "grand child 4"
                                })
                            ];
                            break;
                        case 5:
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
                                    id: 4,
                                    parentId: 1,
                                    title: "child 3"
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
                                    parentId: 4,
                                    title: "grand child 4"
                                }),
                                new TreeBurst.Node({
                                    id: 9,
                                    parentId: 4,
                                    title: "grand child 5"
                                }),
                                new TreeBurst.Node({
                                    id: 10,
                                    parentId: 4,
                                    title: "grand child 6"
                                }),
                                new TreeBurst.Node({
                                    id: 11,
                                    parentId: 10,
                                    title: "grand grand child 1"
                                }),
                                new TreeBurst.Node({
                                    id: 12,
                                    parentId: 7,
                                    title: "grand grand child 2"
                                }),
                                new TreeBurst.Node({
                                    id: 13,
                                    parentId: 12,
                                    title: "grand grand grand child 1"
                                }),
                                new TreeBurst.Node({
                                    id: 14,
                                    parentId: 12,
                                    title: "grand grand grand child 2"
                                })
                            ];
                            break;
                    }
                    console.log(this.nodes);
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
