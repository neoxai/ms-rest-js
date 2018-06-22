"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var propertyPath_1 = require("../../../lib/serialization/propertyPath");
describe("PropertyPath", function () {
    describe("constructor()", function () {
        it("with no arguments", function () {
            var path = new propertyPath_1.PropertyPath();
            assert.deepEqual(path.path, []);
            assert.deepEqual(path.serializedPath, []);
        });
        it("with one argument", function () {
            var path = new propertyPath_1.PropertyPath(["a", "b"]);
            assert.deepEqual(path.path, ["a", "b"]);
            assert.deepEqual(path.serializedPath, ["a", "b"]);
        });
        it("with two arguments", function () {
            var path = new propertyPath_1.PropertyPath(["a", "b"], ["a", "b", "c"]);
            assert.deepEqual(path.path, ["a", "b"]);
            assert.deepEqual(path.serializedPath, ["a", "b", "c"]);
        });
    });
    describe("pathStringConcat()", function () {
        it("with no arguments", function () {
            var path = new propertyPath_1.PropertyPath(["a"]);
            var concatPath = path.pathStringConcat();
            assert.deepEqual(concatPath, path);
        });
        it("with one argument", function () {
            var path = new propertyPath_1.PropertyPath(["a"]);
            var concatPath = path.pathStringConcat("b");
            assert.deepEqual(concatPath, new propertyPath_1.PropertyPath(["a", "b"]));
        });
        it("with two argument", function () {
            var path = new propertyPath_1.PropertyPath(["a"]);
            var concatPath = path.pathStringConcat("b", "c");
            assert.deepEqual(concatPath, new propertyPath_1.PropertyPath(["a", "b", "c"]));
        });
    });
    describe("concat()", function () {
        it("with one empty array", function () {
            var path = new propertyPath_1.PropertyPath(["a"]);
            var concatPath = path.concat([]);
            assert.deepEqual(concatPath, path);
        });
        it("with two empty arrays", function () {
            var path = new propertyPath_1.PropertyPath(["a"]);
            var concatPath = path.concat([], []);
            assert.deepEqual(concatPath, path);
        });
        it("with one non-empty array", function () {
            var path = new propertyPath_1.PropertyPath(["a"]);
            var concatPath = path.concat(["b"]);
            assert.deepEqual(concatPath, new propertyPath_1.PropertyPath(["a", "b"]));
        });
        it("with two non-empty equal arrays", function () {
            var path = new propertyPath_1.PropertyPath(["a"]);
            var concatPath = path.concat(["b"], ["b"]);
            assert.deepEqual(concatPath, new propertyPath_1.PropertyPath(["a", "b"]));
        });
        it("with two non-empty non-equal arrays", function () {
            var path = new propertyPath_1.PropertyPath(["a"]);
            var concatPath = path.concat(["b"], ["c"]);
            assert.deepEqual(concatPath, new propertyPath_1.PropertyPath(["a", "b"], ["a", "c"]));
        });
    });
    describe("toString()", function () {
        it("when path and serializedPath are equal", function () {
            assert.strictEqual("a.b", new propertyPath_1.PropertyPath(["a", "b"]).toString());
        });
        it("when path and serializedPath are different", function () {
            assert.strictEqual("a.b (a.b.c)", new propertyPath_1.PropertyPath(["a", "b"], ["a", "b", "c"]).toString());
        });
    });
});
//# sourceMappingURL=propertyPathTests.js.map