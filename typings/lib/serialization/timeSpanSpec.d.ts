import { Duration } from "moment";
import { TypeSpec } from "./typeSpec";
/**
 * A type specification that describes how to validate and serialize a Date.
 */
declare const timeSpanSpec: TypeSpec<string, Duration>;
export default timeSpanSpec;
