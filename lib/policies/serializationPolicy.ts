// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { HttpRequest } from "../httpRequest";
import { HttpResponse } from "../httpResponse";
import { BaseRequestPolicy, RequestPolicy } from "../requestPolicy";
import { RequestPolicyFactory } from "../requestPolicyFactory";
import { RequestPolicyOptions } from "../requestPolicyOptions";
import { PropertyPath } from "../serialization/propertyPath";
import { SerializationOptions } from "../serialization/serializationOptions";
import { TypeSpec } from "../serialization/typeSpec";
import { InMemoryHttpResponse } from "../inMemoryHttpResponse";
import { ResponseBodySpecs } from "../msRest";

const defaultSerializationOptions: SerializationOptions = {
  serializationStrictTypeChecking: true,
  serializationStrictAllowedProperties: true,
  serializationStrictMissingProperties: true,

  deserializationStrictTypeChecking: false,
  deserializationStrictAllowedProperties: false,
  deserializationStrictMissingProperties: false
};

/**
 * Get a RequestPolicyFactory that will serialize HTTP request contents and deserialize HTTP
 * response contents using the OperationSpecs provided in the requests and responses.
 */
export function serializationPolicy(serializationOptions?: SerializationOptions): RequestPolicyFactory {
  return (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
    return new SerializationPolicy(serializationOptions || defaultSerializationOptions, nextPolicy, options);
  };
}

class SerializationPolicy extends BaseRequestPolicy {
  constructor(private readonly _serializationOptions: SerializationOptions, nextPolicy: RequestPolicy, requestPolicyOptions: RequestPolicyOptions) {
    super(nextPolicy, requestPolicyOptions);
  }

  async send(request: HttpRequest): Promise<HttpResponse> {
    const requestBodySpec: TypeSpec<any, any> | undefined = request.operationSpec && request.operationSpec.requestBodySpec;
    if (requestBodySpec) {
      request.serializedBody = requestBodySpec.serialize(new PropertyPath([]), request.body, this._serializationOptions);
    }

    let response: HttpResponse = await this._nextPolicy.send(request);

    const responseBodySpecs: ResponseBodySpecs | undefined = request.operationSpec && request.operationSpec.responseBodySpecs;
    if (responseBodySpecs) {
      let responseBodySpec: TypeSpec<any, any> | null | undefined = responseBodySpecs[response.statusCode.toString()] || responseBodySpecs.default;
      // If there is no responseBodySpec for the response's status code (notice three equals signs
      // instead of just two), then use the default responseBodySpec.
      if (responseBodySpec === undefined) {
        responseBodySpec = responseBodySpecs.default;
      }

      if (responseBodySpec) {
        const responseTextBody: string | undefined = await response.textBody();
        const responseBody: any = responseTextBody == undefined ? undefined : JSON.parse(responseTextBody);
        const responseDeserializedBody: any = responseBodySpec.deserialize(new PropertyPath([]), responseBody, this._serializationOptions);

        response = new InMemoryHttpResponse(response.request, response.statusCode, response.headers, responseTextBody, responseDeserializedBody);
      }
    }

    return response;
  }
}
