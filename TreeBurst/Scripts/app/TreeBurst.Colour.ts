/// <reference path="references.ts" />
module TreeBurst {

    export interface ColourOptions {
        id: number;
        hexVal?: string;
        rgbaVal?: string;
    }

    export class rgba {

        public r: number;
        public g: number;
        public b: number;
        public a: number = 255;

        constructor(r: number, g: number, b: number, a?: number) {
            this.r = r;
            this.g = g;
            this.b = b;
            if (a) {
                this.a = a;
            }
        }        
    }

    export class Colour {

        private id: number;

        public hex: string;
        public rgba: string;
        private rgbaStruct: rgba;

        constructor(opts: ColourOptions) {

            this.id = opts.id;

            if (opts.hexVal) {
                this.hex = opts.hexVal;
            } 
            if (opts.rgbaVal) {
                this.rgba = opts.rgbaVal;
            }

            if (this.hex && !this.rgba) {
                this.rgbaStruct = this.hexToRgba(this.hex);
                this.rgba = this.rgbaString();
            }

            if (this.rgba && !this.hex) {
                this.hex = this.rgbaToHex(this.rgba);
            }

        }

        private rgbaString(): string {
            return "rgba(" + this.rgbaStruct.r + ',' + this.rgbaStruct.g + ',' + this.rgbaStruct.g + ',' + this.rgbaStruct.a + ")";
        }

        private hexToRgba(hex: string): rgba {

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            return result ? new rgba(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : null;

        }

        private rgbaToHex(rgba: string): string {

            var str = rgba.substr(4, rgba.length - 1);

            for (var i = 0; i < 2; i++) {

                var component = str.split(',');

                return (parseInt(component[0]) << 16, 10 | parseInt(component[1]) << 8, 10 | parseInt(component[2])).toString(16);

            }
        }
    }
}