var TreeBurst;
(function (TreeBurst) {
    /// <reference path="../references.ts" />
    (function (Palettes) {
        var Greyscale = (function () {
            function Greyscale(opts) {
                this.currentindex = 0;
                this.colours = [
                    new TreeBurst.Colour({ id: 0, hexVal: "#111111" }),
                    new TreeBurst.Colour({ id: 1, hexVal: "#222222" }),
                    new TreeBurst.Colour({ id: 2, hexVal: "#333333" }),
                    new TreeBurst.Colour({ id: 3, hexVal: "#444444" }),
                    new TreeBurst.Colour({ id: 4, hexVal: "#555555" }),
                    new TreeBurst.Colour({ id: 5, hexVal: "#666666" }),
                    new TreeBurst.Colour({ id: 6, hexVal: "#777777" }),
                    new TreeBurst.Colour({ id: 7, hexVal: "#888888" }),
                    new TreeBurst.Colour({ id: 8, hexVal: "#999999" }),
                    new TreeBurst.Colour({ id: 9, hexVal: "#AAAAAA" }),
                    new TreeBurst.Colour({ id: 10, hexVal: "#BBBBBB" }),
                    new TreeBurst.Colour({ id: 11, hexVal: "#CCCCCC" }),
                    new TreeBurst.Colour({ id: 12, hexVal: "#DDDDDD" }),
                    new TreeBurst.Colour({ id: 13, hexVal: "#EEEEEE" })
                ];
            }
            Greyscale.prototype.GetColour = function (index) {
                if (index) {
                    return this.colours[index];
                } else {
                    var colour = this.colours[this.currentindex];
                    this.currentindex++;
                    console.log(colour);
                    return colour;
                }
            };
            return Greyscale;
        })();
        Palettes.Greyscale = Greyscale;
    })(TreeBurst.Palettes || (TreeBurst.Palettes = {}));
    var Palettes = TreeBurst.Palettes;
})(TreeBurst || (TreeBurst = {}));
