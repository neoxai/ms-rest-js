"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var requestPolicy_1 = require("./requestPolicy");
function signingPolicy(authenticationProvider) {
    return function (nextPolicy, options) {
        return new SigningPolicy(nextPolicy, options, authenticationProvider);
    };
}
exports.signingPolicy = signingPolicy;
var SigningPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(SigningPolicy, _super);
    function SigningPolicy(nextPolicy, options, authenticationProvider) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.authenticationProvider = authenticationProvider;
        return _this;
    }
    SigningPolicy.prototype.signRequest = function (request) {
        return this.authenticationProvider.signRequest(request);
    };
    SigningPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextRequest;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.signRequest(request)];
                    case 1:
                        nextRequest = _a.sent();
                        return [4 /*yield*/, this._nextPolicy.sendRequest(nextRequest)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SigningPolicy;
}(requestPolicy_1.BaseRequestPolicy));
exports.SigningPolicy = SigningPolicy;
//# sourceMappingURL=signingPolicy.js.map