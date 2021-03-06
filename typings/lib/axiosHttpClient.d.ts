import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";
/**
 * A HttpClient implementation that uses axios to send HTTP requests.
 */
export declare class AxiosHttpClient implements HttpClient {
    private readonly cookieJar;
    sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse>;
}
