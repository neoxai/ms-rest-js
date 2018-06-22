"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Date.
 */
var dateTimeSpec = {
    specType: "DateTime",
    serialize: function (propertyPath, value, options) {
        var result;
        if (!value || (!(value instanceof Date) && (typeof value !== "string" || isNaN(Date.parse(value))))) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "an instanceof Date or a string in ISO8601 DateTime format");
            result = value;
        }
        else {
            result = (value instanceof Date ? value : new Date(value)).toISOString();
        }
        return result;
    },
    deserialize: function (propertyPath, value, options) {
        var result;
        if (!value || typeof value !== "string" || isNaN(Date.parse(value))) {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a string in ISO8601 DateTime format");
            result = value;
        }
        else {
            result = new Date(value);
        }
        return result;
    }
};
exports.default = dateTimeSpec;
//# sourceMappingURL=dateTimeSpec.js.map