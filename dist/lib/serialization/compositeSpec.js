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
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var httpPipelineLogLevel_1 = require("../httpPipelineLogLevel");
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Composite value.
 */
function compositeSpec(parameters) {
    return __assign({ specType: "Composite" }, parameters, { serialize: function (propertyPath, value, options) {
            var result;
            if (typeof value !== "object" || Array.isArray(value)) {
                serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "an object");
                result = value;
            }
            else {
                var xml = (options && options.outputType === serializationOptions_1.SerializationOutputType.XML);
                result = {};
                var allCompositeTypeSpecs = getAllPolymorphicCompositeTypeSpecs(value, propertyPath, this, options, true);
                for (var _i = 0, allCompositeTypeSpecs_1 = allCompositeTypeSpecs; _i < allCompositeTypeSpecs_1.length; _i++) {
                    var compositeTypeSpec = allCompositeTypeSpecs_1[_i];
                    if (compositeTypeSpec.propertySpecs) {
                        for (var childPropertyName in compositeTypeSpec.propertySpecs) {
                            var childPropertySpec = compositeTypeSpec.propertySpecs[childPropertyName];
                            var childPropertyValue = value[childPropertyName];
                            var childPropertyPath = propertyPath.pathStringConcat(childPropertyName);
                            // Get the child property's value spec.
                            var childPropertyValueSpec = serializationOptions_1.resolveTypeSpec(options, childPropertyPath, childPropertySpec.valueSpec);
                            if (childPropertyValue == undefined) {
                                if (childPropertySpec.required && !childPropertySpec.constant) {
                                    var childPropertyValueTypeName = childPropertyValueSpec ? childPropertyValueSpec.specType : "unknown";
                                    serializationOptions_1.failSerializeMissingRequiredPropertyCheck(options, childPropertyPath, childPropertyValueTypeName);
                                }
                            }
                            else if (!childPropertySpec.readonly) {
                                // This variable will point to the object that will contain the serialized property.
                                var serializedPropertyParent = result;
                                // The name of the serialized property.
                                var serializedChildPropertyName = void 0;
                                // Get the serializedChildPropertyName and the serializedPropertyParent.
                                if (xml) {
                                    // XML
                                    if (childPropertySpec.xmlIsWrapped) {
                                        if (!childPropertySpec.xmlName) {
                                            throw serializationOptions_1.logAndCreateError(options, "When the serialization output type is XML, property specification for " + propertyPath.pathStringConcat(childPropertyName) + " specified xmlIsWrapped but doesn't have an xmlName value.");
                                        }
                                        if (!childPropertySpec.xmlElementName) {
                                            throw serializationOptions_1.logAndCreateError(options, "When the serialization output type is XML, property specification for " + propertyPath.pathStringConcat(childPropertyName) + " specified xmlIsWrapped but doesn't have an xmlElementName value.");
                                        }
                                        serializedChildPropertyName = childPropertySpec.xmlName + "." + childPropertySpec.xmlElementName;
                                    }
                                    else {
                                        if (childPropertySpec.xmlElementName) {
                                            serializedChildPropertyName = childPropertySpec.xmlElementName;
                                        }
                                        else if (childPropertySpec.xmlName) {
                                            serializedChildPropertyName = childPropertySpec.xmlName;
                                        }
                                        else {
                                            serializedChildPropertyName = childPropertyName;
                                        }
                                        if (childPropertySpec.xmlIsAttribute) {
                                            if (!result.$) {
                                                result.$ = {};
                                            }
                                            serializedPropertyParent = result.$;
                                        }
                                    }
                                }
                                else {
                                    // JSON
                                    serializedChildPropertyName = childPropertySpec.serializedName || childPropertyName;
                                }
                                // This part is for handling property flattening. If the serialized name has dots in its
                                // name (a.b.c), then we handle those name parts (a, b, c) as individual levels in the
                                // serialized value.
                                var serializedChildPropertyNameParts = splitSerializeName(serializedChildPropertyName);
                                if (serializedChildPropertyNameParts.length > 1) {
                                    for (var i = 0; i < serializedChildPropertyNameParts.length - 1; ++i) {
                                        var namePart = serializedChildPropertyNameParts[i];
                                        if (!serializedPropertyParent[namePart]) {
                                            serializedPropertyParent[namePart] = {};
                                        }
                                        serializedPropertyParent = serializedPropertyParent[namePart];
                                    }
                                    serializedChildPropertyName = serializedChildPropertyNameParts[serializedChildPropertyNameParts.length - 1];
                                }
                                var serializedChildPropertyPath = propertyPath.concat([childPropertyName], serializedChildPropertyNameParts);
                                // Write the serialized property value to its parent property container.
                                if (!childPropertyValueSpec) {
                                    serializedPropertyParent[serializedChildPropertyName] = childPropertyValue;
                                }
                                else {
                                    serializedPropertyParent[serializedChildPropertyName] = childPropertyValueSpec.serialize(serializedChildPropertyPath, childPropertyValue, options);
                                }
                            }
                        }
                    }
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
                var xml = (options && options.outputType === serializationOptions_1.SerializationOutputType.XML);
                result = {};
                var allCompositeTypeSpecs = getAllPolymorphicCompositeTypeSpecs(value, propertyPath, this, options, false);
                for (var _i = 0, allCompositeTypeSpecs_2 = allCompositeTypeSpecs; _i < allCompositeTypeSpecs_2.length; _i++) {
                    var compositeTypeSpec = allCompositeTypeSpecs_2[_i];
                    if (compositeTypeSpec.propertySpecs) {
                        for (var childPropertyName in compositeTypeSpec.propertySpecs) {
                            var childPropertySpec = compositeTypeSpec.propertySpecs[childPropertyName];
                            // Get the serializedChildPropertyName and the serializedPropertyParent.
                            var serializedChildPropertyName = void 0;
                            var serializedPropertyParent = value;
                            if (xml) {
                                // XML
                                if (childPropertySpec.xmlIsWrapped) {
                                    if (!childPropertySpec.xmlName) {
                                        throw serializationOptions_1.logAndCreateError(options, "When the serialization output type is XML, property specification for " + propertyPath.pathStringConcat(childPropertyName) + " specified xmlIsWrapped but doesn't have an xmlName value.");
                                    }
                                    if (!childPropertySpec.xmlElementName) {
                                        throw serializationOptions_1.logAndCreateError(options, "When the serialization output type is XML, property specification for " + propertyPath.pathStringConcat(childPropertyName) + " specified xmlIsWrapped but doesn't have an xmlElementName value.");
                                    }
                                    serializedChildPropertyName = childPropertySpec.xmlName + "." + childPropertySpec.xmlElementName;
                                }
                                else {
                                    if (childPropertySpec.xmlElementName) {
                                        serializedChildPropertyName = childPropertySpec.xmlElementName;
                                    }
                                    else if (childPropertySpec.xmlName) {
                                        serializedChildPropertyName = childPropertySpec.xmlName;
                                    }
                                    else {
                                        serializedChildPropertyName = childPropertyName;
                                    }
                                    if (childPropertySpec.xmlIsAttribute) {
                                        serializedPropertyParent = serializedPropertyParent.$;
                                    }
                                }
                            }
                            else {
                                // JSON
                                serializedChildPropertyName = childPropertySpec.serializedName || childPropertyName;
                            }
                            // This part is for handling property flattening. If the serialized name has dots in its
                            // name (a.b.c), then we handle those name parts (a, b, c) as individual levels in the
                            // serialized value.
                            var serializedChildPropertyNameParts = splitSerializeName(serializedChildPropertyName);
                            if (serializedChildPropertyNameParts.length > 1) {
                                for (var i = 0; i < serializedChildPropertyNameParts.length - 1; ++i) {
                                    var namePart = serializedChildPropertyNameParts[i];
                                    if (!serializedPropertyParent[namePart]) {
                                        break;
                                    }
                                    else {
                                        serializedPropertyParent = serializedPropertyParent[namePart];
                                    }
                                }
                                if (serializedPropertyParent) {
                                    serializedChildPropertyName = serializedChildPropertyNameParts[serializedChildPropertyNameParts.length - 1];
                                }
                            }
                            var childPropertyPath = propertyPath.concat([childPropertyName], serializedChildPropertyNameParts);
                            // Get the child property's value spec.
                            var childPropertyValueSpec = serializationOptions_1.resolveTypeSpec(options, childPropertyPath, childPropertySpec.valueSpec);
                            var serializedChildPropertyValue = (!serializedPropertyParent ? undefined : serializedPropertyParent[serializedChildPropertyName]);
                            if (serializedChildPropertyValue != undefined) {
                                result[childPropertyName] = childPropertyValueSpec.deserialize(childPropertyPath, serializedChildPropertyValue, options);
                            }
                            else if (childPropertySpec.required && !childPropertySpec.constant) {
                                serializationOptions_1.failDeserializeMissingRequiredPropertyCheck(options, childPropertyPath, childPropertyValueSpec.specType);
                            }
                        }
                    }
                }
            }
            return result;
        } });
}
exports.compositeSpec = compositeSpec;
function getDiscriminatorPropertyName(compositeSpecPolymorphism, compositeSpecName, options, isSerialization) {
    var currentPolymorphism = compositeSpecPolymorphism;
    var result = undefined;
    while (!result) {
        if (isSerialization) {
            result = currentPolymorphism.discriminatorPropertyName;
        }
        else {
            result = currentPolymorphism.discriminatorPropertySerializedName || currentPolymorphism.discriminatorPropertyName;
        }
        if (!result) {
            if (!currentPolymorphism.inheritsFrom || !currentPolymorphism.inheritsFrom.polymorphism) {
                throw serializationOptions_1.logAndCreateError(options, "No discriminator property name is specified in " + compositeSpecName + " or any of its base types.");
            }
            else {
                currentPolymorphism = currentPolymorphism.inheritsFrom.polymorphism;
            }
        }
    }
    return result;
}
/**
 * Get all of the CompositeTypeSpecs that the provided value must implement if the starting
 * CompositeTypeSpec is the provided compositeSpec.
 */
