"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Encodes a string in base64 format.
 * @param value the string to encode
 */
function encodeString(value) {
    if (typeof Buffer === "undefined") {
        return btoa(value);
    }
    else {
        return Buffer.from(value).toString("base64");
    }
}
exports.encodeString = encodeString;
/**
 * Encodes a byte array in base64 format.
 * @param value the Uint8Aray to encode
 */
function encodeByteArray(value) {
    if (typeof Buffer === "undefined") {
        var str = "";
        for (var i = 0; i < value.length; i++) {
            str += String.fromCharCode(value[i]);
        }
        return btoa(str);
    }
    else {
        // Buffer.from accepts <ArrayBuffer> | <SharedArrayBuffer>-- the TypeScript definition is off here
        // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
        var bufferValue = (value instanceof Buffer) ? value : Buffer.from(value.buffer);
        return bufferValue.toString("base64");
    }
}
exports.encodeByteArray = encodeByteArray;
/**
 * Decodes a base64 string into a byte array.
 * @param value the base64 string to decode
 */
function decodeString(value) {
    if (typeof Buffer === "undefined") {
        var byteString = atob(value);
        var arr = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            arr[i] = byteString.charCodeAt(i);
        }
        return arr;
    }
    else {
        return Buffer.from(value, "base64");
    }
}
exports.decodeString = decodeString;
//# sourceMappingURL=base64.js.map