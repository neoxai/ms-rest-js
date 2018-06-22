import { HttpClient } from "./httpClient";
import { HttpRequest } from "./httpRequest";
import { HttpResponse } from "./httpResponse";
export declare type FetchMethod = (url: string, options: RequestInit) => Promise<Response>;
/**
 * A HttpClient implementation that uses fetch to send HTTP requests.
 */
export declare class FetchHttpClient implements HttpClient {
    private readonly fetch;
    /**
     * Creates a FetchHttpClient, optionally overriding the default fetch implementation.
     * @param fetch the fetch implementation to use
     */
    constructor(fetch?: FetchMethod);
    send(request: HttpRequest): Promise<HttpResponse>;
}
