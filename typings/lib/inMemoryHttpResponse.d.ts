/// <reference types="node" />
import { HttpHeaders, RawHttpHeaders } from "../lib/httpHeaders";
import { HttpRequest } from "../lib/httpRequest";
import { HttpResponse } from "../lib/httpResponse";
export declare class InMemoryHttpResponse implements HttpResponse {
    private _request;
    private _statusCode;
    private _bodyText;
    private readonly _deserializedBody;
    private readonly _headers;
    constructor(_request: HttpRequest, _statusCode: number, headers: HttpHeaders | RawHttpHeaders, _bodyText?: string | undefined, _deserializedBody?: any);
    readonly request: HttpRequest;
    readonly statusCode: number;
    readonly headers: HttpHeaders;
    textBody(): Promise<string | undefined>;
    parsedBody(): Promise<any | undefined>;
    deserializedBody(): Promise<any | undefined>;
    readonly readableStreamBody: ReadableStream | NodeJS.ReadableStream | null;
    blobBody(): Promise<Blob>;
}
