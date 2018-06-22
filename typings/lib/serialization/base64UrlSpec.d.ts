/// <reference types="node" />
import { TypeSpec } from "./typeSpec";
/**
 * A type specification that describes how to validate and serialize a Base64Url encoded ByteArray.
 */
declare const base64UrlSpec: TypeSpec<string, Buffer>;
export default base64UrlSpec;
