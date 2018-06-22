import { SerializationOptions } from "../../../lib/serialization/serializationOptions";
import { TypeSpec } from "../../../lib/serialization/typeSpec";
export interface TestArgs<TSerialized, TDeserialized> {
    testName?: string;
    typeSpec: TypeSpec<TSerialized, TDeserialized>;
    propertyPath?: string[];
    value: any;
    options?: SerializationOptions;
    expectedResult: any;
    expectedLogs?: string[];
}
export declare function serializeTest<TSerialized, TDeserialized>(args: TestArgs<TSerialized, TDeserialized>): void;
export declare function deserializeTest<TSerialized, TDeserialized>(args: TestArgs<TSerialized, TDeserialized>): void;
