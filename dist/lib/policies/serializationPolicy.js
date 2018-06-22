"use strict";
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var requestPolicy_1 = require("../requestPolicy");
var propertyPath_1 = require("../serialization/propertyPath");
var serializationOptions_1 = require("../serialization/serializationOptions");
var inMemoryHttpResponse_1 = require("../inMemoryHttpResponse");
var utils_1 = require("../util/utils");
var defaultSerializationOptions = {
    outputType: serializationOptions_1.SerializationOutputType.JSON,
    serializationStrictTypeChecking: true,
    serializationStrictAllowedProperties: true,
    serializationStrictMissingProperties: true,
    deserializationStrictTypeChecking: false,
    deserializationStrictAllowedProperties: false,
    deserializationStrictMissingProperties: false
};
/**
 * Get a RequestPolicyFactory that will serialize HTTP request contents and deserialize HTTP
 * response contents using the OperationSpecs provided in the requests and responses.
 */
function serializationPolicy(serializationOptions) {
    return function (nextPolicy, options) {
        return new SerializationPolicy(__assign({}, defaultSerializationOptions, serializationOptions), nextPolicy, options);
    };
}
exports.serializationPolicy = serializationPolicy;
var SerializationPolicy = /** @class */ (function (_super) {
    __extends(SerializationPolicy, _super);
    function SerializationPolicy(_serializationOptions, nextPolicy, requestPolicyOptions) {
        var _this = _super.call(this, nextPolicy, requestPolicyOptions) || this;
        _this._serializationOptions = _serializationOptions;
        return _this;
    }
    SerializationPolicy.prototype.send = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBodySpec, serializedBody, sequenceSpec, response, responseBodySpec, responseTextBody, responseBody, responseContentType, sequenceSpec, responseDeserializedBody, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestBodySpec = request.operationSpec && request.operationSpec.requestBodySpec;
                        if (requestBodySpec) {
                            serializedBody = requestBodySpec.serialize(new propertyPath_1.PropertyPath([]), request.body, this._serializationOptions);
                            if (this._serializationOptions.outputType === serializationOptions_1.SerializationOutputType.XML) {
                                // Handle XML root list
                                if (requestBodySpec.specType === "Sequence") {
                                    sequenceSpec = requestBodySpec;
                                    if (!sequenceSpec.xmlElementName) {
                                        throw new Error("sequenceSpec must have xmlElementName when used as a root model spec:\n" + JSON.stringify(requestBodySpec, undefined, 2));
                                    }
                                    serializedBody = (_a = {}, _a[sequenceSpec.xmlElementName] = serializedBody, _a);
                                }
                                request.serializedBody = utils_1.stringifyXML(serializedBody, { rootName: requestBodySpec.xmlRootName });
                            }
                            else {
                                request.serializedBody = JSON.stringify(serializedBody);
                            }
                        }
                        return [4 /*yield*/, this._nextPolicy.send(request)];
                    case 1:
                        response = _b.sent();
                        responseBodySpec = request.operationSpec && request.operationSpec.responseBodySpec;
                        if (!responseBodySpec) return [3 /*break*/, 6];
                        return [4 /*yield*/, response.textBody()];
                    case 2:
                        responseTextBody = _b.sent();
                        if (!(responseTextBody != undefined)) return [3 /*break*/, 6];
                        responseBody = void 0;
                        responseContentType = response.headers.get("Content-Type");
                        if (!(responseContentType === "application/xml" || responseContentType === "text/xml")) return [3 /*break*/, 4];
                        return [4 /*yield*/, utils_1.parseXML(responseTextBody)];
                    case 3:
                        responseBody = _b.sent();
                        // Handle XML root list
                        if (responseBodySpec.specType === "Sequence") {
                            sequenceSpec = responseBodySpec;
                            if (!sequenceSpec.xmlElementName) {
                                throw new Error("sequenceSpec must have xmlElementName when used as a root model spec:\n" + JSON.stringify(responseBodySpec, undefined, 2));
                            }
                            responseBody = responseBody && responseBody[sequenceSpec.xmlElementName];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        responseBody = JSON.parse(responseTextBody);
                        _b.label = 5;
                    case 5:
                        responseDeserializedBody = responseBodySpec.deserialize(new propertyPath_1.PropertyPath([]), responseBody, this._serializationOptions);
                        response = new inMemoryHttpResponse_1.InMemoryHttpResponse(response.request, response.statusCode, response.headers, responseTextBody, responseDeserializedBody);
                        _b.label = 6;
                    case 6: return [2 /*return*/, response];
                }
            });
        });
    };
    return SerializationPolicy;
}(requestPolicy_1.BaseRequestPolicy));
//# sourceMappingURL=serializationPolicy.js.map