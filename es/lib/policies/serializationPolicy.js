// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as tslib_1 from "tslib";
import { getPathStringFromParameter } from "../operationParameter";
import { RestError } from "../restError";
import { MapperType } from "../serializer";
import * as utils from "../util/utils";
import { BaseRequestPolicy } from "./requestPolicy";
/**
 * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
 * pass through the HTTP pipeline.
 */
export function serializationPolicy() {
    return function (nextPolicy, options) {
        return new SerializationPolicy(nextPolicy, options);
    };
}
/**
 * A RequestPolicy that will serialize HTTP request bodies as they pass through the HTTP pipeline.
 */
var SerializationPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(SerializationPolicy, _super);
    function SerializationPolicy(nextPolicy, options) {
        return _super.call(this, nextPolicy, options) || this;
    }
    SerializationPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, operationResponse, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.serializeRequestBody(request);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request)];
                    case 1:
                        operationResponse = _a.sent();
                        result = this.deserializeResponseBody(operationResponse);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        result = Promise.reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Serialize the provided HTTP request's body based on the requestBodyMapper assigned to the HTTP
     * request.
     * @param {WebResource} request - The HTTP request that will have its body serialized.
     */
    SerializationPolicy.prototype.serializeRequestBody = function (request) {
        var operationSpec = request.operationSpec;
        if (operationSpec && operationSpec.requestBody) {
            var bodyMapper = operationSpec.requestBody.mapper;
            if (bodyMapper) {
                try {
                    if (request.body != undefined || bodyMapper.required) {
                        var requestBodyParameterPathString = getPathStringFromParameter(operationSpec.requestBody);
                        request.body = operationSpec.serializer.serialize(bodyMapper, request.body, requestBodyParameterPathString);
                        if (operationSpec.isXML) {
                            if (bodyMapper.type.name === MapperType.Sequence) {
                                request.body = utils.stringifyXML(utils.prepareXMLRootList(request.body, bodyMapper.xmlElementName || bodyMapper.xmlName || bodyMapper.serializedName), { rootName: bodyMapper.xmlName || bodyMapper.serializedName });
                            }
                            else {
                                request.body = utils.stringifyXML(request.body, { rootName: bodyMapper.xmlName || bodyMapper.serializedName });
                            }
                        }
                        else if (bodyMapper.type.name !== MapperType.Stream) {
                            request.body = JSON.stringify(request.body);
                        }
                    }
                }
                catch (error) {
                    throw new Error("Error \"" + error.message + "\" occurred in serializing the payload - " + JSON.stringify(bodyMapper.serializedName, undefined, "  ") + ".");
                }
            }
        }
    };
    SerializationPolicy.prototype.deserializeResponseBody = function (response) {
        var operationSpec = response.request.operationSpec;
        if (operationSpec && operationSpec.responses) {
            var statusCode = response.status;
            var expectedStatusCodes = Object.keys(operationSpec.responses);
            var hasNoExpectedStatusCodes = (expectedStatusCodes.length === 0 || (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default"));
            var responseSpec = operationSpec.responses[statusCode];
            var isExpectedStatusCode = hasNoExpectedStatusCodes ? (200 <= statusCode && statusCode < 300) : !!responseSpec;
            if (!isExpectedStatusCode) {
                var defaultResponseSpec = operationSpec.responses.default;
                if (defaultResponseSpec) {
                    var initialErrorMessage = isStreamOperation(operationSpec.responses)
                        ? "Unexpected status code: " + statusCode
                        : response.bodyAsText;
                    var error = new RestError(initialErrorMessage);
                    error.statusCode = statusCode;
                    error.request = utils.stripRequest(response.request);
                    error.response = utils.stripResponse(response);
                    var parsedErrorResponse = response.parsedBody;
                    try {
                        if (parsedErrorResponse) {
                            var defaultResponseBodyMapper = defaultResponseSpec.bodyMapper;
                            if (defaultResponseBodyMapper && defaultResponseBodyMapper.serializedName === "CloudError") {
                                if (parsedErrorResponse.error) {
                                    parsedErrorResponse = parsedErrorResponse.error;
                                }
                                if (parsedErrorResponse.code) {
                                    error.code = parsedErrorResponse.code;
                                }
                                if (parsedErrorResponse.message) {
                                    error.message = parsedErrorResponse.message;
                                }
                            }
                            else {
                                var internalError = parsedErrorResponse;
                                if (parsedErrorResponse.error) {
                                    internalError = parsedErrorResponse.error;
                                }
                                error.code = internalError.code;
                                if (internalError.message) {
                                    error.message = internalError.message;
                                }
                            }
                            if (defaultResponseBodyMapper) {
                                var valueToDeserialize = parsedErrorResponse;
                                if (operationSpec.isXML && defaultResponseBodyMapper.type.name === MapperType.Sequence) {
                                    valueToDeserialize = typeof parsedErrorResponse === "object"
                                        ? parsedErrorResponse[defaultResponseBodyMapper.xmlElementName]
                                        : [];
                                }
                                error.body = operationSpec.serializer.deserialize(defaultResponseBodyMapper, valueToDeserialize, "error.body");
                            }
                        }
                    }
                    catch (defaultError) {
                        error.message = "Error \"" + defaultError.message + "\" occurred in deserializing the responseBody - \"" + response.bodyAsText + "\" for the default response.";
                    }
                    return Promise.reject(error);
                }
            }
            else {
            }
        }
        return Promise.resolve(response);
    };
    return SerializationPolicy;
}(BaseRequestPolicy));
export { SerializationPolicy };
function isStreamOperation(responseSpecs) {
    var result = false;
    for (var statusCode in responseSpecs) {
        var operationResponse = responseSpecs[statusCode];
        if (operationResponse.bodyMapper && operationResponse.bodyMapper.type.name === MapperType.Stream) {
            result = true;
            break;
        }
    }
    return result;
}
//# sourceMappingURL=serializationPolicy.js.map