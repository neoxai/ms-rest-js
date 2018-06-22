import * as tslib_1 from "tslib";
import { ServiceClient, WebResource, Serializer } from "../../lib/msRest";
import * as assert from "assert";
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
                        client = new ServiceClient(undefined, {
                            httpClient: {
                                sendRequest: function (req) {
                                    request = req;
                                    return Promise.resolve({});
                                }
                            },
                            requestPolicyCreators: []
                        });
                        return [4 /*yield*/, client.sendOperationRequest(new WebResource(), {
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
                                serializer: new Serializer(),
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