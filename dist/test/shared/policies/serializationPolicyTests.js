"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var httpMethod_1 = require("../../../lib/httpMethod");
var httpRequest_1 = require("../../../lib/httpRequest");
var inMemoryHttpResponse_1 = require("../../../lib/inMemoryHttpResponse");
var serializationPolicy_1 = require("../../../lib/policies/serializationPolicy");
var requestPolicyOptions_1 = require("../../../lib/requestPolicyOptions");
var booleanSpec_1 = require("../../../lib/serialization/booleanSpec");
var compositeSpec_1 = require("../../../lib/serialization/compositeSpec");
var dateSpec_1 = require("../../../lib/serialization/dateSpec");
var dateTimeRfc1123Spec_1 = require("../../../lib/serialization/dateTimeRfc1123Spec");
var numberSpec_1 = require("../../../lib/serialization/numberSpec");
var objectSpec_1 = require("../../../lib/serialization/objectSpec");
var sequenceSpec_1 = require("../../../lib/serialization/sequenceSpec");
var serializationOptions_1 = require("../../../lib/serialization/serializationOptions");
var stringSpec_1 = require("../../../lib/serialization/stringSpec");
describe("serializationPolicy", function () {
    it("serializes request and response bodies", function () { return __awaiter(_this, void 0, void 0, function () {
        var policyFactory, inMemoryEchoServer, policy, request, response, stringBody, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    policyFactory = serializationPolicy_1.serializationPolicy({ outputType: serializationOptions_1.SerializationOutputType.JSON });
                    inMemoryEchoServer = {
                        send: function (request) {
                            return Promise.resolve(new inMemoryHttpResponse_1.InMemoryHttpResponse(request, 200, request.headers, request.serializedBody));
                        }
                    };
                    policy = policyFactory(inMemoryEchoServer, new requestPolicyOptions_1.RequestPolicyOptions());
                    request = new httpRequest_1.HttpRequest({
                        method: httpMethod_1.HttpMethod.POST,
                        url: "https://spam.com",
                        headers: {
                            "1": "one",
                            "2": "2"
                        },
                        body: {
                            "booleanProperty": false,
                            "numberProperty": 20,
                            "objectProperty": { "booleanProperty": true },
                            "sequenceProperty": [],
                            "dateProperty": new Date("2018-10-05"),
                            "dateTimeRfc1123Property": new Date("2011-10-05T14:48:00.000Z")
                        },
                        operationSpec: {
                            requestHttpMethod: httpMethod_1.HttpMethod.GET,
                            requestBodySpec: compositeSpec_1.compositeSpec({
                                typeName: "FakeRequestBody",
                                propertySpecs: {
                                    "booleanProperty": {
                                        required: true,
                                        valueSpec: booleanSpec_1.default
                                    },
                                    "numberProperty": {
                                        required: true,
                                        valueSpec: numberSpec_1.default
                                    },
                                    "objectProperty": {
                                        required: true,
                                        valueSpec: objectSpec_1.default
                                    },
                                    "sequenceProperty": {
                                        required: true,
                                        valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                                    },
                                    "dateProperty": {
                                        required: true,
                                        valueSpec: dateSpec_1.default
                                    },
                                    "dateTimeRfc1123Property": {
                                        required: true,
                                        valueSpec: dateTimeRfc1123Spec_1.default
                                    }
                                }
                            }),
                            responseBodySpec: compositeSpec_1.compositeSpec({
                                typeName: "FakeResponseBody",
                                propertySpecs: {
                                    "booleanProperty": {
                                        required: true,
                                        valueSpec: booleanSpec_1.default
                                    },
                                    "numberProperty": {
                                        required: true,
                                        valueSpec: numberSpec_1.default
                                    },
                                    "objectProperty": {
                                        required: true,
                                        valueSpec: objectSpec_1.default
                                    },
                                    "sequenceProperty": {
                                        required: true,
                                        valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                                    },
                                    "dateProperty": {
                                        required: true,
                                        valueSpec: dateSpec_1.default
                                    },
                                    "dateTimeRfc1123Property": {
                                        required: true,
                                        valueSpec: dateTimeRfc1123Spec_1.default
                                    }
                                }
                            })
                        }
                    });
                    return [4 /*yield*/, policy.send(request)];
                case 1:
                    response = _c.sent();
                    assert.deepEqual(request.body, {
                        "booleanProperty": false,
                        "numberProperty": 20,
                        "objectProperty": { "booleanProperty": true },
                        "sequenceProperty": [],
                        "dateProperty": new Date("2018-10-05"),
                        "dateTimeRfc1123Property": new Date("2011-10-05T14:48:00.000Z")
                    });
                    assert.deepEqual(request.serializedBody, JSON.stringify({
                        "booleanProperty": false,
                        "numberProperty": 20,
                        "objectProperty": { "booleanProperty": true },
                        "sequenceProperty": [],
                        "dateProperty": "2018-10-05",
                        "dateTimeRfc1123Property": "Wed, 05 Oct 2011 14:48:00 GMT"
                    }));
                    assert(response instanceof inMemoryHttpResponse_1.InMemoryHttpResponse);
                    return [4 /*yield*/, response.textBody()];
                case 2:
                    stringBody = _c.sent();
                    assert.deepEqual(JSON.parse(stringBody), {
                        "booleanProperty": false,
                        "numberProperty": 20,
                        "objectProperty": { "booleanProperty": true },
                        "sequenceProperty": [],
                        "dateProperty": "2018-10-05",
                        "dateTimeRfc1123Property": "Wed, 05 Oct 2011 14:48:00 GMT"
                    });
                    _b = (_a = assert).deepEqual;
                    return [4 /*yield*/, response.deserializedBody()];
                case 3:
                    _b.apply(_a, [_c.sent(), {
                            "booleanProperty": false,
                            "numberProperty": 20,
                            "objectProperty": { "booleanProperty": true },
                            "sequenceProperty": [],
                            "dateProperty": new Date("2018-10-05"),
                            "dateTimeRfc1123Property": new Date("2011-10-05T14:48:00.000Z")
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("[de]serializes XML request and response bodies", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var policyFactory, inMemoryEchoServer, policy, bodySpec, expectedBody, request, response, body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    policyFactory = serializationPolicy_1.serializationPolicy({ outputType: serializationOptions_1.SerializationOutputType.XML });
                    inMemoryEchoServer = {
                        send: function (request) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new inMemoryHttpResponse_1.InMemoryHttpResponse(request, 200, request.headers, request.serializedBody)];
                            });
                        }); }
                    };
                    policy = policyFactory(inMemoryEchoServer, new requestPolicyOptions_1.RequestPolicyOptions());
                    bodySpec = compositeSpec_1.compositeSpec({
                        typeName: "Root",
                        xmlRootName: "my-root",
                        propertySpecs: {
                            "foo": {
                                xmlName: "my-foo",
                                valueSpec: numberSpec_1.default
                            },
                            "bar": {
                                valueSpec: booleanSpec_1.default
                            }
                        }
                    });
                    expectedBody = { foo: 123, bar: true };
                    request = new httpRequest_1.HttpRequest({
                        body: expectedBody,
                        method: "POST",
                        url: "/",
                        headers: { "Content-Type": "application/xml" },
                        operationSpec: {
                            requestHttpMethod: httpMethod_1.HttpMethod.GET,
                            requestBodySpec: bodySpec,
                            responseBodySpec: bodySpec
                        }
                    });
                    return [4 /*yield*/, policy.send(request)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.deserializedBody()];
                case 2:
                    body = _a.sent();
                    assert.deepEqual(body, expectedBody);
                    return [2 /*return*/];
            }
        });
    }); });
    it("[de]serializes XML root lists", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var policyFactory, inMemoryEchoServer, policy, bodySpec, request, response, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    policyFactory = serializationPolicy_1.serializationPolicy({ outputType: serializationOptions_1.SerializationOutputType.XML });
                    inMemoryEchoServer = {
                        send: function (request) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new inMemoryHttpResponse_1.InMemoryHttpResponse(request, 200, request.headers, request.serializedBody)];
                            });
                        }); }
                    };
                    policy = policyFactory(inMemoryEchoServer, new requestPolicyOptions_1.RequestPolicyOptions());
                    bodySpec = sequenceSpec_1.sequenceSpec(stringSpec_1.default, { xmlRootName: "my-root", xmlElementName: "item" });
                    request = new httpRequest_1.HttpRequest({
                        method: "POST",
                        url: "/",
                        headers: { "Content-Type": "application/xml" },
                        operationSpec: {
                            requestHttpMethod: httpMethod_1.HttpMethod.GET,
                            requestBodySpec: bodySpec,
                            responseBodySpec: bodySpec
                        },
                        body: ["foo", "bar", "baz"]
                    });
                    return [4 /*yield*/, policy.send(request)];
                case 1:
                    response = _c.sent();
                    _b = (_a = assert).deepEqual;
                    return [4 /*yield*/, response.deserializedBody()];
                case 2:
                    _b.apply(_a, [_c.sent(), ["foo", "bar", "baz"]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("ignores bodies when no bodySpec is provided", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var policyFactory, inMemoryEchoServer, policy, expectedBody, request, response, responseBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    policyFactory = serializationPolicy_1.serializationPolicy();
                    inMemoryEchoServer = {
                        send: function (request) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new inMemoryHttpResponse_1.InMemoryHttpResponse(request, 200, request.headers, request.serializedBody || request.body)];
                            });
                        }); }
                    };
                    policy = policyFactory(inMemoryEchoServer, new requestPolicyOptions_1.RequestPolicyOptions());
                    expectedBody = "This is my body";
                    request = new httpRequest_1.HttpRequest({
                        method: "POST",
                        url: "/",
                        body: expectedBody
                    });
                    return [4 /*yield*/, policy.send(request)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.textBody()];
                case 2:
                    responseBody = _a.sent();
                    assert.strictEqual(responseBody, expectedBody);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=serializationPolicyTests.js.map