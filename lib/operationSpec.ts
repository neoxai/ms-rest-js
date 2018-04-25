// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { HttpMethod } from "./httpMethod";
import { TypeSpec } from "./serialization/typeSpec";

/**
 * A mapping from status code numeric strings to the expected TypeSpec. If a given status code is
 * valid but doesn't expect a response body, then the TypeSpec should be null.
 */
export interface ResponseBodySpecs {
  [statusCodeOption: string]: TypeSpec<any, any> | null | undefined;

  /**
   * The type spec that describes the response body if an unrecognized status code is received.
   */
  default?: TypeSpec<any, any> | null;
}

/**
 * A specification that describes the details of an Operation.
 */
export interface OperationSpec {
  /**
   * The HttpMethod that will be used for the outgoing request.
   */
  requestHttpMethod: HttpMethod;

  /**
   * The path of the URL for this specific operation.
   */
  requestUrlPath: string;

  /**
   * The specification that describes how to serialize the body of the outgoing request.
   */
  requestBodySpec?: TypeSpec<any, any>;

  /**
   * The specification that describes the body of the incoming responses based on the response's
   * status code..
   */
  responseBodySpecs?: ResponseBodySpecs;
}
