// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as tslib_1 from "tslib";
import { AxiosHttpClient } from "./axiosHttpClient";
import { getPathStringFromParameter, getPathStringFromParameterPath } from "./operationParameter";
import { exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
import { generateClientRequestIdPolicy } from "./policies/generateClientRequestIdPolicy";
import { msRestUserAgentPolicy } from "./policies/msRestUserAgentPolicy";
import { redirectPolicy } from "./policies/redirectPolicy";
import { RequestPolicyOptions } from "./policies/requestPolicy";
import { rpRegistrationPolicy } from "./policies/rpRegistrationPolicy";
import { serializationPolicy } from "./policies/serializationPolicy";
import { signingPolicy } from "./policies/signingPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { QueryCollectionFormat } from "./queryCollectionFormat";
import { URLBuilder } from "./url";
import { Constants } from "./util/constants";
import * as utils from "./util/utils";
import { WebResource } from "./webResource";
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
            var moduleVersion = Constants.msRestVersion;
            this.addUserAgentInfo(moduleName + "/" + moduleVersion);
        }
        catch (err) {
            // do nothing
        }
        this._httpClient = options.httpClient || new AxiosHttpClient();
        this._requestPolicyOptions = new RequestPolicyOptions(options.httpPipelineLogger);
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
                            if (options instanceof WebResource) {
                                options.validateRequestProperties();
                                httpRequest = options;
                            }
                            else {
                                httpRequest = new WebResource();
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
            var requestUrl = URLBuilder.parse(operationSpec.baseUrl);
            if (operationSpec.path) {
                requestUrl.setPath(operationSpec.path);
            }
            if (operationSpec.urlParameters && operationSpec.urlParameters.length > 0) {
                for (var _i = 0, _a = operationSpec.urlParameters; _i < _a.length; _i++) {
                    var urlParameter = _a[_i];
                    var urlParameterValue = getOperationArgumentValueFromParameter(operationArguments, urlParameter, operationSpec.serializer);
                    urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, getPathStringFromParameter(urlParameter));
                    if (!urlParameter.skipEncoding) {
                        urlParameterValue = encodeURIComponent(urlParameterValue);
                    }
                    requestUrl.replaceAll("{" + (urlParameter.mapper.serializedName || getPathStringFromParameter(urlParameter)) + "}", urlParameterValue);
                }
            }
            if (operationSpec.queryParameters && operationSpec.queryParameters.length > 0) {
                for (var _b = 0, _c = operationSpec.queryParameters; _b < _c.length; _b++) {
                    var queryParameter = _c[_b];
                    var queryParameterValue = getOperationArgumentValueFromParameter(operationArguments, queryParameter, operationSpec.serializer);
                    if (queryParameterValue != undefined) {
                        queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, getPathStringFromParameter(queryParameter));
                        if (queryParameter.collectionFormat != undefined) {
                            if (queryParameter.collectionFormat === QueryCollectionFormat.Multi) {
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
                        requestUrl.setQueryParameter(queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter), queryParameterValue);
                    }
                }
            }
            httpRequest.url = requestUrl.toString();
            if (operationSpec.headerParameters) {
                for (var _e = 0, _f = operationSpec.headerParameters; _e < _f.length; _e++) {
                    var headerParameter = _f[_e];
                    var headerValue = getOperationArgumentValueFromParameter(operationArguments, headerParameter, operationSpec.serializer);
                    if (headerValue != undefined) {
                        headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, getPathStringFromParameter(headerParameter));
                        var headerCollectionPrefix = headerParameter.mapper.headerCollectionPrefix;
                        if (headerCollectionPrefix) {
                            for (var _g = 0, _h = Object.keys(headerValue); _g < _h.length; _g++) {
                                var key = _h[_g];
                                httpRequest.headers.set(headerCollectionPrefix + key, headerValue[key]);
                            }
                        }
                        else {
                            httpRequest.headers.set(headerParameter.mapper.serializedName || getPathStringFromParameter(headerParameter), headerValue);
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
                        var formDataParameterPropertyName = formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
                        httpRequest.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, getPathStringFromParameter(formDataParameter));
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
export { ServiceClient };
function createDefaultRequestPolicyCreators(credentials, options, userAgentInfo) {
    var defaultRequestPolicyCreators = [];
    if (options.generateClientRequestIdHeader) {
        defaultRequestPolicyCreators.push(generateClientRequestIdPolicy(options.clientRequestIdHeaderName));
    }
    if (credentials) {
        defaultRequestPolicyCreators.push(signingPolicy(credentials));
    }
    if (utils.isNode) {
        defaultRequestPolicyCreators.push(msRestUserAgentPolicy(userAgentInfo));
    }
    defaultRequestPolicyCreators.push(redirectPolicy());
    defaultRequestPolicyCreators.push(rpRegistrationPolicy(options.rpRegistrationRetryTimeout));
    if (!options.noRetryPolicy) {
        defaultRequestPolicyCreators.push(exponentialRetryPolicy());
        defaultRequestPolicyCreators.push(systemErrorRetryPolicy());
    }
    defaultRequestPolicyCreators.push(serializationPolicy());
    return defaultRequestPolicyCreators;
}
/**
 * Get the property parent for the property at the provided path when starting with the provided
 * parent object.
 */
export function getPropertyParent(parent, propertyPath) {
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
                var parameterPathString = getPathStringFromParameterPath(parameterPath, parameterMapper);
                serializer.serialize(parameterMapper, value, parameterPathString);
            }
        }
        else {
            for (var propertyName in parameterPath) {
                var propertyMapper = parameterMapper.type.modelProperties[propertyName];
                var propertyPath = parameterPath[propertyName];
                var propertyValue = getOperationArgumentValueFromParameterPath(operationArguments, propertyPath, propertyMapper, serializer);
                // Serialize just for validation purposes.
                var propertyPathString = getPathStringFromParameterPath(propertyPath, propertyMapper);
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