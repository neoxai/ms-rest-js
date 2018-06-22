"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var msRest_1 = require("../../lib/msRest");
var assert = require("assert");
describe("ServiceClient", function () {
    it("should serialize headerCollectionPrefix", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var expected, request, client;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            "foo-bar-alpha": "hello",
                            "foo-bar-beta": "world",
                            "unrelated": "42"
                        };
                        client = new msRest_1.ServiceClient(undefined, {
                            httpClient: {
                                sendRequest: function (req) {
                                    request = req;
                                    return Promise.resolve({});
                                }
                            },
                            requestPolicyCreators: []
                        });
                        return [4 /*yield*/, client.sendOperationRequest(new msRest_1.WebResource(), {
                                arguments: {
                                    metadata: {
                                        "alpha": "hello",
                                        "beta": "world"
                                    },
                                    unrelated: 42
                                }
                            }, {
                                httpMethod: "GET",
                                baseUrl: "httpbin.org",
                                serializer: new msRest_1.Serializer(),
                                headerParameters: [{
                                        parameterPath: "metadata",
                                        mapper: {
                                            serializedName: "metadata",
                                            type: {
                                                name: "Dictionary",
                                                value: {
                                                    type: {
                                                        name: "String"
                                                    }
                                                }
                                            },
                                            headerCollectionPrefix: "foo-bar-"
                                        }
                                    }, {
                                        parameterPath: "unrelated",
                                        mapper: {
                                            serializedName: "unrelated",
                                            type: {
                                                name: "Number"
                                            }
                                        }
                                    }],
                                responses: {
                                    200: {}
                                }
                            })];
                    case 1:
                        _a.sent();
                        assert(request);
                        assert.deepStrictEqual(request.headers.toJson(), expected);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=serviceClientTests.js.map