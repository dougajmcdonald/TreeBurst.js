
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
                })
                // level 2
            ];

        }

        public GetNodes(): Node[] {
            return this.nodes;
        }

    }

}