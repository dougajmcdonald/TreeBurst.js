/// <reference path="references.ts" />
module TreeBurst {

    export interface PaletteManagerOptions {
        customPalette?: IColourPalette;
        pastelPalette?: IColourPalette;
        greyscalePalette?: IColourPalette;
        randomPalette: IColourPalette;    
    }

    export enum PaletteType {
        RANDOM = 0,
        PASTEL = 1,
        GREYSCALE = 2,
        CUSTOM = 3
    }

    // canvas nodes stores the info we need from each node to draw it to canvas
    export class PaletteManager {

        private randomPalette: IColourPalette;
        private pastelPalette: IColourPalette;
        private greyscalePalette: IColourPalette;
        private customPalette: IColourPalette;
        private selectedPalette: IColourPalette;

        constructor(opts: PaletteManagerOptions) {

            if (opts.customPalette) {
                this.customPalette = opts.customPalette;
            }   

            this.randomPalette = opts.randomPalette;
            this.greyscalePalette = opts.greyscalePalette;
                     
        }

        public Create(type: PaletteType) : void {

            switch (type) {

                case PaletteType.PASTEL:
                    this.selectedPalette = this.pastelPalette;
                    break;
                case PaletteType.GREYSCALE:
                    this.selectedPalette = this.greyscalePalette;
                    break;
                case PaletteType.CUSTOM:
                    this.selectedPalette = this.customPalette;
                    break;
                default:
                    this.selectedPalette = this.randomPalette;
            }
        }

        public GetColour(index?: number): Colour {

            if (index) {
                return this.selectedPalette.GetColour(index);
            } else {
                return this.selectedPalette.GetColour();
            }
        }
    }
}