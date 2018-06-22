"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var utils_1 = require("../util/utils");
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a UUID.
 */
var uuidSpec = {
    specType: "UUID",
    serialize: function (propertyPath, value, options) {
        if (typeof value !== "string" || !utils_1.isValidUuid(value)) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "a UUID string");
        }
        return value;
    },
    deserialize: function (propertyPath, value, options) {
        if (typeof value !== "string" || !utils_1.isValidUuid(value)) {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a UUID string");
        }
        return value;
    }
};
exports.default = uuidSpec;
//# sourceMappingURL=uuidSpec.js.map