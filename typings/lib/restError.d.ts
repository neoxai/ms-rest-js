import { HttpRequest, HttpResponse } from "./msRest";
export interface RestErrorProperties {
    code?: string;
    statusCode?: number;
    request?: HttpRequest;
    response?: HttpResponse;
    body?: any;
}
export declare class RestError extends Error implements RestErrorProperties {
    readonly code?: string;
    readonly statusCode?: number;
    readonly request?: HttpRequest;
    readonly response?: HttpResponse;
    readonly body?: any;
    constructor(message: string, properties?: RestErrorProperties);
}
