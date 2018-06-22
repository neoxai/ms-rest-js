import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyCreator, RequestPolicyOptions } from "./requestPolicy";
export declare function redirectPolicy(maximumRetries?: number): RequestPolicyCreator;
export declare class RedirectPolicy extends BaseRequestPolicy {
    maximumRetries?: number;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, maximumRetries?: number);
    handleRedirect(response: HttpOperationResponse, currentRetries: number): Promise<HttpOperationResponse>;
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
