/// <reference types="node" />
import { TypeSpec } from "./typeSpec";
/**
 * A type specification that describes how to validate and serialize a ByteArray.
 */
declare const byteArraySpec: TypeSpec<string, Buffer>;
export default byteArraySpec;
