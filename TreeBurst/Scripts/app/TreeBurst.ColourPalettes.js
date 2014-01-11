/// <reference path="references.ts" />
var TreeBurst;
(function (TreeBurst) {
    var ColourPalette = (function () {
        function ColourPalette(opts) {
            this.currentindex = 0;
            this.colours = opts.colours;
        }
        ColourPalette.prototype.GetColour = function (index) {
            var colour;

            if (index) {
                colour = this.colours[index];
            } else {
                colour = this.colours[this.currentindex];
                this.currentindex++;
            }

            return colour;
        };
        return ColourPalette;
    })();
    TreeBurst.ColourPalette = ColourPalette;
})(TreeBurst || (TreeBurst = {}));
