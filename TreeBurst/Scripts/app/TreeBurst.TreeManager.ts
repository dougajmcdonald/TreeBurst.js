/// <reference path="references.ts" />
module TreeBurst {

    export interface TreeManagerOptions {
        $: JQueryStatic;
        nodes: Node[];
    }

    export class TreeManager {

        private $: JQueryStatic;
        private root: Node;
        private nodes: Node[];

        constructor(opts: TreeManagerOptions) {
            this.$ = opts.$;
            this.nodes = opts.nodes;

            // TODO: Construct a node tree from the nodes
            this.parseNodes();
        }

        // parse all nodes in the tree, setting their tier
        private parseNodes() : void {

            // set the root
            var depth = 0;
            this.root = this.getRootNode();
            this.root.depth = depth;

            // then recursively set tiers on all children
            this.parseChildren(this.root, depth);

        }

        //private createRandomTree(numberOfNodes: number): Node[] {

        //    var nodes = new Array<Node>();
        //    var tiers = Math.floor(Math.random() * numberOfNodes / 10);

        //    for (var i = 0; i < numberOfNodes % tiers; i++) {

                

        //    }


        //}

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
            //TODO: capture duel roots
            if (!root) {
                console.log("Error: No root node defined within nodes");
            }

            return root;
        }

        public parseChildren(node: Node, depth: number): void {

            node.depth = depth;

            var kids = this.getChildren(node);

            if (kids.length > 0) {

                depth++;

                for (var i: number = 0; i < kids.length; i++) {                    
                    this.parseChildren(kids[i], depth);
                }
            }
        }

        public getChildren(parentNode: Node): Node[] {
            // todo: should we store children in a node? 
            // seems heavy to go through them all each time we need a child
            return this.nodes.filter((value: Node, index: number) => {
                return value.parentId === parentNode.id;
            });
        }

        public printNodesToConsole(nodes: Node[]): void {
            $.each(nodes, (index: number, node: Node) => {
                console.log(node.toString());
            });                        
        }

        public printTreeToConsole(): void {
            $.each(this.nodes, (index: number, node: Node) => {
                console.log(node.toString());
            });
        }
    }
}