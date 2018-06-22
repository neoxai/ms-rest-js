import { TypeSpec } from "./typeSpec";
export interface DictionaryType<T> {
    [key: string]: T;
}
export interface DictionaryTypeSpec<TSerializedValue, TDeserializedValue> extends TypeSpec<DictionaryType<TSerializedValue>, DictionaryType<TDeserializedValue>> {
    /**
     * The TypeSpec that defines each value in this DictionaryTypeSpec.
     */
    valueSpec: TypeSpec<TSerializedValue, TDeserializedValue> | string;
}
/**
 * A type specification that describes how to validate and serialize a Dictionary of values.
 */
export declare function dictionarySpec<TSerializedValue, TDeserializedValue>(valueSpec: TypeSpec<TSerializedValue, TDeserializedValue> | string): DictionaryTypeSpec<TSerializedValue, TDeserializedValue>;
