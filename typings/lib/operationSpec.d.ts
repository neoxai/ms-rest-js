import { TypeSpec } from "./serialization/typeSpec";
import { HttpMethod } from "./httpMethod";
/**
 * A specification that describes the details of an Operation.
 */
export interface OperationSpec {
    /**
     * The HttpMethod that will be used for the outgoing request.
     */
    requestHttpMethod: HttpMethod;
    /**
     * The specification that describes how to serialize the body of the outgoing request.
     */
    requestBodySpec?: TypeSpec<any, any>;
    /**
     * The specification that describes the body of the incoming response.
     */
    responseBodySpec?: TypeSpec<any, any>;
}
