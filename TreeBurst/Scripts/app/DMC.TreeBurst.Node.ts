/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface NodeOptions {

        // location specific
        id: number;
        parentId?: number;

        // node internals
        title: string;
        content?: string;
        colour?: string;        
    }

    export class Node {

        private id: number;
        private parentId: number = null;
        private title: string;
        private content: string = null;        
        private depth: number = null;

        public colour: string = null;

        constructor(opts: NodeOptions) {

            this.id = opts.id;
            this.title = opts.title;

            if (opts.parentId) {
                this.parentId = opts.parentId;
            }
            if (opts.content) {
                this.content = opts.content;
            }
            if (opts.colour) {
                this.colour = opts.colour;
            }
        }

        public setDepth(depth: number): void {
            this.depth = depth;
        }

        public getDepth(): number {
            return this.depth;
        }

        public getParentId(): number {
            return this.parentId;
        }

        public getId(): number {
            return this.id;
        }

        public isRoot(): boolean {
            return this.parentId === null;
        }

        public toString(): string {
            return 'id: ' + this.id + ', ' +
                'parentId: ' + this.parentId + ', ' +
                'depth: ' + this.depth + ', ' +
                'title: ' + this.title;
        }

    }

}