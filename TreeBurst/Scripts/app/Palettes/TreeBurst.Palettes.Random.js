var TreeBurst;
(function (TreeBurst) {
    /// <reference path="../references.ts" />
    (function (Palettes) {
        var Random = (function () {
            function Random(opts) {
                this.currentindex = 0;
                this.colours = new Array();
            }
            Random.prototype.GetColour = function (index) {
                var rgbaString = this.GetRandomRgba();
                var colour = new TreeBurst.Colour({ id: this.currentindex, rgbaVal: rgbaString });
                this.colours.push(colour);
                this.currentindex++;
                return colour;
            };

            Random.prototype.GetRandomRgba = function () {
                var colourString = 'rgba(';
                for (var i = 0; i < 3; i++) {
                    colourString += Math.floor((Math.random() * 255)).toString() + ',';
                }
                colourString += '255)';

                return colourString;
            };
            return Random;
        })();
        Palettes.Random = Random;
    })(TreeBurst.Palettes || (TreeBurst.Palettes = {}));
    var Palettes = TreeBurst.Palettes;
})(TreeBurst || (TreeBurst = {}));
