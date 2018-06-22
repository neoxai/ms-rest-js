"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// parseInt just gives NaN (falsy) for undefined/null
var port = parseInt(process.env.PORT) || 3001;
/**
 * Base URL for the ms-rest-js testserver.
 */
exports.baseURL = "http://localhost:" + port;
//# sourceMappingURL=testUtils.js.map