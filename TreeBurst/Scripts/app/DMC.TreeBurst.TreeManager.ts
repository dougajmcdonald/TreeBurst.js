/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface TreeManagerOptions {
        $: JQueryStatic;
        nodes: Node[];
    }

    export class TreeManager {

        private $: JQueryStatic;
        private nodes: Node[];

        constructor(opts: TreeManagerOptions) {
            this.$ = opts.$;
            this.nodes = opts.nodes;

            // TODO: Construct a node tree from the nodes

        }

        public getNodes(): Node[] {
            return this.nodes;
        }

        public getRootNode(): Node {

            var root: Node;
            
            $.each(this.nodes, (index: number, node: Node) => {
                if (node.isRoot()) {
                    root = node;
                }
            });

            if (!root) {
                console.log("Error: No root node defined within nodes");
            }

            return root;
        }

        public draw(): void {

            // draw the root
            //var root = this.getRootNode();


            // draw the tier x nodes
            // get nodes with x parents
            //$.each(this.nodes, (index: number, node: Node) => {

            //    node

            //    console.log(node.toString());

            //});
                        
        }
    }
}