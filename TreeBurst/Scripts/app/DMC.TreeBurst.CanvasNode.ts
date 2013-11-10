/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface CanvasNodeOptions extends NodeOptions {

    }

    // canvas nodes stores the info we need from each node to draw it to canvas
    export class CanvasNode extends Node {

        public startRadian: number;
        public endRadian: number;
        public radius: number;

        constructor(opts: CanvasNodeOptions) {

            super(opts);
                        
        }
    }
}