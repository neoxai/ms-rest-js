"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Date.
 */
var dateSpec = {
    specType: "Date",
    serialize: function (propertyPath, value, options) {
        var result;
        if (value == undefined || (!(value instanceof Date) && (typeof value !== "string" || isNaN(Date.parse(value))))) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "an instanceof Date or a string in ISO8601 Date format");
            result = value;
        }
        else {
            result = (value instanceof Date ? value : new Date(value)).toISOString().substring(0, 10);
        }
        return result;
    },
    deserialize: function (propertyPath, value, options) {
        var result;
        if (value == undefined || typeof value !== "string" || isNaN(Date.parse(value))) {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "a string in ISO8601 Date format");
            result = value;
        }
        else {
            result = new Date(value);
        }
        return result;
    }
};
exports.default = dateSpec;
//# sourceMappingURL=dateSpec.js.map