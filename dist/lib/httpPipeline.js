"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetchHttpClient_1 = require("./fetchHttpClient");
var httpRequest_1 = require("./httpRequest");
var exponentialRetryPolicy_1 = require("./policies/exponentialRetryPolicy");
var msRestNodeJsUserAgentPolicy_1 = require("./policies/msRestNodeJsUserAgentPolicy");
var redirectPolicy_1 = require("./policies/redirectPolicy");
var rpRegistrationPolicy_1 = require("./policies/rpRegistrationPolicy");
var serializationPolicy_1 = require("./policies/serializationPolicy");
var signingPolicy_1 = require("./policies/signingPolicy");
var systemErrorRetryPolicy_1 = require("./policies/systemErrorRetryPolicy");
var requestPolicyOptions_1 = require("./requestPolicyOptions");
var constants_1 = require("./util/constants");
var utils_1 = require("./util/utils");
var generateClientRequestIdPolicy_1 = require("./policies/generateClientRequestIdPolicy");
var defaultHttpClient;
function getDefaultHttpClient() {
    if (!defaultHttpClient) {
        defaultHttpClient = new fetchHttpClient_1.FetchHttpClient();
    }
    return defaultHttpClient;
}
exports.getDefaultHttpClient = getDefaultHttpClient;
/**
 * Get the default HttpPipeline.
 */
function createDefaultHttpPipeline(options) {
    if (!options) {
        options = {};
    }
    var requestPolicyFactories = [];
    if (options.credentials) {
        requestPolicyFactories.push(signingPolicy_1.signingPolicy(options.credentials));
    }
    if (options.generateClientRequestId) {
        requestPolicyFactories.push(generateClientRequestIdPolicy_1.generateClientRequestIdPolicy());
    }
    if (utils_1.isNode) {
        if (!options.nodeJsUserAgentPackage) {
            options.nodeJsUserAgentPackage = "ms-rest-js/" + constants_1.Constants.msRestVersion;
        }
        requestPolicyFactories.push(msRestNodeJsUserAgentPolicy_1.msRestNodeJsUserAgentPolicy([options.nodeJsUserAgentPackage]));
    }
    if (options.addSerializationPolicy) {
        requestPolicyFactories.push(serializationPolicy_1.serializationPolicy(options.serializationOptions));
    }
    requestPolicyFactories.push(redirectPolicy_1.redirectPolicy());
    requestPolicyFactories.push(rpRegistrationPolicy_1.rpRegistrationPolicy(options.rpRegistrationRetryTimeout));
    if (options.addRetryPolicies) {
        requestPolicyFactories.push(exponentialRetryPolicy_1.exponentialRetryPolicy());
        requestPolicyFactories.push(systemErrorRetryPolicy_1.systemErrorRetryPolicy());
    }
    var httpPipelineOptions = {
        httpClient: options.httpClient || getDefaultHttpClient(),
        pipelineLogger: options.logger
    };
    return new HttpPipeline(requestPolicyFactories, httpPipelineOptions);
}
exports.createDefaultHttpPipeline = createDefaultHttpPipeline;
/**
 * A collection of RequestPolicies that will be applied to a HTTP request before it is sent and will
 * be applied to a HTTP response when it is received.
 */
var HttpPipeline = /** @class */ (function () {
    function HttpPipeline(_requestPolicyFactories, _httpPipelineOptions) {
        this._requestPolicyFactories = _requestPolicyFactories;
        this._httpPipelineOptions = _httpPipelineOptions;
        if (!this._httpPipelineOptions) {
            this._httpPipelineOptions = {};
        }
        if (!this._httpPipelineOptions.httpClient) {
            this._httpPipelineOptions.httpClient = getDefaultHttpClient();
        }
        this._httpClient = this._httpPipelineOptions.httpClient;
        this._requestPolicyOptions = new requestPolicyOptions_1.RequestPolicyOptions(this._httpPipelineOptions.pipelineLogger);
    }
    /**
     * Send the provided HttpRequest request.
     * @param request The HTTP request to send.
     * @return A Promise that resolves to the HttpResponse from the targeted server.
     */
    HttpPipeline.prototype.send = function (request) {
        if (!(request instanceof httpRequest_1.HttpRequest)) {
            throw new Error("request must be defined and an instanceof HttpRequest.");
        }
        var requestPolicyChainHead = this._httpClient;
        if (this._requestPolicyFactories) {
            var requestPolicyFactoriesLength = this._requestPolicyFactories.length;
            for (var i = requestPolicyFactoriesLength - 1; i >= 0; --i) {
                var requestPolicyFactory = this._requestPolicyFactories[i];
                requestPolicyChainHead = requestPolicyFactory(requestPolicyChainHead, this._requestPolicyOptions);
            }
        }
        return requestPolicyChainHead.send(request);
    };
    return HttpPipeline;
}());
exports.HttpPipeline = HttpPipeline;
//# sourceMappingURL=httpPipeline.js.map