// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var _this = this;
import * as tslib_1 from "tslib";
import * as assert from "assert";
import { HttpHeaders } from "../../../lib/httpHeaders";
import { RequestPolicyOptions } from "../../../lib/policies/requestPolicy";
import { SerializationPolicy } from "../../../lib/policies/serializationPolicy";
import { WebResource } from "../../../lib/webResource";
describe("serializationPolicy", function () {
    var mockPolicy = {
        sendRequest: function (request) {
            return Promise.resolve({
                request: request,
                status: 200,
                headers: new HttpHeaders()
            });
        }
    };
    it("should not modify a request that has no request body mapper", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var serializationPolicy, request;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    serializationPolicy = new SerializationPolicy(mockPolicy, new RequestPolicyOptions());
                    request = new WebResource();
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