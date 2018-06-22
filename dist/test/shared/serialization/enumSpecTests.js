"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var enumSpec_1 = require("../../../lib/serialization/enumSpec");
var specTest_1 = require("./specTest");
describe("enumSpec", function () {
    it("should have \"Enum\" for its specType property", function () {
        assert.strictEqual("Enum", enumSpec_1.enumSpec("Letters", []).specType);
    });
    it("should have the correct enumName property", function () {
        assert.strictEqual("Letters", enumSpec_1.enumSpec("Letters", []).enumName);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function enumSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: enumSpec_1.enumSpec("Letters", args.allowedValues),
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            enumSerializeWithStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be one of the enum allowed values: [\"a\",\"b\",\"c\"]."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be one of the enum allowed values: [\"a\",\"b\",\"c\"]."]
            });
            enumSerializeWithStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "",
                expectedResult: new Error("Property a.property.path with value \"\" must be one of the enum allowed values: [\"a\",\"b\",\"c\"]."),
                expectedLogs: ["ERROR: Property a.property.path with value \"\" must be one of the enum allowed values: [\"a\",\"b\",\"c\"]."]
            });
            enumSerializeWithStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "a",
                expectedResult: "a"
            });
            enumSerializeWithStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "A",
                expectedResult: "A"
            });
        });
        describe("without strict type-checking", function () {
            function enumSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: enumSpec_1.enumSpec("Letters", args.allowedValues),
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            enumSerializeWithoutStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be one of the enum allowed values: [\"a\",\"b\",\"c\"]."]
            });
            enumSerializeWithoutStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "",
                expectedResult: "",
                expectedLogs: ["WARNING: Property a.property.path with value \"\" should be one of the enum allowed values: [\"a\",\"b\",\"c\"]."]
            });
            enumSerializeWithoutStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "a",
                expectedResult: "a"
            });
            enumSerializeWithoutStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "A",
                expectedResult: "A"
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function enumDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: enumSpec_1.enumSpec("Letters", args.allowedValues),
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            enumDeserializeWithStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be one of the enum allowed values: [\"a\",\"b\",\"c\"]."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be one of the enum allowed values: [\"a\",\"b\",\"c\"]."]
            });
            enumDeserializeWithStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "",
                expectedResult: new Error("Property a.property.path with value \"\" must be one of the enum allowed values: [\"a\",\"b\",\"c\"]."),
                expectedLogs: ["ERROR: Property a.property.path with value \"\" must be one of the enum allowed values: [\"a\",\"b\",\"c\"]."]
            });
            enumDeserializeWithStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "a",
                expectedResult: "a"
            });
            enumDeserializeWithStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "A",
                expectedResult: "A"
            });
        });
        describe("without strict type-checking", function () {
            function enumDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: enumSpec_1.enumSpec("Letters", args.allowedValues),
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            enumDeserializeWithoutStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be one of the enum allowed values: [\"a\",\"b\",\"c\"]."]
            });
            enumDeserializeWithoutStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "",
                expectedResult: "",
                expectedLogs: ["WARNING: Property a.property.path with value \"\" should be one of the enum allowed values: [\"a\",\"b\",\"c\"]."]
            });
            enumDeserializeWithoutStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "a",
                expectedResult: "a"
            });
            enumDeserializeWithoutStrictTypeCheckingTest({
                allowedValues: ["a", "b", "c"],
                value: "A",
                expectedResult: "A"
            });
        });
    });
});
//# sourceMappingURL=enumSpecTests.js.map