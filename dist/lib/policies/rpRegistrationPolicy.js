"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils = require("../util/utils");
var requestPolicy_1 = require("./requestPolicy");
function rpRegistrationPolicy(retryTimeout) {
    if (retryTimeout === void 0) { retryTimeout = 30; }
    return function (nextPolicy, options) {
        return new RPRegistrationPolicy(nextPolicy, options, retryTimeout);
    };
}
exports.rpRegistrationPolicy = rpRegistrationPolicy;
var RPRegistrationPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(RPRegistrationPolicy, _super);
    function RPRegistrationPolicy(nextPolicy, options, _retryTimeout) {
        if (_retryTimeout === void 0) { _retryTimeout = 30; }
        var _this = _super.call(this, nextPolicy, options) || this;
        _this._retryTimeout = _retryTimeout;
        return _this;
    }
    RPRegistrationPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._nextPolicy.sendRequest(request.clone())];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.registerIfNeeded(request, response)];
                }
            });
        });
    };
    RPRegistrationPolicy.prototype.registerIfNeeded = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rpName, urlPrefix, registrationStatus, err_1, finalRes, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (response.status === 409) {
                            rpName = this.checkRPNotRegisteredError(response.bodyAsText);
                        }
                        if (!rpName) return [3 /*break*/, 9];
                        urlPrefix = this.extractSubscriptionUrl(request.url);
                        registrationStatus = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.registerRP(urlPrefix, rpName, request)];
                    case 2:
                        registrationStatus = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!registrationStatus) return [3 /*break*/, 9];
                        // Retry the original request. We have to change the x-ms-client-request-id
                        // otherwise Azure endpoint will return the initial 409 (cached) response.
                        request.headers.set("x-ms-client-request-id", utils.generateUuid());
                        finalRes = void 0;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request.clone())];
                    case 6:
                        finalRes = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 8: return [2 /*return*/, Promise.resolve(finalRes)];
                    case 9: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * Reuses the headers of the original request and url (if specified).
     * @param {WebResource} originalRequest The original request
     * @param {boolean} reuseUrlToo Should the url from the original request be reused as well. Default false.
     * @returns {object} reqOptions - A new request object with desired headers.
     */
    RPRegistrationPolicy.prototype.getRequestEssentials = function (originalRequest, reuseUrlToo) {
        if (reuseUrlToo === void 0) { reuseUrlToo = false; }
        var reqOptions = {
            headers: {}
        };
        if (reuseUrlToo) {
            reqOptions.url = originalRequest.url;
        }
        // Copy over the original request headers. This will get us the auth token and other useful stuff from
        // the original request header. Thus making it easier to make requests from this filter.
        for (var h in originalRequest.headers) {
            reqOptions.headers.set(h, originalRequest.headers.get(h));
        }
        // We have to change the x-ms-client-request-id otherwise Azure endpoint
        // will return the initial 409 (cached) response.
        reqOptions.headers["x-ms-client-request-id"] = utils.generateUuid();
        // Set content-type to application/json
        reqOptions.headers["Content-Type"] = "application/json; charset=utf-8";
        return reqOptions;
    };
    /**
     * Validates the error code and message associated with 409 response status code. If it matches to that of
     * RP not registered then it returns the name of the RP else returns undefined.
     * @param {string} body - The response body received after making the original request.
     * @returns {string} result The name of the RP if condition is satisfied else undefined.
     */
    RPRegistrationPolicy.prototype.checkRPNotRegisteredError = function (body) {
        var result, responseBody;
        if (body) {
            try {
                responseBody = JSON.parse(body);
            }
            catch (err) {
                // do nothing;
            }
            if (responseBody && responseBody.error && responseBody.error.message &&
                responseBody.error.code && responseBody.error.code === "MissingSubscriptionRegistration") {
                var matchRes = responseBody.error.message.match(/.*'(.*)'/i);
                if (matchRes) {
                    result = matchRes.pop();
                }
            }
        }
        return result;
    };
    /**
     * Extracts the first part of the URL, just after subscription:
     * https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} url - The original request url
     * @returns {string} urlPrefix The url prefix as explained above.
     */
    RPRegistrationPolicy.prototype.extractSubscriptionUrl = function (url) {
        var result;
        var matchRes = url.match(/.*\/subscriptions\/[a-f0-9-]+\//ig);
        if (matchRes && matchRes[0]) {
            result = matchRes[0];
        }
        else {
            throw new Error("Unable to extract subscriptionId from the given url - " + url + ".");
        }
        return result;
    };
    /**
     * Registers the given provider.
     * @param {string} urlPrefix - https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} provider - The provider name to be registered.
     * @param {object} originalRequest - The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @param {registrationCallback} callback - The callback that handles the RP registration
     */
    RPRegistrationPolicy.prototype.registerRP = function (urlPrefix, provider, originalRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var postUrl, getUrl, reqOptions, response, err_3, statusRes, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postUrl = urlPrefix + "providers/" + provider + "/register?api-version=2016-02-01";
                        getUrl = urlPrefix + "providers/" + provider + "?api-version=2016-02-01";
                        reqOptions = this.getRequestEssentials(originalRequest);
                        reqOptions.method = "POST";
                        reqOptions.url = postUrl;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(reqOptions)];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 4:
                        if (response.status !== 200) {
                            return [2 /*return*/, Promise.reject(new Error("Autoregistration of " + provider + " failed. Please try registering manually."))];
                        }
                        statusRes = false;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getRegistrationStatus(getUrl, originalRequest)];
                    case 6:
                        statusRes = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_4)];
                    case 8: return [2 /*return*/, Promise.resolve(statusRes)];
                }
            });
        });
    };
    /**
     * Polls the registration status of the provider that was registered. Polling happens at an interval of 30 seconds.
     * Polling will happen till the registrationState property of the response body is "Registered".
     * @param {string} url - The request url for polling
     * @param {object} originalRequest - The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @returns {Promise<boolean>} promise - True if RP Registration is successful.
     */
    RPRegistrationPolicy.prototype.getRegistrationStatus = function (url, originalRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var reqOptions, res, result, err_5, obj;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqOptions = this.getRequestEssentials(originalRequest);
                        result = false;
                        reqOptions.url = url;
                        reqOptions.method = "GET";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(reqOptions)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_5)];
                    case 4:
                        obj = res.parsedBody;
                        if (res.parsedBody && obj.registrationState && obj.registrationState === "Registered") {
                            result = true;
                        }
                        else {
                            setTimeout(function () { return _this.getRegistrationStatus(url, originalRequest); }, this._retryTimeout * 1000);
                        }
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    return RPRegistrationPolicy;
}(requestPolicy_1.BaseRequestPolicy));
exports.RPRegistrationPolicy = RPRegistrationPolicy;
//# sourceMappingURL=rpRegistrationPolicy.js.map