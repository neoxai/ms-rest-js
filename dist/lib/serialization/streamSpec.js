"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var isStream = require("is-stream");
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Stream.
 */
var streamSpec = {
    specType: "Stream",
    serialize: function (propertyPath, value, options) {
        if (!isStream(value)) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "a Stream");
        }
        return value;
    },
    deserialize: function (propertyPath, value, options) {
        if (!isStream(value)) {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a Stream");
        }
        return value;
    },
};
exports.default = streamSpec;
//# sourceMappingURL=streamSpec.js.map