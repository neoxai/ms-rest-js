"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var requestPolicy_1 = require("./requestPolicy");
function logPolicy(logger) {
    if (logger === void 0) { logger = console.log; }
    return function (nextPolicy, options) {
        return new LogPolicy(nextPolicy, options, logger);
    };
}
exports.logPolicy = logPolicy;
var LogPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(LogPolicy, _super);
    function LogPolicy(nextPolicy, options, logger) {
        if (logger === void 0) { logger = console.log; }
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.logger = logger;
        return _this;
    }
    LogPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._nextPolicy.sendRequest(request)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.logResponse(response)];
                }
            });
        });
    };
    LogPolicy.prototype.logResponse = function (response) {
        this.logger(">> Request: " + JSON.stringify(response.request, undefined, 2));
        this.logger(">> Response status code: " + response.status);
        var responseBody = response.bodyAsText;
        this.logger(">> Body: " + responseBody);
        return Promise.resolve(response);
    };
    return LogPolicy;
}(requestPolicy_1.BaseRequestPolicy));
exports.LogPolicy = LogPolicy;
//# sourceMappingURL=logPolicy.js.map