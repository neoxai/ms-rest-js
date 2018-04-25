
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * Describes the base structure of the options object that will be used in every operation.
 */
export interface RequestOptionsBase {
  /**
   * @property {object} [customHeaders] - User defined custom request headers that
   * will be applied before the request is sent.
   */
  customHeaders?: { [key: string]: string };
  [key: string]: any;
}
