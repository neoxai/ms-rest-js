"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axiosHttpClient_1 = require("./axiosHttpClient");
var operationParameter_1 = require("./operationParameter");
var exponentialRetryPolicy_1 = require("./policies/exponentialRetryPolicy");
var generateClientRequestIdPolicy_1 = require("./policies/generateClientRequestIdPolicy");
var msRestUserAgentPolicy_1 = require("./policies/msRestUserAgentPolicy");
var redirectPolicy_1 = require("./policies/redirectPolicy");
var requestPolicy_1 = require("./policies/requestPolicy");
var rpRegistrationPolicy_1 = require("./policies/rpRegistrationPolicy");
var serializationPolicy_1 = require("./policies/serializationPolicy");
var signingPolicy_1 = require("./policies/signingPolicy");
var systemErrorRetryPolicy_1 = require("./policies/systemErrorRetryPolicy");
var queryCollectionFormat_1 = require("./queryCollectionFormat");
var url_1 = require("./url");
var constants_1 = require("./util/constants");
var utils = require("./util/utils");
var webResource_1 = require("./webResource");
/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
var ServiceClient = /** @class */ (function () {
    /**
     * The ServiceClient constructor
     * @constructor
     * @param {ServiceClientCredentials }[credentials] - BasicAuthenticationCredentials or
     * TokenCredentials object used for authentication.
     * @param { ServiceClientOptions } [options] The service client options that govern the behavior of the client.
     */
    function ServiceClient(credentials, options) {
        if (!options) {
            options = {};
        }
        if (!options.requestOptions) {
            options.requestOptions = {};
        }
        this.userAgentInfo = { value: [] };
        if (credentials && !credentials.signRequest) {
            throw new Error("credentials argument needs to implement signRequest method");
        }
        try {
            var moduleName = "ms-rest-js";
            var moduleVersion = constants_1.Constants.msRestVersion;
            this.addUserAgentInfo(moduleName + "/" + moduleVersion);
        }
        catch (err) {
            // do nothing
        }
        this._httpClient = options.httpClient || new axiosHttpClient_1.AxiosHttpClient();
        this._requestPolicyOptions = new requestPolicy_1.RequestPolicyOptions(options.httpPipelineLogger);
        this._requestPolicyCreators = options.requestPolicyCreators || createDefaultRequestPolicyCreators(credentials, options, this.userAgentInfo.value);
    }
    /**
     * Adds custom information to user agent header
     * @param {any} additionalUserAgentInfo - information to be added to user agent header, as string.
     */
    ServiceClient.prototype.addUserAgentInfo = function (additionalUserAgentInfo) {
        if (this.userAgentInfo.value.indexOf(additionalUserAgentInfo) === -1) {
            this.userAgentInfo.value.push(additionalUserAgentInfo);
        }
        return;
    };
    /**
     * Send the provided httpRequest.
     */
    ServiceClient.prototype.sendRequest = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var httpRequest, operationResponse, httpPipeline, i, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options === null || options === undefined || typeof options !== "object") {
                            throw new Error("options cannot be null or undefined and it must be of type object.");
                        }
                        try {
                            if (options instanceof webResource_1.WebResource) {
                                options.validateRequestProperties();
                                httpRequest = options;
                            }
                            else {
                                httpRequest = new webResource_1.WebResource();
                                httpRequest = httpRequest.prepare(options);
                            }
                        }
                        catch (error) {
                            return [2 /*return*/, Promise.reject(error)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        httpPipeline = this._httpClient;
                        if (this._requestPolicyCreators && this._requestPolicyCreators.length > 0) {
                            for (i = this._requestPolicyCreators.length - 1; i >= 0; --i) {
                                httpPipeline = this._requestPolicyCreators[i](httpPipeline, this._requestPolicyOptions);
                            }
                        }
                        return [4 /*yield*/, httpPipeline.sendRequest(httpRequest)];
                    case 2:
                        operationResponse = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/, Promise.resolve(operationResponse)];
                }
            });
        });
    };
    /**
     * Send an HTTP request that is populated using the provided OperationSpec.
     * @param {WebResource} httpRequest - The HTTP request to populate and then to send.
     * @param {operationSpec} operationSpec - The OperationSpec to use to populate the httpRequest.
     */
    ServiceClient.prototype.sendOperationRequest = function (httpRequest, operationArguments, operationSpec) {
        var result;
        try {
            httpRequest.method = operationSpec.httpMethod;
            httpRequest.operationSpec = operationSpec;
            var requestUrl = url_1.URLBuilder.parse(operationSpec.baseUrl);
            if (operationSpec.path) {
                requestUrl.setPath(operationSpec.path);
            }
            if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
                for (var _i = 0, _a = operationSpec.urlParameters; _i < _a.length; _i++) {
                    var urlParameter = _a[_i];
                    var urlParameterValue = getOperationArgumentValueFromParameter(operationArguments, urlParameter, operationSpec.serializer);
                    urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, operationParameter_1.getPathStringFromParameter(urlParameter));
                    if (!urlParameter.skipEncoding) {
                        urlParameterValue = encodeURIComponent(urlParameterValue);
                    }
                    requestUrl.replaceAll("{" + (urlParameter.mapper.serializedName || operationParameter_1.getPathStringFromParameter(urlParameter)) + "}", urlParameterValue);
                }
            }
            if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
                for (var _b = 0, _c = operationSpec.queryParameters; _b < _c.length; _b++) {
                    var queryParameter = _c[_b];
                    var queryParameterValue = getOperationArgumentValueFromParameter(operationArguments, queryParameter, operationSpec.serializer);
                    if (queryParameterValue != undefined) {
                        queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, operationParameter_1.getPathStringFromParameter(queryParameter));
                        if (queryParameter.collectionFormat != undefined) {
                            if (queryParameter.collectionFormat === queryCollectionFormat_1.QueryCollectionFormat.Multi) {
                                if (queryParameterValue.length === 0) {
                                    queryParameterValue = "";
                                }
                                else {
                                    for (var _d = 0, queryParameterValue_1 = queryParameterValue; _d < queryParameterValue_1.length; _d++) {
                                        var item = queryParameterValue_1[_d];
                                        queryParameterValue = (item == undefined ? "" : item.toString());
                                    }
                                }
                            }
                            else {
                                queryParameterValue = queryParameterValue.join(queryParameter.collectionFormat);
                            }
                        }
                        if (!queryParameter.skipEncoding) {
                            queryParameterValue = encodeURIComponent(queryParameterValue);
                        }
                        requestUrl.setQueryParameter(queryParameter.mapper.serializedName || operationParameter_1.getPathStringFromParameter(queryParameter), queryParameterValue);
                    }
                }
            }
            httpRequest.url = requestUrl.toString();
            if (operationSpec.headerParameters) {
                for (var _e = 0, _f = operationSpec.headerParameters; _e < _f.length; _e++) {
                    var headerParameter = _f[_e];
                    var headerValue = getOperationArgumentValueFromParameter(operationArguments, headerParameter, operationSpec.serializer);
                    if (headerValue != undefined) {
                        headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, operationParameter_1.getPathStringFromParameter(headerParameter));
                        var headerCollectionPrefix = headerParameter.mapper.headerCollectionPrefix;
                        if (headerCollectionPrefix) {
                            for (var _g = 0, _h = Object.keys(headerValue); _g < _h.length; _g++) {
                                var key = _h[_g];
                                httpRequest.headers.set(headerCollectionPrefix + key, headerValue[key]);
                            }
                        }
                        else {
                            httpRequest.headers.set(headerParameter.mapper.serializedName || operationParameter_1.getPathStringFromParameter(headerParameter), headerValue);
                        }
                    }
                }
            }
            if (operationSpec.contentType) {
                httpRequest.headers.set("Content-Type", operationSpec.contentType);
            }
            if (operationArguments.customHeaders) {
                for (var customHeaderName in operationArguments.customHeaders) {
                    httpRequest.headers.set(customHeaderName, operationArguments.customHeaders[customHeaderName]);
                }
            }
            if (operationArguments.abortSignal) {
                httpRequest.abortSignal = operationArguments.abortSignal;
            }
            if (operationArguments.onUploadProgress) {
                httpRequest.onUploadProgress = operationArguments.onUploadProgress;
            }
            if (operationArguments.onDownloadProgress) {
                httpRequest.onDownloadProgress = operationArguments.onDownloadProgress;
            }
            if (operationSpec.requestBody) {
                httpRequest.body = getOperationArgumentValueFromParameter(operationArguments, operationSpec.requestBody, operationSpec.serializer);
            }
            else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
                httpRequest.formData = {};
                for (var _j = 0, _k = operationSpec.formDataParameters; _j < _k.length; _j++) {
                    var formDataParameter = _k[_j];
                    var formDataParameterValue = getOperationArgumentValueFromParameter(operationArguments, formDataParameter, operationSpec.serializer);
                    if (formDataParameterValue != undefined) {
                        var formDataParameterPropertyName = formDataParameter.mapper.serializedName || operationParameter_1.getPathStringFromParameter(formDataParameter);
                        httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, operationParameter_1.getPathStringFromParameter(formDataParameter));
                    }
                }
            }
            result = this.sendRequest(httpRequest);
        }
        catch (error) {
            result = Promise.reject(error);
        }
        return result;
    };
    return ServiceClient;
}());
exports.ServiceClient = ServiceClient;
function createDefaultRequestPolicyCreators(credentials, options, userAgentInfo) {
    var defaultRequestPolicyCreators = [];
    if (options.generateClientRequestIdHeader) {
        defaultRequestPolicyCreators.push(generateClientRequestIdPolicy_1.generateClientRequestIdPolicy(options.clientRequestIdHeaderName));
    }
    if (credentials) {
        defaultRequestPolicyCreators.push(signingPolicy_1.signingPolicy(credentials));
    }
    if (utils.isNode) {
        defaultRequestPolicyCreators.push(msRestUserAgentPolicy_1.msRestUserAgentPolicy(userAgentInfo));
    }
    defaultRequestPolicyCreators.push(redirectPolicy_1.redirectPolicy());
    defaultRequestPolicyCreators.push(rpRegistrationPolicy_1.rpRegistrationPolicy(options.rpRegistrationRetryTimeout));
    if (!options.noRetryPolicy) {
        defaultRequestPolicyCreators.push(exponentialRetryPolicy_1.exponentialRetryPolicy());
        defaultRequestPolicyCreators.push(systemErrorRetryPolicy_1.systemErrorRetryPolicy());
    }
    defaultRequestPolicyCreators.push(serializationPolicy_1.serializationPolicy());
    return defaultRequestPolicyCreators;
}
/**
 * Get the property parent for the property at the provided path when starting with the provided
 * parent object.
 */
