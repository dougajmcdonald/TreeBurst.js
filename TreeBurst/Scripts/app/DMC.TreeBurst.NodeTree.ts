/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface NodeTreeOptions {
        $: JQueryStatic;
        nodes: Node[];
    }

    export class NodeTree {

        private $: JQueryStatic;
        private nodes: Node[];

        constructor(opts: NodeTreeOptions) {
            this.$ = opts.$;
            this.nodes = opts.nodes;

            // TODO: Construct a node tree from the nodes

        }

        public Draw(): void {

            $.each(this.nodes, (index: number, node: Node) => {

                console.log(node.toString());

            });
                        
        }
    }
}