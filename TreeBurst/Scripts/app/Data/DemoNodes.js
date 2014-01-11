var TreeBurst;
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
                                title: "root",
                                content: "Some demo content for the root"
                            })
                        ];
                        break;
                    case 2:
                        this.nodes = [
                            new TreeBurst.Node({
                                id: 1,
                                parentId: null,
                                title: "root",
                                content: "Some demo content for the root"
                            }),
                            new TreeBurst.Node({
                                id: 2,
                                parentId: 1,
                                title: "child 1",
                                content: "content for child 1"
                            }),
                            new TreeBurst.Node({
                                id: 3,
                                parentId: 1,
                                title: "child 2",
                                content: "content for child 2"
                            })
                        ];
                        break;
                    case 3:
                        this.nodes = [
                            new TreeBurst.Node({
                                id: 1,
                                parentId: null,
                                title: "root",
                                content: "Some demo content for the root"
                            }),
                            new TreeBurst.Node({
                                id: 2,
                                parentId: 1,
                                title: "child 1",
                                content: "content for child 1"
                            }),
                            new TreeBurst.Node({
                                id: 3,
                                parentId: 1,
                                title: "child 2",
                                content: "content for child 2"
                            }),
                            new TreeBurst.Node({
                                id: 5,
                                parentId: 2,
                                title: "grand child 1",
                                content: "content for grand child 1"
                            }),
                            new TreeBurst.Node({
                                id: 6,
                                parentId: 2,
                                title: "grand child 2",
                                content: "content for grand child 2"
                            }),
                            new TreeBurst.Node({
                                id: 7,
                                parentId: 3,
                                title: "grand child 3",
                                content: "content for grand child 3"
                            }),
                            new TreeBurst.Node({
                                id: 8,
                                parentId: 3,
                                title: "grand child 4",
                                content: "content for grand child 4"
                            })
                        ];

                        break;
                    case 4:
                        this.nodes = [
                            new TreeBurst.Node({
                                id: 1,
                                parentId: null,
                                title: "root",
                                content: "Some demo content for the root"
                            }),
                            new TreeBurst.Node({
                                id: 2,
                                parentId: 1,
                                title: "child 1",
                                content: "content for child 1"
                            }),
                            new TreeBurst.Node({
                                id: 3,
                                parentId: 1,
                                title: "child 2",
                                content: "content for child 2"
                            }),
                            new TreeBurst.Node({
                                id: 5,
                                parentId: 2,
                                title: "grand child 1",
                                content: "content for grand child 1"
                            }),
                            new TreeBurst.Node({
                                id: 6,
                                parentId: 3,
                                title: "grand child 2",
                                content: "content for grand child 2"
                            }),
                            new TreeBurst.Node({
                                id: 7,
                                parentId: 3,
                                title: "grand child 3",
                                content: "content for grand child 3"
                            }),
                            new TreeBurst.Node({
                                id: 8,
                                parentId: 3,
                                title: "grand child 4",
                                content: "content for grand child 4"
                            })
                        ];
                        break;
                    case 5:
                        this.nodes = [
                            new TreeBurst.Node({
                                id: 1,
                                parentId: null,
                                title: "root",
                                content: "demo content for root node"
                            }),
                            new TreeBurst.Node({
                                id: 2,
                                parentId: 1,
                                title: "child 1",
                                content: "content for child 1"
                            }),
                            new TreeBurst.Node({
                                id: 3,
                                parentId: 1,
                                title: "child 2",
                                content: "content for child 2"
                            }),
                            new TreeBurst.Node({
                                id: 4,
                                parentId: 1,
                                title: "child 3",
                                content: "content for child 3"
                            }),
                            new TreeBurst.Node({
                                id: 5,
                                parentId: 2,
                                title: "grand child 1",
                                content: "content for grand child 1"
                            }),
                            new TreeBurst.Node({
                                id: 6,
                                parentId: 3,
                                title: "grand child 2",
                                content: "content for grand child 2"
                            }),
                            new TreeBurst.Node({
                                id: 7,
                                parentId: 3,
                                title: "grand child 3",
                                content: "content for grand child 3"
                            }),
                            new TreeBurst.Node({
                                id: 8,
                                parentId: 4,
                                title: "grand child 4",
                                content: "content for grand child 4"
                            }),
                            new TreeBurst.Node({
                                id: 9,
                                parentId: 4,
                                title: "grand child 5",
                                content: "content for grand child 5"
                            }),
                            new TreeBurst.Node({
                                id: 10,
                                parentId: 4,
                                title: "grand child 6",
                                content: "content for grand child 6"
                            }),
                            new TreeBurst.Node({
                                id: 11,
                                parentId: 10,
                                title: "grand grand child 1",
                                content: "content for grand grand child 1"
                            }),
                            new TreeBurst.Node({
                                id: 12,
                                parentId: 7,
                                title: "grand grand child 2",
                                content: "content for grand grand child 2"
                            }),
                            new TreeBurst.Node({
                                id: 13,
                                parentId: 12,
                                title: "grand grand grand child 1",
                                content: "content for grand grand grand child 1"
                            }),
                            new TreeBurst.Node({
                                id: 14,
                                parentId: 12,
                                title: "grand grand grand child 2",
                                content: "content for grand grand grand child 2"
                            })
                        ];
                        break;
                }
                return this.nodes;
            };
            return DemoNodes;
        })();
        Data.DemoNodes = DemoNodes;
    })(TreeBurst.Data || (TreeBurst.Data = {}));
    var Data = TreeBurst.Data;
})(TreeBurst || (TreeBurst = {}));
