"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Base64Url encoded ByteArray.
 */
var base64UrlSpec = {
    specType: "Base64Url",
    serialize: function (propertyPath, value, options) {
        var result;
        var anyValue = value;
        if (!anyValue || !anyValue.constructor || typeof anyValue.constructor.isBuffer !== "function" || !anyValue.constructor.isBuffer(value)) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "a Buffer");
            result = anyValue;
        }
        else {
            var base64String = value.toString("base64");
            var trimmedResultLength = base64String.length;
            while ((trimmedResultLength - 1) >= 0 && base64String[trimmedResultLength - 1] === "=") {
                --trimmedResultLength;
            }
            result = base64String.substr(0, trimmedResultLength).replace(/\+/g, "-").replace(/\//g, "_");
        }
        return result;
    },
    deserialize: function (propertyPath, value, options) {
        var result;
        if (!value || typeof value !== "string") {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a string");
            result = value;
        }
        else {
            // Base64Url to Base64.
            value = value.replace(/\-/g, "+").replace(/\_/g, "/");
            // Base64 to Buffer.
            result = Buffer.from(value, "base64");
        }
        return result;
    }
};
exports.default = base64UrlSpec;
//# sourceMappingURL=base64UrlSpec.js.map