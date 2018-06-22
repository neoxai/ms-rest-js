"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Sequence of elements.
 */
function sequenceSpec(elementSpec, options) {
    return __assign({ specType: "Sequence", elementSpec: elementSpec }, options, { serialize: function (propertyPath, value, options) {
            var result;
            if (!Array.isArray(value)) {
                serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "an Array");
                result = value;
            }
            else {
                var elementTypeSpec = serializationOptions_1.resolveTypeSpec(options, propertyPath, elementSpec);
                result = [];
                for (var i = 0; i < value.length; i++) {
                    result[i] = elementTypeSpec.serialize(propertyPath.concat([i.toString()]), value[i], options);
                }
            }
            return result;
        },
        deserialize: function (propertyPath, value, options) {
            var result;
            if (options.outputType === serializationOptions_1.SerializationOutputType.XML) {
                if (value == undefined) {
                    value = [];
                }
                else if (!Array.isArray(value)) {
                    value = [value];
                }
            }
            if (!Array.isArray(value)) {
                serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "an Array");
                result = value;
            }
            else {
                var elementTypeSpec = serializationOptions_1.resolveTypeSpec(options, propertyPath, elementSpec);
                result = [];
                for (var i = 0; i < value.length; i++) {
                    result[i] = elementTypeSpec.deserialize(propertyPath.concat([i.toString()]), value[i], options);
                }
            }
            return result;
        } });
}
exports.sequenceSpec = sequenceSpec;
//# sourceMappingURL=sequenceSpec.js.map