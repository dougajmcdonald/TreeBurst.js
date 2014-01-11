/// <reference path="references.ts" />
var TreeBurst;
(function (TreeBurst) {
    (function (PaletteType) {
        PaletteType[PaletteType["RANDOM"] = 0] = "RANDOM";
        PaletteType[PaletteType["PASTEL"] = 1] = "PASTEL";
        PaletteType[PaletteType["GREYSCALE"] = 2] = "GREYSCALE";
        PaletteType[PaletteType["CUSTOM"] = 3] = "CUSTOM";
    })(TreeBurst.PaletteType || (TreeBurst.PaletteType = {}));
    var PaletteType = TreeBurst.PaletteType;

    // canvas nodes stores the info we need from each node to draw it to canvas
    var PaletteManager = (function () {
        function PaletteManager(opts) {
            if (opts.customPalette) {
                this.customPalette = opts.customPalette;
            }

            this.randomPalette = opts.randomPalette;
            this.greyscalePalette = opts.greyscalePalette;
        }
        PaletteManager.prototype.Create = function (type) {
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
        };

        PaletteManager.prototype.GetColour = function (index) {
            if (index) {
                return this.selectedPalette.GetColour(index);
            } else {
                return this.selectedPalette.GetColour();
            }
        };
        return PaletteManager;
    })();
    TreeBurst.PaletteManager = PaletteManager;
})(TreeBurst || (TreeBurst = {}));
