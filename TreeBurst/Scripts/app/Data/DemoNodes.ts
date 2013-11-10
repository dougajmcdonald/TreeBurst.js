
module DMC.TreeBurst.Data {
    
    export class DemoNodes {

        private nodes: Node[];

        constructor() {

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
                //new Node({
                //    id: 4,
                //    parentId: 1,
                //    title: "child 3"
                //}),
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
                //level 3
                new Node({
                    id: 8,
                    parentId: 7,
                    title: "grand grand child 1"
                }),
                new Node({
                    id: 9,
                    parentId: 7,
                    title: "grand grand child 2"
                }),
                new Node({
                    id: 10,
                    parentId: 7,
                    title: "grand grand child 3"
                }),
                new Node({
                    id: 11,
                    parentId: 6,
                    title: "grand grand child 4"
                }),
                new Node({
                    id: 12,
                    parentId: 6,
                    title: "grand grand child 5"
                })
            ];

        }

        public GetNodes(): Node[] {
            return this.nodes;
        }

    }

}