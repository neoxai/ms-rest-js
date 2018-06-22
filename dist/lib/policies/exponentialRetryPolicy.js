"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils = require("../util/utils");
var requestPolicy_1 = require("./requestPolicy");
function exponentialRetryPolicy(retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
    return function (nextPolicy, options) {
        return new ExponentialRetryPolicy(nextPolicy, options, retryCount, retryInterval, minRetryInterval, maxRetryInterval);
    };
}
exports.exponentialRetryPolicy = exponentialRetryPolicy;
/**
 * @class
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 *
 * @constructor
 * @param {number} retryCount        The client retry count.
 * @param {number} retryInterval     The client retry interval, in milliseconds.
 * @param {number} minRetryInterval  The minimum retry interval, in milliseconds.
 * @param {number} maxRetryInterval  The maximum retry interval, in milliseconds.
 */
var ExponentialRetryPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(ExponentialRetryPolicy, _super);
    function ExponentialRetryPolicy(nextPolicy, options, retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
        _this.DEFAULT_CLIENT_RETRY_COUNT = 3;
        _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
        _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;
        _this.retryCount = typeof retryCount === "number" ? retryCount : _this.DEFAULT_CLIENT_RETRY_COUNT;
        _this.retryInterval = typeof retryInterval === "number" ? retryInterval : _this.DEFAULT_CLIENT_RETRY_INTERVAL;
        _this.minRetryInterval = typeof minRetryInterval === "number" ? minRetryInterval : _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
        _this.maxRetryInterval = typeof maxRetryInterval === "number" ? maxRetryInterval : _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
        return _this;
    }
    /**
     * Determines if the operation should be retried and how long to wait until the next retry.
     *
     * @param {number} statusCode The HTTP status code.
     * @param {RetryData} retryData  The retry data.
     * @return {boolean} True if the operation qualifies for a retry; false otherwise.
     */
    ExponentialRetryPolicy.prototype.shouldRetry = function (statusCode, retryData) {
        if ((statusCode < 500 && statusCode !== 408) || statusCode === 501 || statusCode === 505) {
            return false;
        }
        var currentCount;
        if (!retryData) {
            throw new Error("retryData for the ExponentialRetryPolicyFilter cannot be null.");
        }
        else {
            currentCount = (retryData && retryData.retryCount);
        }
        return (currentCount < this.retryCount);
    };
    /**
     * Updates the retry data for the next attempt.
     *
     * @param {RetryData} retryData  The retry data.
     * @param {object} err        The operation"s error, if any.
     */
    ExponentialRetryPolicy.prototype.updateRetryData = function (retryData, err) {
        if (!retryData) {
            retryData = {
                retryCount: 0,
                retryInterval: 0
            };
        }
        if (err) {
            if (retryData.error) {
                err.innerError = retryData.error;
            }
            retryData.error = err;
        }
        // Adjust retry count
        retryData.retryCount++;
        // Adjust retry interval
        var incrementDelta = Math.pow(2, retryData.retryCount) - 1;
        var boundedRandDelta = this.retryInterval * 0.8 +
            Math.floor(Math.random() * (this.retryInterval * 1.2 - this.retryInterval * 0.8));
        incrementDelta *= boundedRandDelta;
        retryData.retryInterval = Math.min(this.minRetryInterval + incrementDelta, this.maxRetryInterval);
        return retryData;
    };
    ExponentialRetryPolicy.prototype.retry = function (request, response, retryData, requestError) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isAborted, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retryData = this.updateRetryData(retryData, requestError);
                        isAborted = request.abortSignal && request.abortSignal.aborted;
                        if (!(!isAborted && this.shouldRetry(response.status, retryData))) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, utils.delay(retryData.retryInterval)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request.clone())];
                    case 3:
                        response = _a.sent();
                        requestError = undefined;
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        requestError = err_1;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, this.retry(request, response, retryData, requestError)];
                    case 6:
                        if (isAborted || !utils.objectIsNull(requestError)) {
                            // If the operation failed in the end, return all errors instead of just the last one
                            requestError = retryData.error;
                            return [2 /*return*/, Promise.reject(requestError)];
                        }
                        else {
                            return [2 /*return*/, Promise.resolve(response)];
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ExponentialRetryPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request.clone())];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.retry(request, response)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, this.retry(request, error_1.response, undefined, error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ExponentialRetryPolicy;
}(requestPolicy_1.BaseRequestPolicy));
exports.ExponentialRetryPolicy = ExponentialRetryPolicy;
//# sourceMappingURL=exponentialRetryPolicy.js.map