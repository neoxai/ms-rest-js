import { HttpPipelineLogLevel } from "../httpPipelineLogLevel";
import { HttpPipelineLogger } from "../httpPipelineLogger";
import { CompositeTypeSpec } from "./compositeSpec";
import { PropertyPath } from "./propertyPath";
import { TypeSpec } from "./typeSpec";
/**
 * Options that can be passed to a serialize() function.
 */
export interface SerializationOptions {
    /**
     * The type of output that will be produced.
     */
    outputType?: SerializationOutputType;
    /**
     * Whether or not serialization will follow strict type-checking. If strict type-checking is used,
     * then an Error will be thrown if a value doesn't match the provided TypeSpec's expected types.
     */
    serializationStrictTypeChecking?: boolean;
    /**
     * Whether or not serialization will only allow properties on composite types that have been
     * specified in the composite type specification. If strict allowed properties is used, then an
     * Error will be thrown if a composite value has a property that isn't specified in its composite
     * type specification.
     */
    serializationStrictAllowedProperties?: boolean;
    /**
     * Whether or not serialization will enforce required properties on composite types. If strict
     * missing properties is used, then an Error will be thrown if a composite value doesn't have a
     * property that is marked as required in its composite type specification.
     */
    serializationStrictMissingProperties?: boolean;
    /**
     * Whether or not serialization will require that a polymorphic discriminator property be present.
     * If this option is set to true, then an Error will be thrown if a composite value doesn't have
     * a value for the polymorphic discriminator property.
     */
    serializationStrictRequiredPolymorphicDiscriminator?: boolean;
    /**
     * Whether or not deserialization will follow strict type-checking. If strict type-checking is
     * used, then an Error will be thrown if a value doesn't match the provided TypeSpec's expected
     * types.
     */
    deserializationStrictTypeChecking?: boolean;
    /**
     * Whether or not deserialization will only allow properties on composite types that have been
     * specified in the composite type specification. If strict allowed properties is used, then an
     * Error will be thrown if a composite value has a property that isn't specified in its composite
     * type specification.
     */
    deserializationStrictAllowedProperties?: boolean;
    /**
     * Whether or not deserialization will enforce required properties on composite types. If strict
     * missing properties is used, then an Error will be thrown if a composite value doesn't have a
     * property that is marked as required in its composite type specification.
     */
    deserializationStrictMissingProperties?: boolean;
    /**
     * Whether or not deserialization will require that a polymorphic discriminator property be
     * present. If this option is set to true, then an Error will be thrown if a composite value
     * doesn't have a value for the polymorphic discriminator property.
     */
    deserializationStrictRequiredPolymorphicDiscriminator?: boolean;
    /**
     * A dictionary of composite type specifications.
     */
    compositeSpecDictionary?: {
        [typeName: string]: CompositeTypeSpec;
    };
    /**
     * A logger that will log messages as serialization and deserialization occurs.
     */
    logger?: HttpPipelineLogger;
}
/**
 * The different types of output that can be produced by serialization.
 */
export declare enum SerializationOutputType {
    JSON = 0,
    XML = 1,
}
export declare function failSerializeTypeCheck(options: SerializationOptions, propertyPath: PropertyPath, value: any, expectedTypeDescription: string): void;
export declare function failDeserializeTypeCheck(options: SerializationOptions, propertyPath: PropertyPath, value: any, expectedTypeDescription: string): void;
export declare function failSerializeMissingRequiredPropertyCheck(options: SerializationOptions, childPropertyPath: PropertyPath, childPropertyValueTypeName: string): void;
export declare function failDeserializeMissingRequiredPropertyCheck(options: SerializationOptions, childPropertyPath: PropertyPath, childPropertyValueTypeName: string): void;
/**
 * Get whether or not a log with the provided log level should be logged.
 * @param logLevel The log level of the log that will be logged.
 * @returns Whether or not a log with the provided log level should be logged.
 */
export declare function shouldLog(serializationOptions: SerializationOptions, logLevel: HttpPipelineLogLevel): boolean;
/**
 * Attempt to log the provided message to the provided logger. If no logger was provided or if
 * the log level does not meat the logger's threshold, then nothing will be logged.
 * @param logLevel The log level of this log.
 * @param message The message of this log.
 */
export declare function log(serializationOptions: SerializationOptions, logLevel: HttpPipelineLogLevel, message: string): void;
/**
 * Log the provided error message and throw an error with the error message inside.
 * @param serializationOptions The serializationOptions to use to log the provided error message.
 * @param errorMessage The error message to log and throw inside of an Error.
 */
export declare function logAndCreateError(serializationOptions: SerializationOptions, errorMessage: string): Error;
export declare function resolveTypeSpec<TSerialized, TDeserialized>(serializationOptions: SerializationOptions, path: PropertyPath, typeSpec: TypeSpec<TSerialized, TDeserialized> | string): TypeSpec<TSerialized, TDeserialized>;
export declare function resolveCompositeTypeSpec(serializationOptions: SerializationOptions, path: PropertyPath, valueSpec: CompositeTypeSpec | string): CompositeTypeSpec;
