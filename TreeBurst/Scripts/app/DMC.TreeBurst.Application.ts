/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface TreeBurstOptions {
        name: string;
        nodes: Node[];
    }

    /**
    * main application entry point
    */
    export class Application {

        private $: JQueryStatic;
        private tree: NodeTree;

        constructor($: JQueryStatic, opts: TreeBurstOptions) {

            console.log("Welcome to TreeBurst: " + opts.name);

            if (opts.nodes) {
                this.LoadNodes(opts.nodes);
            } else {
                console.log("Error: No nodes passed to application.")
            }

            this.tree.Draw();

        }

        public LoadNodes(nodes: Node[]) : void {

            this.tree = new NodeTree({
                $: this.$,
                nodes: nodes
            });

            console.log("Successfully loaded (" + nodes.length + ") nodes");

        }
    }


}