/// <reference path="../references.ts" />
module TreeBurst.Palettes {

    export class Greyscale implements IColourPalette {

        private colours: Colour[];
        private currentindex: number = 0;

        constructor(opts: ColourPaletteOptions) {

            this.colours = [
                new Colour({ id: 0, hexVal: "#111111" }),
                new Colour({ id: 1, hexVal: "#222222" }),
                new Colour({ id: 2, hexVal: "#333333" }),
                new Colour({ id: 3, hexVal: "#444444" }),
                new Colour({ id: 4, hexVal: "#555555" }),
                new Colour({ id: 5, hexVal: "#666666" }),
                new Colour({ id: 6, hexVal: "#777777" }),
                new Colour({ id: 7, hexVal: "#888888" }),
                new Colour({ id: 8, hexVal: "#999999" }),
                new Colour({ id: 9, hexVal: "#AAAAAA" }),
                new Colour({ id: 10, hexVal: "#BBBBBB" }),
                new Colour({ id: 11, hexVal: "#CCCCCC" }),
                new Colour({ id: 12, hexVal: "#DDDDDD" }),
                new Colour({ id: 13, hexVal: "#EEEEEE" }),
            ];

        }

        public GetColour(index?: number): Colour {

            if (index) {
                return this.colours[index];
            } else {
                var colour = this.colours[this.currentindex];
                this.currentindex++;
                console.log(colour);
                return colour;
            }

        }
    }
}