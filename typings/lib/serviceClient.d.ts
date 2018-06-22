import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { HttpPipelineLogger } from "./httpPipelineLogger";
import { OperationArguments } from "./operationArguments";
import { OperationSpec } from "./operationSpec";
import { RequestPolicyCreator } from "./policies/requestPolicy";
import { RequestPrepareOptions, WebResource } from "./webResource";
/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions {
    /**
     * @property {RequestInit} [requestOptions] The request options. Detailed info can be found
     * here https://github.github.io/fetch/#Request
     */
    requestOptions?: RequestInit;
    /**
     * @property {Array<RequestPolicyCreator>} [requestPolicyCreators] An array of functions that will be
     * invoked to create the RequestPolicy pipeline that will be used to send a HTTP request on the
     * wire.
     */
    requestPolicyCreators?: RequestPolicyCreator[];
    /**
     * @property {HttpClient} [httpClient] - The HttpClient that will be used to send HTTP requests.
     */
    httpClient?: HttpClient;
    /**
     * @property {HttpPipelineLogger} [httpPipelineLogger] - The HttpPipelineLogger that can be used
     * to debug RequestPolicies within the HTTP pipeline.
     */
    httpPipelineLogger?: HttpPipelineLogger;
    /**
     * @property {bool} [noRetryPolicy] - If set to true, turn off the default retry policy.
     */
    noRetryPolicy?: boolean;
    /**
     * @property {number} [rpRegistrationRetryTimeout] - Gets or sets the retry timeout
     * in seconds for AutomaticRPRegistration. Default value is 30.
     */
    rpRegistrationRetryTimeout?: number;
    /**
     * Whether or not to generate a client request ID header for each HTTP request.
     */
    generateClientRequestIdHeader?: boolean;
    /**
     * If specified, a GenerateRequestIdPolicy will be added to the HTTP pipeline that will add a
     * header to all outgoing requests with this header name and a random UUID as the request ID.
     */
    clientRequestIdHeaderName?: string;
}
/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
export declare class ServiceClient {
    /**
     * The string to be appended to the User-Agent header while sending the request.
     * This will be applicable only for node.js environment as the fetch library in browser does not allow setting custom UA.
     * @property {Array<string>} value - An array of string that need to be appended to the User-Agent request header.
     */
    userAgentInfo: {
        value: Array<string>;
    };
    /**
     * The HTTP client that will be used to send requests.
     */
    private readonly _httpClient;
    private readonly _requestPolicyOptions;
    private readonly _requestPolicyCreators;
    /**
     * The ServiceClient constructor
     * @constructor
     * @param {ServiceClientCredentials }[credentials] - BasicAuthenticationCredentials or
     * TokenCredentials object used for authentication.
     * @param { ServiceClientOptions } [options] The service client options that govern the behavior of the client.
     */
    constructor(credentials?: ServiceClientCredentials, options?: ServiceClientOptions);
    /**
     * Adds custom information to user agent header
     * @param {any} additionalUserAgentInfo - information to be added to user agent header, as string.
     */
    addUserAgentInfo(additionalUserAgentInfo: string): void;
    /**
     * Send the provided httpRequest.
     */
    sendRequest(options: RequestPrepareOptions | WebResource): Promise<HttpOperationResponse>;
    /**
     * Send an HTTP request that is populated using the provided OperationSpec.
     * @param {WebResource} httpRequest - The HTTP request to populate and then to send.
     * @param {operationSpec} operationSpec - The OperationSpec to use to populate the httpRequest.
     */
    sendOperationRequest(httpRequest: WebResource, operationArguments: OperationArguments, operationSpec: OperationSpec): Promise<HttpOperationResponse>;
}
export declare type PropertyParent = {
    [propertyName: string]: any;
};
/**
 * Get the property parent for the property at the provided path when starting with the provided
 * parent object.
 */
export declare function getPropertyParent(parent: PropertyParent, propertyPath: string[]): PropertyParent;
