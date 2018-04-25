// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { OperationSpec, RequestOptionsBase } from "./msRest";

/**
 * The arguments that are passed to an Operation.
 */
export interface OperationArguments {
  [argumentName: string]: any;
}

/**
 * An operation that has been invoked by a consumer of a generated library.
 */
export interface Operation {
  /**
   * The specification for this Operation.
   */
  spec: OperationSpec;

  /**
   * The required arguments that are passed to this Operation.
   */
  requiredArguments?: OperationArguments;

  /**
   * Optional arguments that can be provided to an operation.
   */
  optionalArguments?: RequestOptionsBase;
}
