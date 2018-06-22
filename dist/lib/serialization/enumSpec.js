"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize an object.
 */
function enumSpec(enumName, allowedValues) {
    return {
        specType: "Enum",
        enumName: enumName,
        allowedValues: allowedValues,
        serialize: function (propertyPath, value, options) {
            var foundMatch = allowedValues.some(function (item) {
                return item === value || (typeof item === "string" && typeof value === "string" && item.toLowerCase() === value.toLowerCase());
            });
            if (!foundMatch) {
                serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "one of the enum allowed values: " + JSON.stringify(allowedValues));
            }
            return value;
        },
        deserialize: function (propertyPath, value, options) {
            var foundMatch = allowedValues.some(function (item) {
                return item === value || (typeof item === "string" && typeof value === "string" && item.toLowerCase() === value.toLowerCase());
            });
            if (!foundMatch) {
                serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "one of the enum allowed values: " + JSON.stringify(allowedValues));
            }
            return value;
        }
    };
}
exports.enumSpec = enumSpec;
//# sourceMappingURL=enumSpec.js.map