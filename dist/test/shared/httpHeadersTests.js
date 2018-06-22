"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var httpHeaders_1 = require("../../lib/httpHeaders");
describe("HttpHeaders", function () {
    it("constructor()", function () {
        var httpHeaders = new httpHeaders_1.HttpHeaders();
        assert.deepStrictEqual(httpHeaders.headersArray(), []);
    });
    describe("constructor(RawHttpHeaders)", function () {
        it("with empty raw HTTP headers", function () {
            var httpHeaders = new httpHeaders_1.HttpHeaders({});
            assert.deepStrictEqual(httpHeaders.headersArray(), []);
        });
        it("with non-empty raw HTTP headers", function () {
            var httpHeaders = new httpHeaders_1.HttpHeaders({ "a": "A" });
            assert.deepEqual(httpHeaders.headersArray(), [{ name: "a", value: "A" }]);
        });
    });
    describe("contains(string)", function () {
        it("should return false with non-existing header name", function () {
            var httpHeaders = new httpHeaders_1.HttpHeaders({ "a": "A" });
            assert.strictEqual(httpHeaders.contains("b"), false);
        });
        it("should return true with existing header name", function () {
            var httpHeaders = new httpHeaders_1.HttpHeaders({ "a": "A" });
            assert.strictEqual(httpHeaders.contains("a"), true);
        });
        it("should return true with existing header name in different case", function () {
            var httpHeaders = new httpHeaders_1.HttpHeaders({ "a": "A" });
            assert.strictEqual(httpHeaders.contains("A"), true);
        });
    });
    describe("remove(string)", function () {
        it("should return false with non-existing header name", function () {
            var httpHeaders = new httpHeaders_1.HttpHeaders({ "a": "A" });
            assert.strictEqual(httpHeaders.remove("b"), false);
        });
        it("should return true with existing header name", function () {
            var httpHeaders = new httpHeaders_1.HttpHeaders({ "a": "A" });
            assert.strictEqual(httpHeaders.remove("a"), true);
            assert.strictEqual(httpHeaders.contains("a"), false);
        });
        it("should return true with existing header name in different case", function () {
            var httpHeaders = new httpHeaders_1.HttpHeaders({ "a": "A" });
            assert.strictEqual(httpHeaders.remove("A"), true);
            assert.strictEqual(httpHeaders.contains("a"), false);
        });
    });
});
//# sourceMappingURL=httpHeadersTests.js.map