import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { HttpClient } from "./httpClient";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { HttpPipelineOptions } from "./httpPipelineOptions";
import { HttpRequest } from "./httpRequest";
import { HttpResponse } from "./httpResponse";
import { RequestPolicyFactory } from "./requestPolicyFactory";
import { SerializationOptions } from "./serialization/serializationOptions";
export declare function getDefaultHttpClient(): HttpClient;
/**
 * Options that can be used to configure the default HttpPipeline configuration.
 */
export interface DefaultHttpPipelineOptions {
    /**
     * Credentials that will be used to authenticate with the target endpoint.
     */
    credentials?: ServiceClientCredentials;
    /**
     * The number of seconds to wait on a resource provider registration request before timing out.
     */
    rpRegistrationRetryTimeout?: number;
    /**
     * The package information that will be added as the User-Agent header when running under Node.js.
     */
    nodeJsUserAgentPackage?: string;
    /**
     * When set to true a unique x-ms-client-request-id value is generated and included in each
     * request.
     */
    generateClientRequestId?: boolean;
    /**
     * Whether or not to add the retry policies to the HttpPipeline.
     */
    addRetryPolicies?: boolean;
    /**
     * Whether or not to add the serialization policy to the HttpPipeline.
     */
    addSerializationPolicy?: boolean;
    /**
     * Options to pass to the SerializationPolicy.
     */
    serializationOptions?: SerializationOptions;
    /**
     * The HttpClient to use. If no httpClient is specified, then the default HttpClient will be used.
     */
    httpClient?: HttpClient;
    /**
     * The logger to use when RequestPolicies need to log information.
     */
    logger?: HttpPipelineLogger;
}
/**
 * Get the default HttpPipeline.
 */
export declare function createDefaultHttpPipeline(options?: DefaultHttpPipelineOptions): HttpPipeline;
/**
 * A collection of RequestPolicies that will be applied to a HTTP request before it is sent and will
 * be applied to a HTTP response when it is received.
 */
export declare class HttpPipeline {
    private readonly _requestPolicyFactories;
    private readonly _httpPipelineOptions;
    private readonly _httpClient;
    private readonly _requestPolicyOptions;
    constructor(_requestPolicyFactories: RequestPolicyFactory[], _httpPipelineOptions: HttpPipelineOptions);
    /**
     * Send the provided HttpRequest request.
     * @param request The HTTP request to send.
     * @return A Promise that resolves to the HttpResponse from the targeted server.
     */
    send(request: HttpRequest): Promise<HttpResponse>;
}
