/// <reference path="references.ts" />
module TreeBurst {

    export interface NodeOptions {

        // location specific
        id: number;
        parentId?: number;

        // node internals
        title: string;
        content?: string;
        colour?: Colour;        
    }

    export class Node {

        public id: number;
        public parentId: number = null;
        public title: string;
        public content: string = null;        
        public depth: number = null;

        public colour: Colour = null;

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