function getPropertyParent(parent, propertyPath) {
    if (parent && propertyPath) {
        var propertyPathLength = propertyPath.length;
        for (var i = 0; i < propertyPathLength - 1; ++i) {
            var propertyName = propertyPath[i];
            if (!parent[propertyName]) {
                parent[propertyName] = {};
            }
            parent = parent[propertyName];
        }
    }
    return parent;
}
exports.getPropertyParent = getPropertyParent;
function getOperationArgumentValueFromParameter(operationArguments, parameter, serializer) {
    return getOperationArgumentValueFromParameterPath(operationArguments, parameter.parameterPath, parameter.mapper, serializer);
}
function getOperationArgumentValueFromParameterPath(operationArguments, parameterPath, parameterMapper, serializer) {
    var value;
    if (typeof parameterPath === "string") {
        parameterPath = [parameterPath];
    }
    if (operationArguments.arguments) {
        if (Array.isArray(parameterPath)) {
            if (parameterPath.length > 0) {
                value = operationArguments.arguments;
                for (var _i = 0, parameterPath_1 = parameterPath; _i < parameterPath_1.length; _i++) {
                    var parameterPathPart = parameterPath_1[_i];
                    value = value[parameterPathPart];
                    if (value == undefined) {
                        break;
                    }
                }
                // Serialize just for validation purposes.
                var parameterPathString = operationParameter_1.getPathStringFromParameterPath(parameterPath, parameterMapper);
                serializer.serialize(parameterMapper, value, parameterPathString);
            }
        }
        else {
            for (var propertyName in parameterPath) {
                var propertyMapper = parameterMapper.type.modelProperties[propertyName];
                var propertyPath = parameterPath[propertyName];
                var propertyValue = getOperationArgumentValueFromParameterPath(operationArguments, propertyPath, propertyMapper, serializer);
                // Serialize just for validation purposes.
                var propertyPathString = operationParameter_1.getPathStringFromParameterPath(propertyPath, propertyMapper);
                serializer.serialize(propertyMapper, propertyValue, propertyPathString);
                if (propertyValue !== undefined) {
                    if (!value) {
                        value = {};
                    }
                    value[propertyName] = propertyValue;
                }
            }
        }
    }
    return value;
}
//# sourceMappingURL=serviceClient.js.map