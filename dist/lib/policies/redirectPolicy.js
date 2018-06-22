"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var requestPolicy_1 = require("./requestPolicy");
var url_1 = require("../url");
function redirectPolicy(maximumRetries) {
    if (maximumRetries === void 0) { maximumRetries = 20; }
    return function (nextPolicy, options) {
        return new RedirectPolicy(nextPolicy, options, maximumRetries);
    };
}
exports.redirectPolicy = redirectPolicy;
var RedirectPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(RedirectPolicy, _super);
    function RedirectPolicy(nextPolicy, options, maximumRetries) {
        if (maximumRetries === void 0) { maximumRetries = 20; }
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.maximumRetries = maximumRetries;
        return _this;
    }
    RedirectPolicy.prototype.handleRedirect = function (response, currentRetries) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request, locationHeader, builder, res, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = response.request;
                        locationHeader = response.headers.get("location");
                        if (!(locationHeader &&
                            (response.status === 300 || response.status === 307 || (response.status === 303 && request.method === "POST")) &&
                            (!this.maximumRetries || currentRetries < this.maximumRetries))) return [3 /*break*/, 5];
                        builder = url_1.URLBuilder.parse(request.url);
                        builder.setPath(locationHeader);
                        request.url = builder.toString();
                        // POST request with Status code 303 should be converted into a
                        // redirected GET request if the redirect url is present in the location header
                        if (response.status === 303) {
                            request.method = "GET";
                        }
                        res = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request)];
                    case 2:
                        res = _a.sent();
                        currentRetries++;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/, this.handleRedirect(res, currentRetries)];
                    case 5: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    RedirectPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleRedirect(response, 0)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RedirectPolicy;
}(requestPolicy_1.BaseRequestPolicy));
exports.RedirectPolicy = RedirectPolicy;
//# sourceMappingURL=redirectPolicy.js.map