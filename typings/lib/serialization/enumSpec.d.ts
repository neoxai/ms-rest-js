import { TypeSpec } from "./typeSpec";
export interface EnumTypeSpec<T> extends TypeSpec<T, T> {
    /**
     * The name of the enum type that this EnumTypeSpec describes.
     */
    enumName: string;
    /**
     * The values that are allowed for this EnumTypeSpec.
     */
    allowedValues: T[];
}
/**
 * A type specification that describes how to validate and serialize an object.
 */
export declare function enumSpec<T>(enumName: string, allowedValues: T[]): EnumTypeSpec<T>;
