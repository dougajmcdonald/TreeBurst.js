var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="references.ts" />
var TreeBurst;
(function (TreeBurst) {
    // canvas nodes stores the info we need from each node to draw it to canvas
    var CanvasNode = (function (_super) {
        __extends(CanvasNode, _super);
        function CanvasNode(opts) {
            _super.call(this, opts);
        }
        return CanvasNode;
    })(TreeBurst.Node);
    TreeBurst.CanvasNode = CanvasNode;
})(TreeBurst || (TreeBurst = {}));
