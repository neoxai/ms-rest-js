"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var uuidSpec_1 = require("../../../lib/serialization/uuidSpec");
var specTest_1 = require("./specTest");
describe("uuidSpec", function () {
    it("should have \"UUID\" for its typeName property", function () {
        assert.strictEqual("UUID", uuidSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function uuidSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: uuidSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            uuidSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a UUID string."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a UUID string."]
            });
            uuidSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a UUID string."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a UUID string."]
            });
            uuidSerializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be a UUID string."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be a UUID string."]
            });
            uuidSerializeWithStrictTypeCheckingTest({
                value: "abc",
                expectedResult: new Error("Property a.property.path with value \"abc\" must be a UUID string."),
                expectedLogs: ["ERROR: Property a.property.path with value \"abc\" must be a UUID string."]
            });
            uuidSerializeWithStrictTypeCheckingTest({
                value: "123e4567-e89b-12d3-a456-426655440000",
                expectedResult: "123e4567-e89b-12d3-a456-426655440000"
            });
        });
        describe("without strict type-checking", function () {
            function uuidSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: uuidSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            uuidSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a UUID string."]
            });
            uuidSerializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a UUID string."]
            });
            uuidSerializeWithoutStrictTypeCheckingTest({
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be a UUID string."]
            });
            uuidSerializeWithoutStrictTypeCheckingTest({
                value: "abc",
                expectedResult: "abc",
                expectedLogs: ["WARNING: Property a.property.path with value \"abc\" should be a UUID string."]
            });
            uuidSerializeWithoutStrictTypeCheckingTest({
                value: "123e4567-e89b-12d3-a456-426655440000",
                expectedResult: "123e4567-e89b-12d3-a456-426655440000"
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function uuidDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: uuidSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            uuidDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a UUID string."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a UUID string."]
            });
            uuidDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a UUID string."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a UUID string."]
            });
            uuidDeserializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be a UUID string."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be a UUID string."]
            });
            uuidDeserializeWithStrictTypeCheckingTest({
                value: "abc",
                expectedResult: new Error("Property a.property.path with value \"abc\" must be a UUID string."),
                expectedLogs: ["ERROR: Property a.property.path with value \"abc\" must be a UUID string."]
            });
            uuidDeserializeWithStrictTypeCheckingTest({
                value: "123e4567-e89b-12d3-a456-426655440000",
                expectedResult: "123e4567-e89b-12d3-a456-426655440000"
            });
        });
        describe("without strict type-checking", function () {
            function uuidDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: uuidSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            uuidDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a UUID string."]
            });
            uuidDeserializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a UUID string."]
            });
            uuidDeserializeWithoutStrictTypeCheckingTest({
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be a UUID string."]
            });
            uuidDeserializeWithoutStrictTypeCheckingTest({
                value: "abc",
                expectedResult: "abc",
                expectedLogs: ["WARNING: Property a.property.path with value \"abc\" should be a UUID string."]
            });
            uuidDeserializeWithoutStrictTypeCheckingTest({
                value: "123e4567-e89b-12d3-a456-426655440000",
                expectedResult: "123e4567-e89b-12d3-a456-426655440000"
            });
        });
    });
});
//# sourceMappingURL=uuidSpecTests.js.map