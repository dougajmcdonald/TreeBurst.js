/// <reference path="references.ts" />
var TreeBurst;
(function (TreeBurst) {
    var rgba = (function () {
        function rgba(r, g, b, a) {
            this.a = 255;
            this.r = r;
            this.g = g;
            this.b = b;
            if (a) {
                this.a = a;
            }
        }
        return rgba;
    })();
    TreeBurst.rgba = rgba;

    var Colour = (function () {
        function Colour(opts) {
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
        Colour.prototype.rgbaString = function () {
            return "rgba(" + this.rgbaStruct.r + ',' + this.rgbaStruct.g + ',' + this.rgbaStruct.g + ',' + this.rgbaStruct.a + ")";
        };

        Colour.prototype.hexToRgba = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            return result ? new rgba(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : null;
        };

        Colour.prototype.rgbaToHex = function (rgba) {
            var str = rgba.substr(4, rgba.length - 1);

            for (var i = 0; i < 2; i++) {
                var component = str.split(',');

                return (parseInt(component[0]) << 16, 10 | parseInt(component[1]) << 8, 10 | parseInt(component[2])).toString(16);
            }
        };
        return Colour;
    })();
    TreeBurst.Colour = Colour;
})(TreeBurst || (TreeBurst = {}));
