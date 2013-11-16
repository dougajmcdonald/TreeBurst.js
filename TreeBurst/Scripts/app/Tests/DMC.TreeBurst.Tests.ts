///<reference path="../../typings/qunit/qunit.d.ts" />
///<reference path="../">

module DMC.TreeBurst {

    QUnit.module("TreeBurst.Node.ts tests");

    test("Load-a-single-node-creates-correctly", () => {

        var node = [new Node({
            id: 1,
            parentId: null,
            title: ""
        })];

        ok(node, "Node not create correctly with valid constructor parameters");

    });
}
