"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var stringSpec_1 = require("../../../lib/serialization/stringSpec");
var specTest_1 = require("./specTest");
describe("stringSpec", function () {
    it("should have \"string\" for its typeName property", function () {
        assert.strictEqual("string", stringSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function stringSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: stringSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            stringSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a string."]
            });
            stringSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a string."]
            });
            stringSerializeWithStrictTypeCheckingTest({
                value: "abc",
                expectedResult: "abc"
            });
        });
        describe("without strict type-checking", function () {
            function stringSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: stringSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            stringSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a string."]
            });
            stringSerializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a string."]
            });
            stringSerializeWithoutStrictTypeCheckingTest({
                value: "abc",
                expectedResult: "abc"
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function stringDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: stringSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            stringDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a string."]
            });
            stringDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a string."]
            });
            stringDeserializeWithStrictTypeCheckingTest({
                value: "abc",
                expectedResult: "abc"
            });
        });
        describe("without strict type-checking", function () {
            function stringDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: stringSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            stringDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a string."]
            });
            stringDeserializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a string."]
            });
            stringDeserializeWithoutStrictTypeCheckingTest({
                value: "abc",
                expectedResult: "abc"
            });
        });
    });
});
//# sourceMappingURL=stringSpecTests.js.map