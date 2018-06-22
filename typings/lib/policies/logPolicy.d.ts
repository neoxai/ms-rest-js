import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicyCreator, RequestPolicy, RequestPolicyOptions } from "./requestPolicy";
export declare function logPolicy(logger?: any): RequestPolicyCreator;
export declare class LogPolicy extends BaseRequestPolicy {
    logger?: any;
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, logger?: any);
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
    logResponse(response: HttpOperationResponse): Promise<HttpOperationResponse>;
}
