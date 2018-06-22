/// <reference types="node" />
import { HttpRequest } from "./httpRequest";
import { HttpHeaders } from "./httpHeaders";
/**
 * A HTTP response that is received from a server after a HttpRequest has been sent.
 */
export interface HttpResponse {
    /**
     * The request that was the cause of this HttpResponse.
     */
    request: HttpRequest;
    /**
     * The status code number of this response.
     */
    statusCode: number;
    /**
     * The HTTP headers of this response.
     */
    headers: HttpHeaders;
    /**
     * Get the body of this HttpResponse as a string.
     */
    textBody(): Promise<string | undefined>;
    /**
     * Get the body of this HttpResponse after it has been deserialized.
     */
    deserializedBody(): Promise<any | undefined>;
    /**
     * Get the body of this HttpResponse as a Blob.
     * Only available in browser.
     */
    blobBody(): Promise<Blob>;
    /**
     * Get the body of this HttpResponse as a readable stream.
     * Always null when using the fetch polyfill.
     */
    readableStreamBody: ReadableStream | NodeJS.ReadableStream | null;
}
