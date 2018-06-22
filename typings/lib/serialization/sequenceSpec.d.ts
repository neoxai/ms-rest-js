import { TypeSpec } from "./typeSpec";
export interface SequenceTypeSpec<TSerializedElement, TDeserializedElement> extends TypeSpec<TSerializedElement[], TDeserializedElement[]> {
    /**
     * The TypeSpec that defines each element in this SequenceTypeSpec.
     */
    elementSpec: TypeSpec<TSerializedElement, TDeserializedElement> | string;
    /**
     * The element name of the list elements. Only used when this is a root list.
     */
    xmlElementName?: string;
}
export interface SequenceSpecOptions {
    /**
     * The element name of the root element. Only used when this is a root list.
     */
    xmlRootName: string;
    /**
     * The element name of the sequence elements. Only used when this is a root list.
     */
    xmlElementName: string;
}
/**
 * A type specification that describes how to validate and serialize a Sequence of elements.
 */
export declare function sequenceSpec<TSerializedElement, TDeserializedElement>(elementSpec: TypeSpec<TSerializedElement, TDeserializedElement> | string, options?: SequenceSpecOptions): SequenceTypeSpec<TSerializedElement, TDeserializedElement>;
