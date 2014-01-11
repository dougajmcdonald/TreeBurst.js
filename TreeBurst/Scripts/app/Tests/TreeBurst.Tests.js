///<reference path="../../typings/qunit/qunit.d.ts" />
///<reference path="../">
///<chutzpah_reference path="../TreeBurst.Node.js" />
var TreeBurst;
(function (TreeBurst) {
    QUnit.module("TreeBurst.Node.ts tests");

    test("Load-a-single-node-creates-correctly", function () {
        var node = new TreeBurst.Node({
            id: 1,
            parentId: null,
            title: ""
        });

        ok(node, "Node not create correctly with valid constructor parameters");
    });
})(TreeBurst || (TreeBurst = {}));
