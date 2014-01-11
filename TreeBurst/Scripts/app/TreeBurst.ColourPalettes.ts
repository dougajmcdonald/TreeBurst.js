/// <reference path="references.ts" />
module TreeBurst {

    export interface ColourPaletteOptions {
        colours?: Colour[];
    }

    export interface IColourPalette {
        GetColour(index?: number): Colour;
    }

    export class ColourPalette implements IColourPalette {

        private colours: Colour[];
        private currentindex: number = 0;

        constructor(opts: ColourPaletteOptions) {
            this.colours = opts.colours;
        }

        public GetColour(index?: number): Colour {

            var colour: Colour;

            if (index) {
                colour = this.colours[index];
            } else {
                colour = this.colours[this.currentindex];
                this.currentindex++;
            }

            return colour;
        }        
    }
}