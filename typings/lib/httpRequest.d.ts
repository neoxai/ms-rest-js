import { HttpHeaders, RawHttpHeaders } from "./httpHeaders";
import { HttpMethod } from "./httpMethod";
import { OperationSpec } from "./operationSpec";
import { BodyInit as NodeBodyInit } from "node-fetch";
/**
 * A value that can be used as an HTTP request body.
 * Allows any fetch request body type or a Node.js readable stream.
 */
export declare type HttpRequestBody = RequestInit["body"] | NodeBodyInit;
/**
 * The parameters that can be set to create a new HttpRequest.
 */
export interface HttpRequestParameters {
    /**
     * The HTTP method of the request.
     */
    method: HttpMethod | keyof typeof HttpMethod;
    /**
     * The URL that the request will be sent to.
     */
    url: string;
    /**
     * The HTTP headers to include in the request.
     */
    headers?: HttpHeaders | RawHttpHeaders;
    /**
     * The body that will be sent in the request.
     */
    body?: any;
    /**
     * The body of the request after it has been serialized.
     */
    serializedBody?: HttpRequestBody;
    /**
     * The specification that describes the operation that the request will perform.
     */
    operationSpec?: OperationSpec;
}
/**
 * An individual HTTP request that can be sent with a HttpClient.
 */
export declare class HttpRequest {
    /**
     * The HTTP method of this request.
     */
    method: HttpMethod | keyof typeof HttpMethod;
    /**
     * The URL that this request will be sent to.
     */
    url: string;
    /**
     * The HTTP headers that will be sent with this request.
     */
    readonly headers: HttpHeaders;
    /**
     * The body that will be sent with this request.
     * Can be either an object tree which will get stringified or a raw type such as a string, Blob, or NodeJS.ReadableStream.
     */
    body?: any;
    /**
     * The specification that describes the operation that this request will perform.
     */
    readonly operationSpec?: OperationSpec;
    /**
     * The body of this HttpRequest after it has been serialized.
     */
    serializedBody?: HttpRequestBody;
    /**
     * Create a new HTTP request using the provided properties.
     * @param args The arguments that will be used to create the HTTP request.
     */
    constructor(args: HttpRequestParameters);
    /**
     * Update this HttpRequest from the provided form data.
     */
    updateFromFormData(formData: any): void;
    /**
     * Create a deep clone/copy of this HttpRequest.
     */
    clone(): HttpRequest;
}
