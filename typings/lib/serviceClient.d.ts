import { DefaultHttpPipelineOptions, HttpPipeline } from "./httpPipeline";
import { HttpRequest } from "./httpRequest";
import { HttpResponse } from "./httpResponse";
import { WebResource } from "./msRest";
/**
 * Options that can be used to configure a ServiceClient.
 */
export interface ServiceClientOptions {
    /**
     * The HttpPipeline that this ServiceClient will use, or the options that will be used to create
     * the default HttpPipeline.
     */
    httpPipeline?: HttpPipeline | DefaultHttpPipelineOptions;
}
/**
 * An abstract type that encapsulates a HttpPipeline for derived ServiceClient types.
 */
export declare abstract class ServiceClient {
    private readonly _httpPipeline;
    /**
     * The ServiceClient constructor
     * @param httpPipeline
     */
    constructor(options?: ServiceClientOptions);
    pipeline(request: WebResource): Promise<HttpResponse>;
    /**
     * Send the provided HttpRequest through this ServiceClient's HTTP pipeline.
     * @param request The HttpRequest to send through this ServiceClient's HTTP pipeline.
     */
    sendRequest(request: HttpRequest): Promise<HttpResponse>;
}
