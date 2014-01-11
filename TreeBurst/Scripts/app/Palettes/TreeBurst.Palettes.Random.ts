/// <reference path="../references.ts" />
module TreeBurst.Palettes {

    export class Random implements IColourPalette {

        private colours: Colour[];
        private currentindex: number = 0;

        constructor(opts: ColourPaletteOptions) {
            this.colours = new Array<Colour>();
        }

        public GetColour(index?: number): Colour {

            var rgbaString = this.GetRandomRgba();
            var colour = new Colour({ id: this.currentindex, rgbaVal: rgbaString });
            this.colours.push(colour);
            this.currentindex++;
            return colour;
        
        }

        private GetRandomRgba(): string {
            var colourString = 'rgba('
            for (var i = 0; i < 3; i++) {
                colourString += Math.floor((Math.random() * 255)).toString() + ',';
            }
            colourString += '255)';

            return colourString;
        }
    }
}