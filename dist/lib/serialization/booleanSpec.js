"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a boolean.
 */
var booleanSpec = {
    specType: "boolean",
    serialize: function (propertyPath, value, options) {
        if (typeof value !== "boolean") {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "a boolean");
        }
        return value;
    },
    deserialize: function (propertyPath, value, options) {
        if (typeof value === "string" && options.outputType === serializationOptions_1.SerializationOutputType.XML) {
            if (value === "true") {
                value = true;
            }
            else if (value === "false") {
                value = false;
            }
        }
        if (typeof value !== "boolean") {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a boolean");
        }
        return value;
    }
};
exports.default = booleanSpec;
//# sourceMappingURL=booleanSpec.js.map