"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a ByteArray.
 */
var byteArraySpec = {
    specType: "ByteArray",
    serialize: function (propertyPath, value, options) {
        var result;
        var anyValue = value;
        if (!value || !anyValue.constructor || typeof anyValue.constructor.isBuffer !== "function" || !anyValue.constructor.isBuffer(value)) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "a Buffer");
            result = anyValue;
        }
        else {
            result = value.toString("base64");
        }
        return result;
    },
    deserialize: function (propertyPath, value, options) {
        var result;
        if (typeof value !== "string") {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a string");
            result = value;
        }
        else {
            result = Buffer.from(value, "base64");
        }
        return result;
    }
};
exports.default = byteArraySpec;
//# sourceMappingURL=byteArraySpec.js.map