function getAllPolymorphicCompositeTypeSpecs(value, propertyPath, compositeSpec, options, isSerialization) {
    var result = [];
    var compositeSpecChanged = true;
    while (compositeSpecChanged) {
        compositeSpecChanged = false;
        // If the current compositeTypeSpec doesn't specify polymorphism details or if it doesn't
        // specify any derived type details, then we're done searching.
        var compositeSpecPolymorphism = compositeSpec.polymorphism;
        if (compositeSpecPolymorphism) {
            var rawDiscriminatorPropertyName = getDiscriminatorPropertyName(compositeSpecPolymorphism, compositeSpec.typeName, options, isSerialization);
            var discriminatorPropertyPath = splitSerializeName(rawDiscriminatorPropertyName);
            var discriminatorPropertyValue = getPropertyValue(value, discriminatorPropertyPath);
            if (discriminatorPropertyValue == undefined) {
                throw serializationOptions_1.logAndCreateError(options, "Missing polymorphic discriminator property at " + propertyPath.concat(discriminatorPropertyPath) + " for composite type " + compositeSpec.typeName + ".");
            }
            var compositeSpecInheritedBy = compositeSpecPolymorphism.inheritedBy;
            if (compositeSpecInheritedBy) {
                // If the current compositeTypeSpec does have derived types, then start by getting the
                // value for the polymorphic discriminator property.
                if (discriminatorPropertyValue !== compositeSpecPolymorphism.discriminatorPropertyValue) {
                    // Iterate through each of the derived types of the current compositeSpec and find the one
                    // that matches the discriminator property value in the CompositeType value. Remember that
                    // if multiple levels of the type hierarchy use the same polymorphic discriminator property,
                    // then this may turn into a tree search instead of a list search.
                    var derivedTypeDetailsToCheck = [];
                    for (var _i = 0, compositeSpecInheritedBy_1 = compositeSpecInheritedBy; _i < compositeSpecInheritedBy_1.length; _i++) {
                        var derivedCompositeTypeSpecName = compositeSpecInheritedBy_1[_i];
                        derivedTypeDetailsToCheck.push(serializationOptions_1.resolveCompositeTypeSpec(options, propertyPath, derivedCompositeTypeSpecName));
                    }
                    while (derivedTypeDetailsToCheck.length > 0) {
                        var derivedTypeSpec = derivedTypeDetailsToCheck.pop();
                        if (derivedTypeSpec) {
                            var derivedTypeSpecPolymorphism = derivedTypeSpec.polymorphism;
                            if (!derivedTypeSpecPolymorphism) {
                                throw serializationOptions_1.logAndCreateError(options, "Missing polymorphism property in CompositeTypeSpec " + derivedTypeSpec.typeName + ", even though it inherits from another CompositeTypeSpec.");
                            }
                            else if (discriminatorPropertyValue === derivedTypeSpecPolymorphism.discriminatorPropertyValue) {
                                compositeSpec = derivedTypeSpec;
                                compositeSpecChanged = true;
                                break;
                            }
                            else if (derivedTypeSpecPolymorphism.inheritedBy && (!derivedTypeSpecPolymorphism.discriminatorPropertyName || derivedTypeSpecPolymorphism.discriminatorPropertyName === rawDiscriminatorPropertyName)) {
                                // Even though this particular derived typeSpec's polymorphic discriminator property
                                // value doesn't match the provided value's property value, it may have derived types
                                // that do. If the derived typeSpec's polymorphic discriminator property is the same
                                // as the current compositeTypeSpec's polymorphic discriminator property, then add all
                                // of the derived typeSpec's derived types to the list of typeSpecs to check.
                                for (var _a = 0, _b = derivedTypeSpecPolymorphism.inheritedBy; _a < _b.length; _a++) {
                                    var childDerivedTypeSpecName = _b[_a];
                                    derivedTypeDetailsToCheck.push(serializationOptions_1.resolveCompositeTypeSpec(options, propertyPath, childDerivedTypeSpecName));
                                }
                            }
                        }
                    }
                    if (!compositeSpecChanged) {
                        var message = "Unrecognized polymorphic discriminator value " + discriminatorPropertyValue + " for composite type " + compositeSpec.typeName + " at property " + propertyPath.concat(discriminatorPropertyPath) + ".";
                        if (options && (isSerialization ? options.serializationStrictRequiredPolymorphicDiscriminator : options.deserializationStrictRequiredPolymorphicDiscriminator)) {
                            throw serializationOptions_1.logAndCreateError(options, message);
                        }
                        else {
                            serializationOptions_1.log(options, httpPipelineLogLevel_1.HttpPipelineLogLevel.WARNING, message);
                        }
                    }
                }
            }
        }
    }
    var toVisit = [compositeSpec];
    while (toVisit.length > 0) {
        var currentCompositeSpec = toVisit.pop();
        if (currentCompositeSpec && result.indexOf(currentCompositeSpec) === -1) {
            result.push(currentCompositeSpec);
            if (currentCompositeSpec.polymorphism && currentCompositeSpec.polymorphism.inheritsFrom) {
                var inheritsFrom = void 0;
                if (Array.isArray(currentCompositeSpec.polymorphism.inheritsFrom)) {
                    inheritsFrom = currentCompositeSpec.polymorphism.inheritsFrom;
                }
                else {
                    inheritsFrom = [currentCompositeSpec.polymorphism.inheritsFrom];
                }
                for (var _c = 0, inheritsFrom_1 = inheritsFrom; _c < inheritsFrom_1.length; _c++) {
                    var baseCompositeTypeSpec = inheritsFrom_1[_c];
                    toVisit.push(serializationOptions_1.resolveCompositeTypeSpec(options, propertyPath, baseCompositeTypeSpec));
                }
            }
        }
    }
    return result;
}
function getPropertyValue(value, propertyPath) {
    var result = value;
    if (result && propertyPath && propertyPath.length > 0) {
        for (var _i = 0, propertyPath_1 = propertyPath; _i < propertyPath_1.length; _i++) {
            var propertyPathSegment = propertyPath_1[_i];
            result = result[propertyPathSegment];
            if (result == undefined) {
                break;
            }
        }
    }
    return result;
}
function splitSerializeName(prop) {
    var classes = [];
    var partialclass = "";
    var subwords = prop.split(".");
    for (var _i = 0, subwords_1 = subwords; _i < subwords_1.length; _i++) {
        var item = subwords_1[_i];
        if (item.charAt(item.length - 1) === "\\") {
            partialclass += item.substr(0, item.length - 1) + ".";
        }
        else {
            partialclass += item;
            classes.push(partialclass);
            partialclass = "";
        }
    }
    return classes;
}
//# sourceMappingURL=compositeSpec.js.map