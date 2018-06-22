import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyCreator, RequestPolicyOptions } from "./requestPolicy";
/**
 * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
 * pass through the HTTP pipeline.
 */
export declare function serializationPolicy(): RequestPolicyCreator;
/**
 * A RequestPolicy that will serialize HTTP request bodies as they pass through the HTTP pipeline.
 */
export declare class SerializationPolicy extends BaseRequestPolicy {
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
    /**
     * Serialize the provided HTTP request's body based on the requestBodyMapper assigned to the HTTP
     * request.
     * @param {WebResource} request - The HTTP request that will have its body serialized.
     */
    serializeRequestBody(request: WebResource): void;
    deserializeResponseBody(response: HttpOperationResponse): Promise<HttpOperationResponse>;
}
