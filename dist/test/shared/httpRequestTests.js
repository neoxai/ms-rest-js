"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var httpMethod_1 = require("../../lib/httpMethod");
var httpRequest_1 = require("../../lib/httpRequest");
describe("HttpRequest", function () {
    describe("constructor", function () {
        it("should throw an Error when the url is \"\"", function () {
            try {
                new httpRequest_1.HttpRequest({ method: httpMethod_1.HttpMethod.GET, url: "" });
                assert.fail("Should have thrown an error.");
            }
            catch (error) {
                assert.notEqual(error, undefined);
                assert.strictEqual(error.message, "\"\" is not a valid URL for a HttpRequest.");
            }
        });
        it("should return a valid GET HttpRequest when the url is \"www.example.com\"", function () {
            var httpRequest = new httpRequest_1.HttpRequest({ method: httpMethod_1.HttpMethod.GET, url: "www.example.com" });
            assert.strictEqual(httpRequest.method, httpMethod_1.HttpMethod.GET);
            assert.strictEqual(httpRequest.url, "www.example.com");
            assert.deepStrictEqual(httpRequest.headers.toJson(), {});
            assert.strictEqual(httpRequest.body, undefined);
            assert.strictEqual(httpRequest.serializedBody, undefined);
        });
        it("should return a valid POST HttpRequest when the body is undefined", function () {
            var httpRequest = new httpRequest_1.HttpRequest({ method: httpMethod_1.HttpMethod.POST, url: "www.example.com" });
            assert.strictEqual(httpRequest.method, httpMethod_1.HttpMethod.POST);
            assert.strictEqual(httpRequest.url, "www.example.com");
            assert.deepStrictEqual(httpRequest.headers.toJson(), {});
            assert.strictEqual(httpRequest.body, undefined);
            assert.strictEqual(httpRequest.serializedBody, undefined);
        });
        it("should return a valid POST HttpRequest when the body is \"\"", function () {
            var httpRequest = new httpRequest_1.HttpRequest({ method: httpMethod_1.HttpMethod.POST, url: "www.example.com", headers: {}, body: "" });
            assert.strictEqual(httpRequest.method, httpMethod_1.HttpMethod.POST);
            assert.strictEqual(httpRequest.url, "www.example.com");
            assert.deepStrictEqual(httpRequest.headers.toJson(), {});
            assert.strictEqual(httpRequest.body, "");
            assert.strictEqual(httpRequest.serializedBody, undefined);
        });
        it("should return a valid POST HttpRequest when the body is \"hello\"", function () {
            var httpRequest = new httpRequest_1.HttpRequest({ method: httpMethod_1.HttpMethod.POST, url: "www.example.com", headers: { "Content-Length": "5" }, body: "hello" });
            assert.strictEqual(httpRequest.method, httpMethod_1.HttpMethod.POST);
            assert.strictEqual(httpRequest.url, "www.example.com");
            assert.deepStrictEqual(httpRequest.headers.toJson(), { "Content-Length": "5" });
            assert.strictEqual(httpRequest.body, "hello");
            assert.strictEqual(httpRequest.serializedBody, undefined);
        });
    });
    describe("method", function () {
        it("should allow HttpMethod enum values", function () {
            var httpRequest = new httpRequest_1.HttpRequest({ method: httpMethod_1.HttpMethod.DELETE, url: "www.example.com" });
            assert.strictEqual(httpRequest.method, httpMethod_1.HttpMethod.DELETE);
            assert.strictEqual(httpRequest.method, "DELETE");
            assert(httpRequest.method === httpMethod_1.HttpMethod.DELETE);
            assert(httpRequest.method === "DELETE");
            var method = httpRequest.method;
            assert(method === httpMethod_1.HttpMethod.DELETE);
            assert(method === "DELETE");
        });
        it("should allow string versions of HttpMethod enum values", function () {
            var httpRequest = new httpRequest_1.HttpRequest({ method: "DELETE", url: "www.example.com" });
            assert.strictEqual(httpRequest.method, httpMethod_1.HttpMethod.DELETE);
            assert.strictEqual(httpRequest.method, "DELETE");
            assert(httpRequest.method === httpMethod_1.HttpMethod.DELETE);
            assert(httpRequest.method === "DELETE");
            var method = httpRequest.method;
            assert(method === httpMethod_1.HttpMethod.DELETE);
            assert(method === "DELETE");
        });
    });
});
//# sourceMappingURL=httpRequestTests.js.map