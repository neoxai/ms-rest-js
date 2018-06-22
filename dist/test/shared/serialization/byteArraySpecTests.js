"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var byteArraySpec_1 = require("../../../lib/serialization/byteArraySpec");
var specTest_1 = require("./specTest");
describe("byteArraySpec", function () {
    it("should have \"ByteArray\" for its typeName property", function () {
        assert.strictEqual("ByteArray", byteArraySpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function byteArraySerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: byteArraySpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            byteArraySerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a Buffer."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a Buffer."]
            });
            byteArraySerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a Buffer."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a Buffer."]
            });
            byteArraySerializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: new Error("Property a.property.path with value {} must be a Buffer."),
                expectedLogs: ["ERROR: Property a.property.path with value {} must be a Buffer."]
            });
            byteArraySerializeWithStrictTypeCheckingTest({
                value: new Buffer([0, 1, 2, 3, 4]),
                expectedResult: "AAECAwQ="
            });
        });
        describe("without strict type-checking", function () {
            function byteArraySerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: byteArraySpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            byteArraySerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a Buffer."]
            });
            byteArraySerializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a Buffer."]
            });
            byteArraySerializeWithoutStrictTypeCheckingTest({
                value: {},
                expectedResult: {},
                expectedLogs: ["WARNING: Property a.property.path with value {} should be a Buffer."]
            });
            byteArraySerializeWithoutStrictTypeCheckingTest({
                value: new Buffer([0, 1, 2, 3, 4]),
                expectedResult: "AAECAwQ="
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function byteArrayDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: byteArraySpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            byteArrayDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a string."]
            });
            byteArrayDeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a string."]
            });
            byteArrayDeserializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: new Error("Property a.property.path with value {} must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value {} must be a string."]
            });
            byteArrayDeserializeWithStrictTypeCheckingTest({
                value: "AAECAwQ=",
                expectedResult: new Buffer([0, 1, 2, 3, 4])
            });
        });
        describe("without strict type-checking", function () {
            function byteArrayDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: byteArraySpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            byteArrayDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a string."]
            });
            byteArrayDeserializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a string."]
            });
            byteArrayDeserializeWithoutStrictTypeCheckingTest({
                value: {},
                expectedResult: {},
                expectedLogs: ["WARNING: Property a.property.path with value {} should be a string."]
            });
            byteArrayDeserializeWithoutStrictTypeCheckingTest({
                value: "AAECAwQ=",
                expectedResult: new Buffer([0, 1, 2, 3, 4])
            });
        });
    });
});
//# sourceMappingURL=byteArraySpecTests.js.map