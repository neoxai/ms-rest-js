"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a number.
 */
var numberSpec = {
    specType: "number",
    serialize: function (propertyPath, value, options) {
        if (typeof value !== "number") {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "a number");
        }
        return value;
    },
    deserialize: function (propertyPath, value, options) {
        if (typeof value === "string" && options.outputType === serializationOptions_1.SerializationOutputType.XML) {
            var parsedValue = parseFloat(value);
            if (!isNaN(parsedValue)) {
                value = parsedValue;
            }
        }
        if (typeof value !== "number") {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a number");
        }
        return value;
    }
};
exports.default = numberSpec;
//# sourceMappingURL=numberSpec.js.map