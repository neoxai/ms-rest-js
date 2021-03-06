// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as tslib_1 from "tslib";
import * as os from "os";
import { HttpHeaders } from "../httpHeaders";
import { Constants } from "../util/constants";
import { isNode } from "../util/utils";
import { BaseRequestPolicy } from "./requestPolicy";
var HeaderConstants = Constants.HeaderConstants;
export function msRestUserAgentPolicy(userAgentInfo) {
    return function (nextPolicy, options) {
        return new MsRestUserAgentPolicy(nextPolicy, options, userAgentInfo);
    };
}
var MsRestUserAgentPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(MsRestUserAgentPolicy, _super);
    function MsRestUserAgentPolicy(nextPolicy, options, userAgentInfo) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.userAgentInfo = userAgentInfo;
        return _this;
    }
    MsRestUserAgentPolicy.prototype.tagRequest = function (request) {
        if (isNode) {
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
                request.headers = new HttpHeaders();
            }
            request.headers.set(HeaderConstants.USER_AGENT, this.userAgentInfo.join(" "));
        }
    };
    MsRestUserAgentPolicy.prototype.addUserAgentHeader = function (request) {
        if (!request.headers) {
            request.headers = new HttpHeaders();
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
}(BaseRequestPolicy));
export { MsRestUserAgentPolicy };
//# sourceMappingURL=msRestUserAgentPolicy.js.map