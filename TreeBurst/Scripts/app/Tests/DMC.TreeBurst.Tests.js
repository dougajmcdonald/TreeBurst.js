var DMC;
(function (DMC) {
    ///<reference path="../../typings/qunit/qunit.d.ts" />
    ///<reference path="../">
    (function (TreeBurst) {
        QUnit.module("TreeBurst.Node.ts tests");

        test("Load-a-single-node-creates-correctly", function () {
            var node = [
                new TreeBurst.Node({
                    id: 1,
                    parentId: null,
                    title: ""
                })
            ];

            ok(node, "Node not create correctly with valid constructor parameters");
        });
    })(DMC.TreeBurst || (DMC.TreeBurst = {}));
    var TreeBurst = DMC.TreeBurst;
})(DMC || (DMC = {}));
