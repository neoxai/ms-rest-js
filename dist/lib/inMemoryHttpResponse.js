"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var httpHeaders_1 = require("../lib/httpHeaders");
var InMemoryHttpResponse = /** @class */ (function () {
    function InMemoryHttpResponse(_request, _statusCode, headers, _bodyText, _deserializedBody) {
        this._request = _request;
        this._statusCode = _statusCode;
        this._bodyText = _bodyText;
        this._deserializedBody = _deserializedBody;
        this._headers = (headers instanceof httpHeaders_1.HttpHeaders ? headers : new httpHeaders_1.HttpHeaders(headers));
    }
    Object.defineProperty(InMemoryHttpResponse.prototype, "request", {
        get: function () {
            return this._request;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InMemoryHttpResponse.prototype, "statusCode", {
        get: function () {
            return this._statusCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InMemoryHttpResponse.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    InMemoryHttpResponse.prototype.textBody = function () {
        return Promise.resolve(this._bodyText);
    };
    InMemoryHttpResponse.prototype.parsedBody = function () {
        return Promise.resolve(this._bodyText == undefined ? undefined : JSON.parse(this._bodyText));
    };
    InMemoryHttpResponse.prototype.deserializedBody = function () {
        return Promise.resolve(this._deserializedBody);
    };
    Object.defineProperty(InMemoryHttpResponse.prototype, "readableStreamBody", {
        get: function () {
            // tslint:disable-next-line no-null-keyword
            return null;
        },
        enumerable: true,
        configurable: true
    });
    InMemoryHttpResponse.prototype.blobBody = function () {
        return Promise.resolve(new Blob([this._bodyText]));
    };
    return InMemoryHttpResponse;
}());
exports.InMemoryHttpResponse = InMemoryHttpResponse;
//# sourceMappingURL=inMemoryHttpResponse.js.map