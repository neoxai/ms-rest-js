import { TypeSpec } from "./typeSpec";
export interface CompositeType {
    [key: string]: any;
}
/**
 * The options that specify polymorphism for a CompositeTypeSpec.
 */
export interface Polymorphism {
    /**
     * The CompositeTypeSpecs that this CompositeTypeSpec "inherits" from.
     */
    inheritsFrom?: CompositeTypeSpec;
    /**
     * The names of the CompositeTypeSpecs that "inherit" from this CompositeTypeSpec.
     */
    inheritedBy?: string[];
    /**
     * The name of the property that determines what the actual type the polymorphic object is. If
     * this is not provided, then the discriminatorPropertyName of the parent type will be used.
     */
    discriminatorPropertyName?: string;
    /**
     * The serialized name of the property that determines what the actual type of the polymorphic
     * object is. If this is not provided, then the discriminatorPropertyName should be used.
     */
    discriminatorPropertySerializedName?: string;
    /**
     * The value of the discriminator property that would indicate that this CompositeTypeSpec is the
     * target TypeSpec for the value being serialized or deserialized.
     */
    discriminatorPropertyValue: any;
}
/**
 * The TypeSpec for serializing and deserializing a CompositeType.
 */
export interface CompositeTypeSpec extends TypeSpec<CompositeType, CompositeType>, CompositeSpecParameters {
}
/**
 * The extra details that describe a CompositeTypeSpec.
 */
export interface CompositeSpecParameters {
    /**
     * The name of the composite type (class) that this CompositeTypeSpec describes.
     */
    typeName: string;
    /**
     * The name of the root XML element (if this CompositeTypeSpec is the root of the object tree).
     */
    xmlRootName?: string;
    /**
     * The options that specify polymorphism for this CompositeTypeSpec.
     */
    polymorphism?: Polymorphism;
    /**
     * The specifications for each of the properties that exist on the type that this
     * CompositeTypeSpec describes.
     */
    propertySpecs?: {
        [propertyName: string]: PropertySpec;
    };
}
/**
 * A type specification that describes how to validate and serialize a Composite value.
 */
export declare function compositeSpec(parameters: CompositeSpecParameters): CompositeTypeSpec;
/**
 * A specification that describes a property on a Composite type.
 */
export interface PropertySpec {
    /**
     * The name of this property when it is serialized.
     */
    serializedName?: string;
    /**
     * Whether or not this property is required.
     */
    required?: boolean;
    /**
     * Whether or not this property's value is a constant.
     */
    constant?: boolean;
    /**
     * Whether or not this property's value is readonly.
     */
    readonly?: boolean;
    /**
     * Whether or not this property is the polymorphic discriminator for this composite type's
     * hierarchy.
     */
    polymorphicDiscriminator?: boolean;
    /**
     * Whether or not this property exists as an attribute.
     */
    xmlIsAttribute?: boolean;
    /**
     * Whether or not this property wraps a sequence of elements.
     */
    xmlIsWrapped?: boolean;
    /**
     * The element name of this property if it converted to an XML element.
     */
    xmlName?: string;
    /**
     * The name of child elements if this property is converted to an XML element.
     */
    xmlElementName?: string;
    /**
     * The specification for the value of this property, or the key to lookup the composite
     * specification within a composite specification dictionary.
     */
    valueSpec: TypeSpec<any, any> | string;
}
