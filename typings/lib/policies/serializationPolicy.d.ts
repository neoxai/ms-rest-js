import { RequestPolicyFactory } from "../requestPolicyFactory";
import { SerializationOptions } from "../serialization/serializationOptions";
/**
 * Get a RequestPolicyFactory that will serialize HTTP request contents and deserialize HTTP
 * response contents using the OperationSpecs provided in the requests and responses.
 */
export declare function serializationPolicy(serializationOptions?: SerializationOptions): RequestPolicyFactory;
