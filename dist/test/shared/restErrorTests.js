"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var msRest_1 = require("../../lib/msRest");
describe("RestError", function () {
    describe("constructor", function () {
        it("should not strip authorization header in request when header doesn't exist", function () {
            var request = new msRest_1.HttpRequest({
                method: msRest_1.HttpMethod.GET,
                url: "www.example.com",
                headers: { "a": "A" }
            });
            var restError = new msRest_1.RestError("error message", { request: request });
            assert.strictEqual(restError.request, request);
        });
        it("should strip authorization header in request", function () {
            var request = new msRest_1.HttpRequest({
                method: msRest_1.HttpMethod.GET,
                url: "www.example.com",
                headers: { "authorization": "remove me!", "a": "A" }
            });
            var restError = new msRest_1.RestError("error message", { request: request });
            assert.notStrictEqual(restError.request, request);
            assert.deepEqual(restError.request.headers.headersArray(), [{ name: "a", value: "A" }]);
        });
    });
});
//# sourceMappingURL=restErrorTests.js.map