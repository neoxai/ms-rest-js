"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Dictionary of values.
 */
function dictionarySpec(valueSpec) {
    return {
        specType: "Dictionary",
        valueSpec: valueSpec,
        serialize: function (propertyPath, value, options) {
            var result;
            if (typeof value !== "object" || Array.isArray(value)) {
                serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "an object");
                result = value;
            }
            else {
                var valueTypeSpec = serializationOptions_1.resolveTypeSpec(options, propertyPath, valueSpec);
                result = {};
                for (var key in value) {
                    result[key] = valueTypeSpec.serialize(propertyPath.concat([key]), value[key], options);
                }
            }
            return result;
        },
        deserialize: function (propertyPath, value, options) {
            var result;
            if (typeof value !== "object" || Array.isArray(value)) {
                serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "an object");
                result = value;
            }
            else {
                var valueTypeSpec = serializationOptions_1.resolveTypeSpec(options, propertyPath, valueSpec);
                result = {};
                for (var key in value) {
                    result[key] = valueTypeSpec.deserialize(propertyPath.concat([key]), value[key], options);
                }
            }
            return result;
        }
    };
}
exports.dictionarySpec = dictionarySpec;
//# sourceMappingURL=dictionarySpec.js.map