"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var os = require("os");
var httpHeaders_1 = require("../httpHeaders");
var constants_1 = require("../util/constants");
var utils_1 = require("../util/utils");
var requestPolicy_1 = require("./requestPolicy");
var HeaderConstants = constants_1.Constants.HeaderConstants;
function msRestUserAgentPolicy(userAgentInfo) {
    return function (nextPolicy, options) {
        return new MsRestUserAgentPolicy(nextPolicy, options, userAgentInfo);
    };
}
exports.msRestUserAgentPolicy = msRestUserAgentPolicy;
var MsRestUserAgentPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(MsRestUserAgentPolicy, _super);
    function MsRestUserAgentPolicy(nextPolicy, options, userAgentInfo) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.userAgentInfo = userAgentInfo;
        return _this;
    }
    MsRestUserAgentPolicy.prototype.tagRequest = function (request) {
        if (utils_1.isNode) {
            var osInfo = "(" + os.arch() + "-" + os.type() + "-" + os.release() + ")";
            if (this.userAgentInfo.indexOf(osInfo) === -1) {
                this.userAgentInfo.unshift(osInfo);
            }
            var runtimeInfo = "Node/" + process.version;
            if (this.userAgentInfo.indexOf(runtimeInfo) === -1) {
                this.userAgentInfo.unshift(runtimeInfo);
            }
            var nodeSDKSignature = "Azure-SDK-For-Node";
            if (this.userAgentInfo.indexOf(nodeSDKSignature) === -1) {
                var azureRuntime = "ms-rest-azure";
                var insertIndex = this.userAgentInfo.indexOf(azureRuntime);
                // insert after azureRuntime, otherwise, insert last.
                insertIndex = insertIndex < 0 ? this.userAgentInfo.length : insertIndex + 1;
                this.userAgentInfo.splice(insertIndex, 0, nodeSDKSignature);
            }
            if (!request.headers) {
                request.headers = new httpHeaders_1.HttpHeaders();
            }
            request.headers.set(HeaderConstants.USER_AGENT, this.userAgentInfo.join(" "));
        }
    };
    MsRestUserAgentPolicy.prototype.addUserAgentHeader = function (request) {
        if (!request.headers) {
            request.headers = new httpHeaders_1.HttpHeaders();
        }
        if (!request.headers.get(HeaderConstants.USER_AGENT)) {
            this.tagRequest(request);
        }
    };
    MsRestUserAgentPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.addUserAgentHeader(request);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return MsRestUserAgentPolicy;
}(requestPolicy_1.BaseRequestPolicy));
exports.MsRestUserAgentPolicy = MsRestUserAgentPolicy;
//# sourceMappingURL=msRestUserAgentPolicy.js.map