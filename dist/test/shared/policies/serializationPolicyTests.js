"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var httpHeaders_1 = require("../../../lib/httpHeaders");
var requestPolicy_1 = require("../../../lib/policies/requestPolicy");
var serializationPolicy_1 = require("../../../lib/policies/serializationPolicy");
var webResource_1 = require("../../../lib/webResource");
describe("serializationPolicy", function () {
    var mockPolicy = {
        sendRequest: function (request) {
            return Promise.resolve({
                request: request,
                status: 200,
                headers: new httpHeaders_1.HttpHeaders()
            });
        }
    };
    it("should not modify a request that has no request body mapper", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var serializationPolicy, request;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    serializationPolicy = new serializationPolicy_1.SerializationPolicy(mockPolicy, new requestPolicy_1.RequestPolicyOptions());
                    request = new webResource_1.WebResource();
                    request.body = "hello there!";
                    return [4 /*yield*/, serializationPolicy.sendRequest(request)];
                case 1:
                    _a.sent();
                    assert.strictEqual(request.body, "hello there!");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=serializationPolicyTests.js.map