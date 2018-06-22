export declare class Serializer {
    readonly modelMappers: {
        [key: string]: any;
    } | undefined;
    readonly isXML: boolean | undefined;
    constructor(modelMappers?: {
        [key: string]: any;
    } | undefined, isXML?: boolean | undefined);
    validateConstraints(mapper: Mapper, value: any, objectName: string): void;
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
    serialize(mapper: Mapper, object: any, objectName?: string): any;
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
    deserialize(mapper: Mapper, responseBody: any, objectName: string): any;
}
export interface MapperConstraints {
    InclusiveMaximum?: number;
    ExclusiveMaximum?: number;
    InclusiveMinimum?: number;
    ExclusiveMinimum?: number;
    MaxLength?: number;
    MinLength?: number;
    Pattern?: RegExp;
    MaxItems?: number;
    MinItems?: number;
    UniqueItems?: true;
    MultipleOf?: number;
}
export interface BaseMapperType {
    name: string;
}
export interface BaseMapper {
    xmlName?: string;
    xmlIsAttribute?: boolean;
    xmlElementName?: string;
    xmlIsWrapped?: boolean;
    readOnly?: boolean;
    isConstant?: boolean;
    required?: boolean;
    serializedName: string;
    type: BaseMapperType;
    defaultValue?: any;
    constraints?: MapperConstraints;
}
export declare type Mapper = BaseMapper | CompositeMapper | SequenceMapper | DictionaryMapper | EnumMapper;
export interface PolymorphicDiscriminator {
    serializedName: string;
    clientName: string;
    [key: string]: string;
}
export interface CompositeMapper extends BaseMapper {
    type: {
        name: "Composite";
        className: string;
        modelProperties: {
            [propertyName: string]: Mapper;
        };
        uberParent?: string;
        polymorphicDiscriminator?: string | PolymorphicDiscriminator;
    };
}
export interface SequenceMapper extends BaseMapper {
    type: {
        name: "Sequence";
        element: Mapper;
    };
}
export interface DictionaryMapper extends BaseMapper {
    type: {
        name: "Dictionary";
        value: Mapper;
    };
    headerCollectionPrefix?: string;
}
export interface EnumMapper extends BaseMapper {
    type: {
        name: "Enum";
        allowedValues: Array<any>;
    };
}
export interface UrlParameterValue {
    value: string;
    skipUrlEncoding: boolean;
}
export declare function serializeObject(toSerialize: any): any;
export declare const MapperType: {
    Composite: "Composite";
    Sequence: "Sequence";
    Dictionary: "Dictionary";
    Enum: "Enum";
    Base64Url: "Base64Url";
    Boolean: "Boolean";
    ByteArray: "ByteArray";
    Date: "Date";
    DateTime: "DateTime";
    DateTimeRfc1123: "DateTimeRfc1123";
    Number: "Number";
    Object: "Object";
    String: "String";
    Stream: "Stream";
    TimeSpan: "TimeSpan";
    UnixTime: "UnixTime";
};
