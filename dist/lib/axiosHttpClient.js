"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = require("axios");
var FormData = require("form-data");
var tough = require("isomorphic-tough-cookie");
var xml2js = require("xml2js");
var httpHeaders_1 = require("./httpHeaders");
var restError_1 = require("./restError");
var utils_1 = require("./util/utils");
var axiosClient = axios_1.default.create();
if (utils_1.isNode) {
    // Workaround for https://github.com/axios/axios/issues/1158
    axiosClient.interceptors.request.use(function (config) { return (tslib_1.__assign({}, config, { method: config.method && config.method.toUpperCase() })); });
}
/**
 * A HttpClient implementation that uses axios to send HTTP requests.
 */
var AxiosHttpClient = /** @class */ (function () {
    function AxiosHttpClient() {
        this.cookieJar = utils_1.isNode ? new tough.CookieJar() : undefined;
    }
    AxiosHttpClient.prototype.sendRequest = function (httpRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var formData, requestForm_1, appendFormValue, formKey, formValue, j, contentType, cookieString, abortSignal, abortListener, cancelToken, rawHeaders, bodyType, axiosBody, userUploadProgress, onUploadProgress, userDownloadProgress, onDownloadProgress, res, config, err_1, axiosErr, headers, operationResponse, setCookieHeader_1, msg, errCode, e, contentType, contentComponents, xmlParser_1, parseString, _a, err_2, msg, errCode, e;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!httpRequest) {
                            return [2 /*return*/, Promise.reject(new Error("options (WebResource) cannot be null or undefined and must be of type object."))];
                        }
                        if (httpRequest.formData) {
                            formData = httpRequest.formData;
                            requestForm_1 = new FormData();
                            appendFormValue = function (key, value) {
                                // value function probably returns a stream so we can provide a fresh stream on each retry
                                if (typeof value === "function") {
                                    value = value();
                                }
                                if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
                                    requestForm_1.append(key, value.value, value.options);
                                }
                                else {
                                    requestForm_1.append(key, value);
                                }
                            };
                            for (formKey in formData) {
                                if (formData.hasOwnProperty(formKey)) {
                                    formValue = formData[formKey];
                                    if (formValue instanceof Array) {
                                        for (j = 0; j < formValue.length; j++) {
                                            appendFormValue(formKey, formValue[j]);
                                        }
                                    }
                                    else {
                                        appendFormValue(formKey, formValue);
                                    }
                                }
                            }
                            httpRequest.body = requestForm_1;
                            httpRequest.formData = undefined;
                            contentType = httpRequest.headers && httpRequest.headers.get("Content-Type");
                            if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
                                if (typeof requestForm_1.getBoundary === "function") {
                                    httpRequest.headers.set("Content-Type", "multipart/form-data; boundary=" + requestForm_1.getBoundary());
                                }
                                else {
                                    // browser will automatically apply a suitable content-type header
                                    httpRequest.headers.remove("Content-Type");
                                }
                            }
                        }
                        if (!(this.cookieJar && !httpRequest.headers.get("Cookie"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.cookieJar.getCookieString(httpRequest.url, function (err, cookie) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(cookie);
                                    }
                                });
                            })];
                    case 1:
                        cookieString = _b.sent();
                        httpRequest.headers.set("Cookie", cookieString);
                        _b.label = 2;
                    case 2:
                        abortSignal = httpRequest.abortSignal;
                        if (abortSignal && abortSignal.aborted) {
                            throw new restError_1.RestError("The request was aborted", "REQUEST_ABORTED_ERROR", undefined, httpRequest);
                        }
                        cancelToken = abortSignal && new axios_1.default.CancelToken(function (canceler) {
                            abortListener = function () { return canceler(); };
                            abortSignal.addEventListener("abort", abortListener);
                        });
                        rawHeaders = httpRequest.headers.rawHeaders();
                        bodyType = typeof httpRequest.body;
                        axiosBody = bodyType === "undefined" ? null :
                            bodyType === "function" ? httpRequest.body() :
                                httpRequest.body;
                        userUploadProgress = httpRequest.onUploadProgress;
                        onUploadProgress = userUploadProgress && (function (rawEvent) {
                            return userUploadProgress({ loadedBytes: rawEvent.loaded, totalBytes: rawEvent.lengthComputable ? rawEvent.total : undefined });
                        });
                        userDownloadProgress = httpRequest.onDownloadProgress;
                        onDownloadProgress = userDownloadProgress && (function (rawEvent) {
                            return userDownloadProgress({ loadedBytes: rawEvent.loaded, totalBytes: rawEvent.lengthComputable ? rawEvent.total : undefined });
                        });
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, 6, 7]);
                        config = {
                            method: httpRequest.method,
                            url: httpRequest.url,
                            headers: rawHeaders,
                            data: axiosBody,
                            transformResponse: undefined,
                            validateStatus: function () { return true; },
                            // Workaround for https://github.com/axios/axios/issues/1362
                            maxContentLength: 1024 * 1024 * 1024 * 10,
                            responseType: httpRequest.rawResponse ? (utils_1.isNode ? "stream" : "blob") : "text",
                            cancelToken: cancelToken,
                            onUploadProgress: onUploadProgress,
                            onDownloadProgress: onDownloadProgress
                        };
                        return [4 /*yield*/, axiosClient(config)];
                    case 4:
                        res = _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        err_1 = _b.sent();
                        if (err_1 instanceof axios_1.default.Cancel) {
                            throw new restError_1.RestError(err_1.message, "REQUEST_ABORTED_ERROR", undefined, httpRequest);
                        }
                        else {
                            axiosErr = err_1;
                            throw new restError_1.RestError(axiosErr.message, "REQUEST_SEND_ERROR", undefined, httpRequest);
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        if (abortSignal && abortListener) {
                            abortSignal.removeEventListener("abort", abortListener);
                        }
                        return [7 /*endfinally*/];
                    case 7:
                        headers = new httpHeaders_1.HttpHeaders(res.headers);
                        operationResponse = {
                            request: httpRequest,
                            status: res.status,
                            headers: headers,
                            readableStreamBody: httpRequest.rawResponse && utils_1.isNode ? res.data : undefined,
                            blobBody: !httpRequest.rawResponse || utils_1.isNode ? undefined : function () { return res.data; }
                        };
                        if (!this.cookieJar) return [3 /*break*/, 9];
                        setCookieHeader_1 = operationResponse.headers.get("Set-Cookie");
                        if (!(setCookieHeader_1 != undefined)) return [3 /*break*/, 9];
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.cookieJar.setCookie(setCookieHeader_1, httpRequest.url, function (err) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve();
                                    }
                                });
                            })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        if (!!httpRequest.rawResponse) return [3 /*break*/, 15];
                        try {
                            operationResponse.bodyAsText = res.data;
                        }
                        catch (err) {
                            msg = "Error \"" + err + "\" occured while converting the raw response body into string.";
                            errCode = err.code || "RAWTEXT_CONVERSION_ERROR";
                            e = new restError_1.RestError(msg, errCode, res.status, httpRequest, operationResponse, res.data);
                            return [2 /*return*/, Promise.reject(e)];
                        }
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 14, , 15]);
                        if (!operationResponse.bodyAsText) return [3 /*break*/, 13];
                        contentType = operationResponse.headers.get("Content-Type") || "";
                        contentComponents = contentType.split(";").map(function (component) { return component.toLowerCase(); });
                        if (!contentComponents.some(function (component) { return component === "application/xml" || component === "text/xml"; })) return [3 /*break*/, 12];
                        xmlParser_1 = new xml2js.Parser(XML2JS_PARSER_OPTS);
                        parseString = new Promise(function (resolve, reject) {
                            xmlParser_1.parseString(operationResponse.bodyAsText, function (err, result) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(result);
                                }
                            });
                        });
                        _a = operationResponse;
                        return [4 /*yield*/, parseString];
                    case 11:
                        _a.parsedBody = _b.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        if (contentComponents.some(function (component) { return component === "application/json" || component === "text/json"; }) || !contentType) {
                            operationResponse.parsedBody = JSON.parse(operationResponse.bodyAsText);
                        }
                        _b.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        err_2 = _b.sent();
                        msg = "Error \"" + err_2 + "\" occured while executing JSON.parse on the response body - " + operationResponse.bodyAsText + ".";
                        errCode = err_2.code || "JSON_PARSE_ERROR";
                        e = new restError_1.RestError(msg, errCode, res.status, httpRequest, operationResponse, operationResponse.bodyAsText);
                        return [2 /*return*/, Promise.reject(e)];
                    case 15: return [2 /*return*/, Promise.resolve(operationResponse)];
                }
            });
        });
    };
    return AxiosHttpClient;
}());
exports.AxiosHttpClient = AxiosHttpClient;
var XML2JS_PARSER_OPTS = {
    explicitArray: false,
    explicitCharkey: false,
    explicitRoot: false
};
//# sourceMappingURL=axiosHttpClient.js.map