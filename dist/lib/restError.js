"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
function stripAuthorizationHeader(httpRequest) {
    var result = httpRequest;
    if (result.headers.contains("authorization")) {
        result = result.clone();
        result.headers.remove("authorization");
    }
    return result;
}
var RestError = /** @class */ (function (_super) {
    __extends(RestError, _super);
    function RestError(message, properties) {
        var _this = _super.call(this, message) || this;
        if (properties) {
            _this.code = properties.code;
            _this.statusCode = properties.statusCode;
            if (properties.request) {
                _this.request = stripAuthorizationHeader(properties.request);
            }
            _this.response = properties.response;
            if (_this.response && _this.response.request) {
                _this.response.request = stripAuthorizationHeader(_this.response.request);
            }
            _this.body = properties.body;
        }
        return _this;
    }
    return RestError;
}(Error));
exports.RestError = RestError;
//# sourceMappingURL=restError.js.map