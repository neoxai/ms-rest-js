import { TypeSpec } from "./typeSpec";
export interface ObjectType {
    [key: string]: any;
}
/**
 * A type specification that describes how to validate and serialize an object.
 */
declare const objectSpec: TypeSpec<ObjectType, ObjectType>;
export default objectSpec;
