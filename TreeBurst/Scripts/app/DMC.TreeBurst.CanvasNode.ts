/// <reference path="references.ts" />
module DMC.TreeBurst {

    export interface CanvasNodeOptions extends NodeOptions {

        //colour: string;
        //startRadian: number;
        //endRadian: number;
        //radius: number;
    }

    export class CanvasNode extends Node {

        public startRadian: number;
        public endRadian: number;
        public radius: number;

        constructor(opts: CanvasNodeOptions) {

            super(opts);
            //this.color = opts.colour;
            //this.startRadian = opts.startRadian;
            //this.endRadian = opts.endRadian;
            //this.radius = opts.radius;
            
        }
    }
}