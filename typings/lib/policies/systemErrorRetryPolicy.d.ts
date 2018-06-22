import { HttpResponse } from "../httpResponse";
import { RequestPolicy } from "../requestPolicy";
import { RequestPolicyFactory } from "../requestPolicyFactory";
import { RequestPolicyOptions } from "../requestPolicyOptions";
import { RetryOptions, ExponentialRetryPolicy, RetryError } from "./exponentialRetryPolicy";
/**
 * Get a RequestPolicyFactory that creates SystemErrorRetryPolicies.
 * @param authenticationProvider The provider to use to sign requests.
 */
export declare function systemErrorRetryPolicy(retryOptions?: RetryOptions): RequestPolicyFactory;
export declare class SystemErrorRetryPolicy extends ExponentialRetryPolicy {
    constructor(retryOptions: RetryOptions, nextPolicy: RequestPolicy, options: RequestPolicyOptions);
    /**
     * Get whether or not we should retry the request based on the provided response.
     * @param response The response to read to determine whether or not we should retry.
     */
    shouldRetry(details: {
        response?: HttpResponse;
        responseError?: RetryError;
    }): boolean;
}
