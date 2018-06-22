// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as utils from "./util/utils";
import * as base64 from "./util/base64";
var Serializer = /** @class */ (function () {
    function Serializer(modelMappers, isXML) {
        this.modelMappers = modelMappers;
        this.isXML = isXML;
    }
    Serializer.prototype.validateConstraints = function (mapper, value, objectName) {
        var failValidation = function (constraintName, constraintValue) {
            throw new Error("\"" + objectName + "\" with value \"" + value + "\" should satisfy the constraint \"" + constraintName + "\": " + constraintValue + ".");
        };
        if (mapper.constraints && (value != undefined)) {
            var _a = mapper.constraints, ExclusiveMaximum = _a.ExclusiveMaximum, ExclusiveMinimum = _a.ExclusiveMinimum, InclusiveMaximum = _a.InclusiveMaximum, InclusiveMinimum = _a.InclusiveMinimum, MaxItems = _a.MaxItems, MaxLength = _a.MaxLength, MinItems = _a.MinItems, MinLength = _a.MinLength, MultipleOf = _a.MultipleOf, Pattern = _a.Pattern, UniqueItems = _a.UniqueItems;
            if (ExclusiveMaximum != undefined && value >= ExclusiveMaximum) {
                failValidation("ExclusiveMaximum", ExclusiveMaximum);
            }
            if (ExclusiveMinimum != undefined && value <= ExclusiveMinimum) {
                failValidation("ExclusiveMinimum", ExclusiveMinimum);
            }
            if (InclusiveMaximum != undefined && value > InclusiveMaximum) {
                failValidation("InclusiveMaximum", InclusiveMaximum);
            }
            if (InclusiveMinimum != undefined && value < InclusiveMinimum) {
                failValidation("InclusiveMinimum", InclusiveMinimum);
            }
            if (MaxItems != undefined && value.length > MaxItems) {
                failValidation("MaxItems", MaxItems);
            }
            if (MaxLength != undefined && value.length > MaxLength) {
                failValidation("MaxLength", MaxLength);
            }
            if (MinItems != undefined && value.length < MinItems) {
                failValidation("MinItems", MinItems);
            }
            if (MinLength != undefined && value.length < MinLength) {
                failValidation("MinLength", MinLength);
            }
            if (MultipleOf != undefined && value % MultipleOf !== 0) {
                failValidation("MultipleOf", MultipleOf);
            }
            if (Pattern && value.match(Pattern) === null) {
                failValidation("Pattern", Pattern);
            }
            if (UniqueItems && value.length !== value.filter(function (item, i, ar) { return ar.indexOf(item) === i; }).length) {
                failValidation("UniqueItems", UniqueItems);
            }
        }
    };
    /**
     * Serialize the given object based on its metadata defined in the mapper
     *
     * @param {Mapper} mapper The mapper which defines the metadata of the serializable object
     *
     * @param {object|string|Array|number|boolean|Date|stream} object A valid Javascript object to be serialized
     *
     * @param {string} objectName Name of the serialized object
     *
     * @returns {object|string|Array|number|boolean|Date|stream} A valid serialized Javascript object
     */
    Serializer.prototype.serialize = function (mapper, object, objectName) {
        var payload = {};
        var mapperType = mapper.type.name;
        if (!objectName) {
            objectName = mapper.serializedName;
        }
        if (mapperType.match(/^Sequence$/ig) !== null) {
            payload = [];
        }
        if (object == undefined) {
            // Throw if required and object is null or undefined
            if (mapper.required && !mapper.isConstant) {
                throw new Error(objectName + " cannot be null or undefined.");
            }
            // Set Defaults
            if (mapper.defaultValue != undefined || mapper.isConstant) {
                object = mapper.defaultValue;
            }
        }
        if (object == undefined) {
            payload = object;
        }
        else {
            // Validate Constraints if any
            this.validateConstraints(mapper, object, objectName);
            if (mapperType.match(/^any$/ig) !== null) {
                payload = object;
            }
            else if (mapperType.match(/^(Number|String|Boolean|Object|Stream|Uuid)$/ig) !== null) {
                payload = serializeBasicTypes(mapperType, objectName, object);
            }
            else if (mapperType.match(/^Enum$/ig) !== null) {
                var enumMapper = mapper;
                payload = serializeEnumType(objectName, enumMapper.type.allowedValues, object);
            }
            else if (mapperType.match(/^(Date|DateTime|TimeSpan|DateTimeRfc1123|UnixTime)$/ig) !== null) {
                payload = serializeDateTypes(mapperType, object, objectName);
            }
            else if (mapperType.match(/^ByteArray$/ig) !== null) {
                payload = serializeByteArrayType(objectName, object);
            }
            else if (mapperType.match(/^Base64Url$/ig) !== null) {
                payload = serializeBase64UrlType(objectName, object);
            }
            else if (mapperType.match(/^Sequence$/ig) !== null) {
                payload = serializeSequenceType(this, mapper, object, objectName);
            }
            else if (mapperType.match(/^Dictionary$/ig) !== null) {
                payload = serializeDictionaryType(this, mapper, object, objectName);
            }
            else if (mapperType.match(/^Composite$/ig) !== null) {
                payload = serializeCompositeType(this, mapper, object, objectName);
            }
        }
        return payload;
    };
    /**
     * Deserialize the given object based on its metadata defined in the mapper
     *
     * @param {object} mapper The mapper which defines the metadata of the serializable object
     *
     * @param {object|string|Array|number|boolean|Date|stream} responseBody A valid Javascript entity to be deserialized
     *
     * @param {string} objectName Name of the deserialized object
     *
     * @returns {object|string|Array|number|boolean|Date|stream} A valid deserialized Javascript object
     */
    Serializer.prototype.deserialize = function (mapper, responseBody, objectName) {
        if (responseBody == undefined) {
            if (this.isXML && mapper.type.name === "Sequence" && !mapper.xmlIsWrapped) {
                // Edge case for empty XML non-wrapped lists. xml2js can't distinguish
                // between the list being empty versus being missing,
                // so let's do the more user-friendly thing and return an empty list.
                responseBody = [];
            }
            else {
                return responseBody;
            }
            return responseBody;
        }
        var payload;
        var mapperType = mapper.type.name;
        if (!objectName) {
            objectName = mapper.serializedName;
        }
        if (mapperType.match(/^Number$/ig) !== null) {
            payload = parseFloat(responseBody);
            if (isNaN(payload)) {
                payload = responseBody;
            }
        }
        else if (mapperType.match(/^Boolean$/ig) !== null) {
            if (responseBody === "true") {
                payload = true;
            }
            else if (responseBody === "false") {
                payload = false;
            }
            else {
                payload = responseBody;
            }
        }
        else if (mapperType.match(/^(String|Enum|Object|Stream|Uuid|TimeSpan|any)$/ig) !== null) {
            payload = responseBody;
        }
        else if (mapperType.match(/^(Date|DateTime|DateTimeRfc1123)$/ig) !== null) {
            payload = new Date(responseBody);
        }
        else if (mapperType.match(/^UnixTime$/ig) !== null) {
            payload = unixTimeToDate(responseBody);
        }
        else if (mapperType.match(/^ByteArray$/ig) !== null) {
            payload = base64.decodeString(responseBody);
        }
        else if (mapperType.match(/^Base64Url$/ig) !== null) {
            payload = base64UrlToByteArray(responseBody);
        }
        else if (mapperType.match(/^Sequence$/ig) !== null) {
            payload = deserializeSequenceType(this, mapper, responseBody, objectName);
        }
        else if (mapperType.match(/^Dictionary$/ig) !== null) {
            payload = deserializeDictionaryType(this, mapper, responseBody, objectName);
        }
        else if (mapperType.match(/^Composite$/ig) !== null) {
            payload = deserializeCompositeType(this, mapper, responseBody, objectName);
        }
        if (mapper.isConstant) {
            payload = mapper.defaultValue;
        }
        return payload;
    };
    return Serializer;
}());
export { Serializer };
function trimEnd(str, ch) {
    var len = str.length;
    while ((len - 1) >= 0 && str[len - 1] === ch) {
        --len;
    }
    return str.substr(0, len);
}
function bufferToBase64Url(buffer) {
    if (!buffer) {
        return undefined;
    }
    if (!(buffer instanceof Uint8Array)) {
        throw new Error("Please provide an input of type Uint8Array for converting to Base64Url.");
    }
    // Uint8Array to Base64.
    var str = base64.encodeByteArray(buffer);
    // Base64 to Base64Url.
    return trimEnd(str, "=").replace(/\+/g, "-").replace(/\//g, "_");
}
function base64UrlToByteArray(str) {
    if (!str) {
        return undefined;
    }
    if (str && typeof str.valueOf() !== "string") {
        throw new Error("Please provide an input of type string for converting to Uint8Array");
    }
    // Base64Url to Base64.
    str = str.replace(/\-/g, "+").replace(/\_/g, "/");
    // Base64 to Uint8Array.
    return base64.decodeString(str);
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
function dateToUnixTime(d) {
    if (!d) {
        return undefined;
    }
    if (typeof d.valueOf() === "string") {
        d = new Date(d);
    }
    return Math.floor(d.getTime() / 1000);
}
function unixTimeToDate(n) {
    if (!n) {
        return undefined;
    }
    return new Date(n * 1000);
}
function serializeBasicTypes(typeName, objectName, value) {
    if (value !== null && value !== undefined) {
        if (typeName.match(/^Number$/ig) !== null) {
            if (typeof value !== "number") {
                throw new Error(objectName + " with value " + value + " must be of type number.");
            }
        }
        else if (typeName.match(/^String$/ig) !== null) {
            if (typeof value.valueOf() !== "string") {
                throw new Error(objectName + " with value \"" + value + "\" must be of type string.");
            }
        }
        else if (typeName.match(/^Uuid$/ig) !== null) {
            if (!(typeof value.valueOf() === "string" && utils.isValidUuid(value))) {
                throw new Error(objectName + " with value \"" + value + "\" must be of type string and a valid uuid.");
            }
        }
        else if (typeName.match(/^Boolean$/ig) !== null) {
            if (typeof value !== "boolean") {
                throw new Error(objectName + " with value " + value + " must be of type boolean.");
            }
        }
        else if (typeName.match(/^Stream$/ig) !== null) {
            var objectType = typeof value;
            if (objectType !== "string" &&
                objectType !== "function" &&
                !(value instanceof ArrayBuffer) &&
                !ArrayBuffer.isView(value) &&
                !(typeof Blob === "function" && value instanceof Blob)) {
                throw new Error(objectName + " must be a string, Blob, ArrayBuffer, ArrayBufferView, or a function returning NodeJS.ReadableStream.");
            }
        }
    }
    return value;
}
function serializeEnumType(objectName, allowedValues, value) {
    if (!allowedValues) {
        throw new Error("Please provide a set of allowedValues to validate " + objectName + " as an Enum Type.");
    }
    var isPresent = allowedValues.some(function (item) {
        if (typeof item.valueOf() === "string") {
            return item.toLowerCase() === value.toLowerCase();
        }
        return item === value;
    });
    if (!isPresent) {
        throw new Error(value + " is not a valid value for " + objectName + ". The valid values are: " + JSON.stringify(allowedValues) + ".");
    }
    return value;
}
function serializeByteArrayType(objectName, value) {
    if (value !== null && value !== undefined) {
        if (!(value instanceof Uint8Array)) {
            throw new Error(objectName + " must be of type Uint8Array.");
        }
        value = base64.encodeByteArray(value);
    }
    return value;
}
function serializeBase64UrlType(objectName, value) {
    if (value !== null && value !== undefined) {
        if (!(value instanceof Uint8Array)) {
            throw new Error(objectName + " must be of type Uint8Array.");
        }
        value = bufferToBase64Url(value);
    }
    return value;
}
function serializeDateTypes(typeName, value, objectName) {
    if (value != undefined) {
        if (typeName.match(/^Date$/ig) !== null) {
            if (!(value instanceof Date ||
                (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                throw new Error(objectName + " must be an instanceof Date or a string in ISO8601 format.");
            }
            value = (value instanceof Date) ? value.toISOString().substring(0, 10) : new Date(value).toISOString().substring(0, 10);
        }
        else if (typeName.match(/^DateTime$/ig) !== null) {
            if (!(value instanceof Date ||
                (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                throw new Error(objectName + " must be an instanceof Date or a string in ISO8601 format.");
            }
            value = (value instanceof Date) ? value.toISOString() : new Date(value).toISOString();
        }
        else if (typeName.match(/^DateTimeRfc1123$/ig) !== null) {
            if (!(value instanceof Date ||
                (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                throw new Error(objectName + " must be an instanceof Date or a string in RFC-1123 format.");
            }
            value = (value instanceof Date) ? value.toUTCString() : new Date(value).toUTCString();
        }
        else if (typeName.match(/^UnixTime$/ig) !== null) {
            if (!(value instanceof Date ||
                (typeof value.valueOf() === "string" && !isNaN(Date.parse(value))))) {
                throw new Error(objectName + " must be an instanceof Date or a string in RFC-1123/ISO8601 format " +
                    "for it to be serialized in UnixTime/Epoch format.");
            }
            value = dateToUnixTime(value);
        }
        else if (typeName.match(/^TimeSpan$/ig) !== null) {
            if (!utils.isDuration(value)) {
                throw new Error(objectName + " must be a string in ISO 8601 format. Instead was \"" + value + "\".");
            }
            value = value;
        }
    }
    return value;
}
function serializeSequenceType(serializer, mapper, object, objectName) {
    if (!Array.isArray(object)) {
        throw new Error(objectName + " must be of type Array.");
    }
    if (!mapper.type.element || typeof mapper.type.element !== "object") {
        throw new Error("element\" metadata for an Array must be defined in the " +
            ("mapper and it must of type \"object\" in " + objectName + "."));
    }
    var tempArray = [];
    for (var i = 0; i < object.length; i++) {
        tempArray[i] = serializer.serialize(mapper.type.element, object[i], objectName);
    }
    return tempArray;
}
function serializeDictionaryType(serializer, mapper, object, objectName) {
    if (typeof object !== "object") {
        throw new Error(objectName + " must be of type object.");
    }
    if (!mapper.type.value || typeof mapper.type.value !== "object") {
        throw new Error("\"value\" metadata for a Dictionary must be defined in the " +
            ("mapper and it must of type \"object\" in " + objectName + "."));
    }
    var tempDictionary = {};
    for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
        var key = _a[_i];
        tempDictionary[key] = serializer.serialize(mapper.type.value, object[key], objectName + "." + key);
    }
    return tempDictionary;
}
function serializeCompositeType(serializer, mapper, object, objectName) {
    // check for polymorphic discriminator
    if (mapper.type.polymorphicDiscriminator) {
        mapper = getPolymorphicMapper(serializer, mapper, object, objectName, "serialize");
    }
    var payload = {};
    var modelMapper = {
        required: false,
        serializedName: "serializedName",
        type: {
            name: "Composite",
            className: "className",
            modelProperties: {}
        }
    };
    if (object !== null && object !== undefined) {
        var modelProps = mapper.type.modelProperties;
        if (!modelProps) {
            if (!mapper.type.className) {
                throw new Error("Class name for model \"" + objectName + "\" is not provided in the mapper \"" + JSON.stringify(mapper, undefined, 2) + "\".");
            }
            // get the mapper if modelProperties of the CompositeType is not present and
            // then get the modelProperties from it.
            modelMapper = serializer.modelMappers[mapper.type.className];
            if (!modelMapper) {
                throw new Error("mapper() cannot be null or undefined for model \"" + mapper.type.className + "\".");
            }
            modelProps = modelMapper.type.modelProperties;
            if (!modelProps) {
                throw new Error("modelProperties cannot be null or undefined in the " +
                    ("mapper \"" + JSON.stringify(modelMapper) + "\" of type \"" + mapper.type.className + "\" for object \"" + objectName + "\"."));
            }
        }
        for (var _i = 0, _a = Object.keys(modelProps); _i < _a.length; _i++) {
            var key = _a[_i];
            var propertyMapper = modelProps[key];
            var propName = void 0;
            var parentObject = payload;
            if (serializer.isXML) {
                if (propertyMapper.xmlIsWrapped) {
                    propName = propertyMapper.xmlName;
                }
                else {
                    propName = propertyMapper.xmlElementName || propertyMapper.xmlName;
                }
            }
            else {
                var paths = splitSerializeName(propertyMapper.serializedName);
                propName = paths.pop();
                for (var _b = 0, paths_1 = paths; _b < paths_1.length; _b++) {
                    var pathName = paths_1[_b];
                    var childObject = parentObject[pathName];
                    if ((childObject === null || childObject === undefined) && (object[key] !== null && object[key] !== undefined)) {
                        parentObject[pathName] = {};
                    }
                    parentObject = parentObject[pathName];
                }
            }
            // make sure required properties of the CompositeType are present
            if (propertyMapper.required && !propertyMapper.isConstant) {
                if (object[key] == undefined) {
                    throw new Error(key + "\" cannot be null or undefined in \"" + objectName + "\".");
                }
            }
            // make sure that readOnly properties are not sent on the wire
            if (propertyMapper.readOnly) {
                continue;
            }
            // serialize the property if it is present in the provided object instance
            if (((parentObject !== null && parentObject !== undefined) && (propertyMapper.defaultValue !== null && propertyMapper.defaultValue !== undefined)) ||
                (object[key] !== null && object[key] !== undefined)) {
                var propertyObjectName = propertyMapper.serializedName !== ""
                    ? objectName + "." + propertyMapper.serializedName
                    : objectName;
                var serializedValue = serializer.serialize(propertyMapper, object[key], propertyObjectName);
                if (propName !== null && propName !== undefined) {
                    if (propertyMapper.xmlIsAttribute) {
                        // $ is the key attributes are kept under in xml2js.
                        // This keeps things simple while preventing name collision
                        // with names in user documents.
                        parentObject.$ = parentObject.$ || {};
                        parentObject.$[propName] = serializedValue;
                    }
                    else if (propertyMapper.xmlIsWrapped) {
                        parentObject[propName] = (_c = {}, _c[propertyMapper.xmlElementName] = serializedValue, _c);
                    }
                    else {
                        parentObject[propName] = serializedValue;
                    }
                }
            }
        }
        return payload;
    }
    return object;
    var _c;
}
function deserializeCompositeType(serializer, mapper, responseBody, objectName) {
    /*jshint validthis: true */
    // check for polymorphic discriminator
    if (mapper.type.polymorphicDiscriminator) {
        mapper = getPolymorphicMapper(serializer, mapper, responseBody, objectName, "deserialize");
    }
    var instance = {};
    var modelMapper = {
        required: false,
        serializedName: "serializedName",
        type: {
            name: "Composite"
        }
    };
    responseBody = responseBody || {};
    var modelProps = mapper.type.modelProperties;
    if (!modelProps) {
        if (!mapper.type.className) {
            throw new Error("Class name for model \"" + objectName + "\" is not provided in the mapper \"" + JSON.stringify(mapper) + "\"");
        }
        // get the mapper if modelProperties of the CompositeType is not present and
        // then get the modelProperties from it.
        modelMapper = serializer.modelMappers[mapper.type.className];
        if (!modelMapper) {
            throw new Error("mapper() cannot be null or undefined for model \"" + mapper.type.className + "\"");
        }
        modelProps = modelMapper.type.modelProperties;
        if (!modelProps) {
            throw new Error("modelProperties cannot be null or undefined in the " +
                ("mapper \"" + JSON.stringify(modelMapper) + "\" of type \"" + mapper.type.className + "\" for responseBody \"" + objectName + "\"."));
        }
    }
    for (var _i = 0, _a = Object.keys(modelProps); _i < _a.length; _i++) {
        var key = _a[_i];
        var propertyMapper = modelProps[key];
        var propertyObjectName = objectName;
        if (propertyMapper.serializedName !== "") {
            propertyObjectName = objectName + "." + propertyMapper.serializedName;
        }
        var headerCollectionPrefix = propertyMapper.headerCollectionPrefix;
        if (headerCollectionPrefix) {
            var dictionary = {};
            for (var _b = 0, _c = Object.keys(responseBody); _b < _c.length; _b++) {
                var headerKey = _c[_b];
                if (headerKey.startsWith(headerCollectionPrefix)) {
                    dictionary[headerKey.substring(headerCollectionPrefix.length)] = serializer.deserialize(propertyMapper.type.value, responseBody[headerKey], propertyObjectName);
                }
            }
            instance[key] = dictionary;
        }
        else if (serializer.isXML) {
            if (propertyMapper.xmlIsAttribute && responseBody.$) {
                instance[key] = serializer.deserialize(propertyMapper, responseBody.$[propertyMapper.xmlName], propertyObjectName);
            }
            else {
                var propertyName = propertyMapper.xmlElementName || propertyMapper.xmlName;
                var unwrappedProperty = responseBody[propertyName];
                if (propertyMapper.xmlIsWrapped) {
                    unwrappedProperty = responseBody[propertyMapper.xmlName];
                    unwrappedProperty = unwrappedProperty && unwrappedProperty[propertyMapper.xmlElementName];
                    if (unwrappedProperty === undefined) {
                        // undefined means a wrapped list was empty
                        unwrappedProperty = [];
                    }
                }
                instance[key] = serializer.deserialize(propertyMapper, unwrappedProperty, propertyObjectName);
            }
        }
        else {
            var paths = splitSerializeName(modelProps[key].serializedName);
            // deserialize the property if it is present in the provided responseBody instance
            var propertyInstance = void 0;
            var res = responseBody;
            // traversing the object step by step.
            for (var _d = 0, paths_2 = paths; _d < paths_2.length; _d++) {
                var item = paths_2[_d];
                if (!res)
                    break;
                res = res[item];
            }
            propertyInstance = res;
            var serializedValue = void 0;
            // paging
            if (Array.isArray(responseBody[key]) && modelProps[key].serializedName === "") {
                propertyInstance = responseBody[key];
                instance = serializer.deserialize(propertyMapper, propertyInstance, propertyObjectName);
            }
            else if (propertyInstance !== null && propertyInstance !== undefined) {
                serializedValue = serializer.deserialize(propertyMapper, propertyInstance, propertyObjectName);
                instance[key] = serializedValue;
            }
        }
    }
    return instance;
}
function deserializeDictionaryType(serializer, mapper, responseBody, objectName) {
    /*jshint validthis: true */
    if (!mapper.type.value || typeof mapper.type.value !== "object") {
        throw new Error("\"value\" metadata for a Dictionary must be defined in the " +
            ("mapper and it must of type \"object\" in " + objectName));
    }
    if (responseBody) {
        var tempDictionary = {};
        for (var key in responseBody) {
            if (responseBody.hasOwnProperty(key)) {
                tempDictionary[key] = serializer.deserialize(mapper.type.value, responseBody[key], objectName);
            }
        }
        return tempDictionary;
    }
    return responseBody;
}
function deserializeSequenceType(serializer, mapper, responseBody, objectName) {
    /*jshint validthis: true */
    if (!mapper.type.element || typeof mapper.type.element !== "object") {
        throw new Error("element\" metadata for an Array must be defined in the " +
            ("mapper and it must of type \"object\" in " + objectName));
    }
    if (responseBody) {
        if (!Array.isArray(responseBody)) {
            // xml2js will interpret a single element array as just the element, so force it to be an array
            responseBody = [responseBody];
        }
        var tempArray = [];
        for (var i = 0; i < responseBody.length; i++) {
            tempArray[i] = serializer.deserialize(mapper.type.element, responseBody[i], objectName);
        }
        return tempArray;
    }
    return responseBody;
}
function getPolymorphicMapper(serializer, mapper, object, objectName, mode) {
    // check for polymorphic discriminator
    // Until version 1.15.1, "polymorphicDiscriminator" in the mapper was a string. This method was not effective when the
    // polymorphicDiscriminator property had a dot in it"s name. So we have comeup with a desgin where polymorphicDiscriminator
    // will be an object that contains the clientName (normalized property name, ex: "odatatype") and
    // the serializedName (ex: "odata.type") (We do not escape the dots with double backslash in this case as it is not required)
    // Thus when serializing, the user will give us an object which will contain the normalizedProperty hence we will lookup
    // the clientName of the polmorphicDiscriminator in the mapper and during deserialization from the responseBody we will
    // lookup the serializedName of the polmorphicDiscriminator in the mapper. This will help us in selecting the correct mapper
    // for the model that needs to be serializes or deserialized.
    // We need this routing for backwards compatibility. This will absorb the breaking change in the mapper and allow new versions
    // of the runtime to work seamlessly with older version (>= 0.17.0-Nightly20161008) of Autorest generated node.js clients.
    if (mapper.type.polymorphicDiscriminator) {
        if (typeof mapper.type.polymorphicDiscriminator.valueOf() === "string") {
            return getPolymorphicMapperStringVersion(serializer, mapper, object, objectName);
        }
        else if (mapper.type.polymorphicDiscriminator instanceof Object) {
            return getPolymorphicMapperObjectVersion(serializer, mapper, object, objectName, mode);
        }
        else {
            throw new Error("The polymorphicDiscriminator for \"" + objectName + "\" is neither a string nor an object.");
        }
    }
    return mapper;
}
// processes new version of the polymorphicDiscriminator in the mapper.
function getPolymorphicMapperObjectVersion(serializer, mapper, object, objectName, mode) {
    // check for polymorphic discriminator
    var polymorphicPropertyName = "";
    if (mode === "serialize") {
        polymorphicPropertyName = "clientName";
    }
    else if (mode === "deserialize") {
        polymorphicPropertyName = "serializedName";
    }
    else {
        throw new Error("The given mode \"" + mode + "\" for getting the polymorphic mapper for \"" + objectName + "\" is inavlid.");
    }
    var discriminatorAsObject = mapper.type.polymorphicDiscriminator;
    if (discriminatorAsObject &&
        discriminatorAsObject[polymorphicPropertyName] !== null &&
        discriminatorAsObject[polymorphicPropertyName] !== undefined) {
        if (object === null || object === undefined) {
            throw new Error(objectName + "\" cannot be null or undefined. " +
                ("\"" + discriminatorAsObject[polymorphicPropertyName] + "\" is the ") +
                "polmorphicDiscriminator and is a required property.");
        }
        if (object[discriminatorAsObject[polymorphicPropertyName]] === null ||
            object[discriminatorAsObject[polymorphicPropertyName]] === undefined) {
            throw new Error("No discriminator field \"" + discriminatorAsObject[polymorphicPropertyName] + "\" was found in \"" + objectName + "\".");
        }
        var indexDiscriminator = undefined;
        if (object[discriminatorAsObject[polymorphicPropertyName]] === mapper.type.uberParent) {
            indexDiscriminator = object[discriminatorAsObject[polymorphicPropertyName]];
        }
        else {
            indexDiscriminator = mapper.type.uberParent + "." + object[discriminatorAsObject[polymorphicPropertyName]];
        }
        if (serializer.modelMappers && serializer.modelMappers.discriminators[indexDiscriminator]) {
            mapper = serializer.modelMappers.discriminators[indexDiscriminator];
        }
    }
    return mapper;
}
// processes old version of the polymorphicDiscriminator in the mapper.
function getPolymorphicMapperStringVersion(serializer, mapper, object, objectName) {
    // check for polymorphic discriminator
    var discriminatorAsString = mapper.type.polymorphicDiscriminator;
    if (discriminatorAsString !== null && discriminatorAsString !== undefined) {
        if (object === null || object === undefined) {
            throw new Error(objectName + "\" cannot be null or undefined. \"" + discriminatorAsString + "\" is the " +
                "polmorphicDiscriminator and is a required property.");
        }
        if (object[discriminatorAsString] === null || object[discriminatorAsString] === undefined) {
            throw new Error("No discriminator field \"" + discriminatorAsString + "\" was found in \"" + objectName + "\".");
        }
        var indexDiscriminator = undefined;
        if (object[discriminatorAsString] === mapper.type.uberParent) {
            indexDiscriminator = object[discriminatorAsString];
        }
        else {
            indexDiscriminator = mapper.type.uberParent + "." + object[discriminatorAsString];
        }
        if (serializer.modelMappers && serializer.modelMappers.discriminators[indexDiscriminator]) {
            mapper = serializer.modelMappers.discriminators[indexDiscriminator];
        }
    }
    return mapper;
}
export function serializeObject(toSerialize) {
    if (toSerialize === null || toSerialize === undefined)
        return undefined;
    if (toSerialize instanceof Uint8Array) {
        toSerialize = base64.encodeByteArray(toSerialize);
        return toSerialize;
    }
    else if (toSerialize instanceof Date) {
        return toSerialize.toISOString();
    }
    else if (Array.isArray(toSerialize)) {
        var array = [];
        for (var i = 0; i < toSerialize.length; i++) {
            array.push(serializeObject(toSerialize[i]));
        }
        return array;
    }
    else if (typeof toSerialize === "object") {
        var dictionary = {};
        for (var property in toSerialize) {
            dictionary[property] = serializeObject(toSerialize[property]);
        }
        return dictionary;
    }
    return toSerialize;
}
/**
 * Utility function to create a K:V from a list of strings
 */
function strEnum(o) {
    var result = {};
    for (var _i = 0, o_1 = o; _i < o_1.length; _i++) {
        var key = o_1[_i];
        result[key] = key;
    }
    return result;
}
export var MapperType = strEnum([
    "Base64Url",
    "Boolean",
    "ByteArray",
    "Composite",
    "Date",
    "DateTime",
    "DateTimeRfc1123",
    "Dictionary",
    "Enum",
    "Number",
    "Object",
    "Sequence",
    "String",
    "Stream",
    "TimeSpan",
    "UnixTime"
]);
//# sourceMappingURL=serializer.js.map