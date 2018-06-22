"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize an object.
 */
var objectSpec = {
    specType: "object",
    serialize: function (propertyPath, value, options) {
        if (typeof value !== "object" || Array.isArray(value)) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "an object");
        }
        return value;
    },
    deserialize: function (propertyPath, value, options) {
        if (typeof value !== "object" || Array.isArray(value)) {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "an object");
        }
        return value;
    }
};
exports.default = objectSpec;
//# sourceMappingURL=objectSpec.js.map