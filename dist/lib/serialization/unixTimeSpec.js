"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Date.
 */
var unixTimeSpec = {
    specType: "UnixTime",
    serialize: function (propertyPath, value, options) {
        var result;
        if (!value || (!(value instanceof Date) && (typeof value !== "string" || isNaN(Date.parse(value))))) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "an instanceof Date or a string in ISO8601 DateTime format");
            result = value;
        }
        else {
            var valueDate = (value instanceof Date ? value : new Date(value));
            result = Math.floor(valueDate.getTime() / 1000);
        }
        return result;
    },
    deserialize: function (propertyPath, value, options) {
        if (typeof value === "string" && options.outputType === serializationOptions_1.SerializationOutputType.XML) {
            var parsedValue = parseFloat(value);
            if (!isNaN(parsedValue)) {
                value = parsedValue;
            }
        }
        var result;
        if (typeof value !== "number") {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a unix time number");
            result = value;
        }
        else {
            result = new Date(value * 1000);
        }
        return result;
    }
};
exports.default = unixTimeSpec;
//# sourceMappingURL=unixTimeSpec.js.map