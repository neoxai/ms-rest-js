import { WebResource } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
export declare class RestError extends Error {
    code?: string;
    statusCode?: number;
    request?: WebResource;
    response?: HttpOperationResponse;
    body?: any;
    constructor(message: string, code?: string, statusCode?: number, request?: WebResource, response?: HttpOperationResponse, body?: any);
}
