/**
 * The path to a property in both the deserialized and serialized scenarios.
 */
export declare class PropertyPath {
    readonly path: string[];
    readonly serializedPath: string[];
    constructor(path?: string[], serializedPath?: string[]);
    readonly pathString: string;
    readonly serializedPathString: string;
    pathStringConcat(...path: string[]): PropertyPath;
    concat(path: string[], serializedPath?: string[]): PropertyPath;
    toString(): string;
}
