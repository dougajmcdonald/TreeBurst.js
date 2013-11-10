
module DMC.TreeBurst.Data {
    
    export class DemoNodes {

        private nodes: Node[];

        constructor(treeId: number) {

            this.setupNodes(treeId);

        }

        public getNodes(): Node[]{
            return this.nodes;
        }

        public setupNodes(treeId: number): Node[]{

            switch (treeId) {

                case 1:
                    this.nodes = [
                        // root
                        new Node({
                            id: 1,
                            parentId: null,
                            title: "root"
                        })
                    ];
                    break;
                case 2:
                    this.nodes = [
                        // root
                        new Node({
                            id: 1,
                            parentId: null,
                            title: "root"
                        }),
                        // level 1
                        new Node({
                            id: 2,
                            parentId: 1,
                            title: "child 1"
                        }),
                        new Node({
                            id: 3,
                            parentId: 1,
                            title: "child 2"
                        })
                    ]
                    break;
                case 3:
                    this.nodes = [
                        // root
                        new Node({
                            id: 1,
                            parentId: null,
                            title: "root"
                        }),
                        // level 1
                        new Node({
                            id: 2,
                            parentId: 1,
                            title: "child 1"
                        }),
                        new Node({
                            id: 3,
                            parentId: 1,
                            title: "child 2"
                        }),
                        // level 2
                        new Node({
                            id: 5,
                            parentId: 2,
                            title: "grand child 1"
                        }),
                        new Node({
                            id: 6,
                            parentId: 2,
                            title: "grand child 2"
                        }),
                        new Node({
                            id: 7,
                            parentId: 3,
                            title: "grand child 3"
                        }),
                        new Node({
                            id: 8,
                            parentId: 3,
                            title: "grand child 4"
                        })
                    ]

                    break;
                case 4:
                    this.nodes = [
                        // root
                        new Node({
                            id: 1,
                            parentId: null,
                            title: "root"
                        }),
                        // level 1
                        new Node({
                            id: 2,
                            parentId: 1,
                            title: "child 1"
                        }),
                        new Node({
                            id: 3,
                            parentId: 1,
                            title: "child 2"
                        }),
                        // level 2
                        new Node({
                            id: 5,
                            parentId: 2,
                            title: "grand child 1"
                        }),
                        new Node({
                            id: 6,
                            parentId: 3,
                            title: "grand child 2"
                        }),
                        new Node({
                            id: 7,
                            parentId: 3,
                            title: "grand child 3"
                        }),
                        new Node({
                            id: 8,
                            parentId: 3,
                            title: "grand child 4"
                        })
                    ]
                    break;
                case 5:
                    this.nodes = [
                        // root
                        new Node({
                            id: 1,
                            parentId: null,
                            title: "root"
                        }),
                        // level 1
                        new Node({
                            id: 2,
                            parentId: 1,
                            title: "child 1"
                        }),
                        new Node({
                            id: 3,
                            parentId: 1,
                            title: "child 2"
                        }),
                        new Node({
                            id: 4,
                            parentId: 1,
                            title: "child 3"
                        }),
                        // level 2
                        new Node({
                            id: 5,
                            parentId: 2,
                            title: "grand child 1"
                        }),
                        new Node({
                            id: 6,
                            parentId: 3,
                            title: "grand child 2"
                        }),
                        new Node({
                            id: 7,
                            parentId: 3,
                            title: "grand child 3"
                        }),
                        new Node({
                            id: 8,
                            parentId: 4,
                            title: "grand child 4"
                        }),
                        new Node({
                            id: 9,
                            parentId: 4,
                            title: "grand child 5"
                        }),
                        new Node({
                            id: 10,
                            parentId: 4,
                            title: "grand child 6"
                        }),
                        //level 3
                        new Node({
                            id: 11,
                            parentId: 10,
                            title: "grand grand child 1"
                        }),
                        new Node({
                            id: 12,
                            parentId: 7,
                            title: "grand grand child 2"
                        }),
                        // level 4
                        new Node({
                            id: 13,
                            parentId: 12,
                            title: "grand grand grand child 1"
                        }),
                        new Node({
                            id: 14,
                            parentId: 12,
                            title: "grand grand grand child 2"
                        })
                    ];
                    break;

            }
            console.log(this.nodes);
            return this.nodes;
        }
    }
}