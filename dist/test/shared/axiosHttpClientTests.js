"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var should = require("should");
var axiosHttpClient_1 = require("../../lib/axiosHttpClient");
var utils_1 = require("../../lib/util/utils");
var webResource_1 = require("../../lib/webResource");
var testUtils_1 = require("../testUtils");
function getAbortController() {
    var controller;
    if (typeof AbortController === "function") {
        controller = new AbortController();
    }
    else {
        var AbortControllerPonyfill = require("abortcontroller-polyfill/dist/cjs-ponyfill").AbortController;
        controller = new AbortControllerPonyfill();
    }
    return controller;
}
describe("axiosHttpClient", function () {
    it("should send HTTP requests", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var request, httpClient, response, responseBody, expectedResponseBody;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = new webResource_1.WebResource(testUtils_1.baseURL + "/example-index.html", "GET");
                    httpClient = new axiosHttpClient_1.AxiosHttpClient();
                    return [4 /*yield*/, httpClient.sendRequest(request)];
                case 1:
                    response = _a.sent();
                    assert.deepStrictEqual(response.request, request);
                    assert.strictEqual(response.status, 200);
                    assert(response.headers);
                    // content-length varies based on OS line endings
                    assert.strictEqual(response.headers.get("content-length"), response.bodyAsText.length.toString());
                    assert.strictEqual(response.headers.get("content-type").split(";")[0], "text/html");
                    responseBody = response.bodyAsText;
                    expectedResponseBody = "<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <style type=\"text/css\">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n\n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 50px;\n        background-color: #fff;\n        border-radius: 1em;\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        body {\n            background-color: #fff;\n        }\n        div {\n            width: auto;\n            margin: 0 auto;\n            border-radius: 0;\n            padding: 1em;\n        }\n    }\n    </style>\n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is established to be used for illustrative examples in documents. You may use this\n    domain in examples without prior coordination or asking for permission.</p>\n    <p><a href=\"http://www.iana.org/domains/example\">More information...</a></p>\n</div>\n</body>\n</html>\n";
                    assert.strictEqual(responseBody && responseBody.replace(/\r\n/g, "\n"), expectedResponseBody.replace(/\r\n/g, "\n"));
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a response instead of throwing for awaited 404", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var request, httpClient, response;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = new webResource_1.WebResource(testUtils_1.baseURL + "/nonexistent", "GET");
                    httpClient = new axiosHttpClient_1.AxiosHttpClient();
                    return [4 /*yield*/, httpClient.sendRequest(request)];
                case 1:
                    response = _a.sent();
                    assert(response);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should allow canceling requests", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var controller, request, client, promise, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = getAbortController();
                        request = new webResource_1.WebResource(testUtils_1.baseURL + "/fileupload", "POST", new Uint8Array(1024 * 1024 * 10), undefined, undefined, true, controller.signal);
                        client = new axiosHttpClient_1.AxiosHttpClient();
                        promise = client.sendRequest(request);
                        controller.abort();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, promise];
                    case 2:
                        _a.sent();
                        assert.fail("");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        should(err_1).not.be.instanceof(assert.AssertionError);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    it("should not overwrite a user-provided cookie (nodejs only)", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, request1, request2, response2, request3, response3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Cookie is only allowed to be set by the browser based on an actual response Set-Cookie header
                        if (!utils_1.isNode) {
                            this.skip();
                        }
                        client = new axiosHttpClient_1.AxiosHttpClient();
                        request1 = new webResource_1.WebResource(testUtils_1.baseURL + "/set-cookie");
                        return [4 /*yield*/, client.sendRequest(request1)];
                    case 1:
                        _a.sent();
                        request2 = new webResource_1.WebResource(testUtils_1.baseURL + "/cookie");
                        return [4 /*yield*/, client.sendRequest(request2)];
                    case 2:
                        response2 = _a.sent();
                        should(response2.headers.get("Cookie")).equal("data=123456");
                        request3 = new webResource_1.WebResource(testUtils_1.baseURL + "/cookie", "GET", undefined, undefined, { Cookie: "data=abcdefg" });
                        return [4 /*yield*/, client.sendRequest(request3)];
                    case 3:
                        response3 = _a.sent();
                        should(response3.headers.get("Cookie")).equal("data=abcdefg");
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should allow canceling multiple requests with one token", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var controller, buf, requests, client, promises, _i, promises_1, promise, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = getAbortController();
                        buf = new Uint8Array(1024 * 1024 * 1);
                        requests = [
                            new webResource_1.WebResource(testUtils_1.baseURL + "/fileupload", "POST", buf, undefined, undefined, true, controller.signal),
                            new webResource_1.WebResource(testUtils_1.baseURL + "/fileupload", "POST", buf, undefined, undefined, true, controller.signal)
                        ];
                        client = new axiosHttpClient_1.AxiosHttpClient();
                        promises = requests.map(function (r) { return client.sendRequest(r); });
                        controller.abort();
                        _i = 0, promises_1 = promises;
                        _a.label = 1;
                    case 1:
                        if (!(_i < promises_1.length)) return [3 /*break*/, 6];
                        promise = promises_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, promise];
                    case 3:
                        _a.sent();
                        assert.fail("");
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        should(err_2).not.be.instanceof(assert.AssertionError);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    });
    it("should report upload and download progress (browser only)", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uploadNotified, downloadNotified, buf, request, client;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (utils_1.isNode) {
                            this.skip();
                        }
                        uploadNotified = false;
                        downloadNotified = false;
                        buf = new Uint8Array(1024 * 1024 * 1);
                        request = new webResource_1.WebResource(testUtils_1.baseURL + "/fileupload", "POST", buf, undefined, undefined, true, undefined, function (ev) {
                            uploadNotified = true;
                            ev.should.not.be.instanceof(ProgressEvent);
                            ev.loadedBytes.should.be.a.Number;
                        }, function (ev) {
                            downloadNotified = true;
                            ev.should.not.be.instanceof(ProgressEvent);
                            ev.loadedBytes.should.be.a.Number;
                        });
                        client = new axiosHttpClient_1.AxiosHttpClient();
                        return [4 /*yield*/, client.sendRequest(request)];
                    case 1:
                        _a.sent();
                        assert(uploadNotified);
                        assert(downloadNotified);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should parse a JSON response body", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request, client, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new webResource_1.WebResource(testUtils_1.baseURL + "/json");
                        client = new axiosHttpClient_1.AxiosHttpClient();
                        return [4 /*yield*/, client.sendRequest(request)];
                    case 1:
                        response = _a.sent();
                        assert.deepStrictEqual(response.parsedBody, [123, 456, 789]);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should parse a JSON response body with a charset specified in Content-Type", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request, client, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new webResource_1.WebResource(testUtils_1.baseURL + "/json-charset");
                        client = new axiosHttpClient_1.AxiosHttpClient();
                        return [4 /*yield*/, client.sendRequest(request)];
                    case 1:
                        response = _a.sent();
                        assert.deepStrictEqual(response.parsedBody, [123, 456, 789]);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should parse a JSON response body with an uppercase Content-Type", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request, client, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new webResource_1.WebResource(testUtils_1.baseURL + "/json-uppercase-content-type");
                        client = new axiosHttpClient_1.AxiosHttpClient();
                        return [4 /*yield*/, client.sendRequest(request)];
                    case 1:
                        response = _a.sent();
                        assert.deepStrictEqual(response.parsedBody, [123, 456, 789]);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should parse a JSON response body with a missing Content-Type", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request, client, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new webResource_1.WebResource(testUtils_1.baseURL + "/json-no-content-type");
                        client = new axiosHttpClient_1.AxiosHttpClient();
                        return [4 /*yield*/, client.sendRequest(request)];
                    case 1:
                        response = _a.sent();
                        assert.deepStrictEqual(response.parsedBody, [123, 456, 789]);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=axiosHttpClientTests.js.map