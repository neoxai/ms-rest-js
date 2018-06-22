import { OperationParameter, OperationQueryParameter, OperationURLParameter } from "./operationParameter";
import { Serializer } from "./serializer";
import { HttpMethods } from "./webResource";
import { OperationResponse } from "./operationResponse";
/**
 * A specification that defines an operation.
 */
export interface OperationSpec {
    /**
     * The serializer to use in this operation.
     */
    serializer: Serializer;
    /**
     * The HTTP method that should be used by requests for this operation.
     */
    httpMethod: HttpMethods;
    /**
     * The URL that was provided in the service's specification. This will still have all of the URL
     * template variables in it.
     */
    baseUrl: string;
    /**
     * The fixed path for this operation's URL. This will still have all of the URL template variables
     * in it.
     */
    path?: string;
    /**
     * The content type of the request body. This value will be used as the "Content-Type" header if
     * it is provided.
     */
    contentType?: string;
    /**
     * The parameter that will be used to construct the HTTP request's body.
     */
    requestBody?: OperationParameter;
    /**
     * Whether or not this operation uses XML request and response bodies.
     */
    isXML?: boolean;
    /**
     * The parameters to the operation method that will be substituted into the constructed URL.
     */
    urlParameters?: OperationURLParameter[];
    /**
     * The parameters to the operation method that will be added to the constructed URL's query.
     */
    queryParameters?: OperationQueryParameter[];
    /**
     * The parameters to the operation method that will be converted to headers on the operation's
     * HTTP request.
     */
    headerParameters?: OperationParameter[];
    /**
     * The parameters to the operation method that will be used to create a formdata body for the
     * operation's HTTP request.
     */
    formDataParameters?: OperationParameter[];
    /**
     * The different types of responses that this operation can return based on what status code is
     * returned.
     */
    responses: {
        [responseCode: string]: OperationResponse;
    };
}
