// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
/**
 * Assigns the properties of a RequestOptions object to an OperationArguments object.
 * @param args the arguments object to use in the OperatonArguments
 * @param options the RequestOptions to apply
 * @return an OperationArguments object
 */
export function createOperationArguments(args, options) {
    return {
        arguments: args,
        customHeaders: options && options.customHeaders,
        abortSignal: options && options.abortSignal,
        onUploadProgress: options && options.onUploadProgress,
        onDownloadProgress: options && options.onDownloadProgress,
    };
}
//# sourceMappingURL=operationArguments.js.map