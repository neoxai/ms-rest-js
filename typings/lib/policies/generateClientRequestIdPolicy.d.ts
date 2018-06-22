import { RequestPolicyFactory } from "../requestPolicyFactory";
/**
 * Get a RequestPolicyFactory that creates GenerateClientRequestIdPolicies.
 * @param logFunction The function to use to log messages.
 */
export declare function generateClientRequestIdPolicy(): RequestPolicyFactory;
