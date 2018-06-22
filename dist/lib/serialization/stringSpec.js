"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a string.
 */
var stringSpec = {
    specType: "string",
    serialize: function (propertyPath, value, options) {
        if (typeof value !== "string") {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "a string");
        }
        return value;
    },
    deserialize: function (propertyPath, value, options) {
        if (typeof value !== "string") {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a string");
        }
        return value;
    }
};
exports.default = stringSpec;
//# sourceMappingURL=stringSpec.js.map