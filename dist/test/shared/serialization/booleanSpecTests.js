"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var booleanSpec_1 = require("../../../lib/serialization/booleanSpec");
var specTest_1 = require("./specTest");
describe("booleanSpec", function () {
    it("should have \"boolean\" for its typeName property", function () {
        assert.strictEqual("boolean", booleanSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function booleanSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: booleanSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            booleanSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a boolean."]
            });
            booleanSerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a boolean."]
            });
            booleanSerializeWithStrictTypeCheckingTest({
                value: "true",
                expectedResult: new Error("Property a.property.path with value \"true\" must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path with value \"true\" must be a boolean."]
            });
            booleanSerializeWithStrictTypeCheckingTest({
                value: "false",
                expectedResult: new Error("Property a.property.path with value \"false\" must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path with value \"false\" must be a boolean."]
            });
            booleanSerializeWithStrictTypeCheckingTest({
                value: true,
                expectedResult: true
            });
            booleanSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: false
            });
        });
        describe("without strict type-checking", function () {
            function booleanSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: booleanSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            booleanSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a boolean."]
            });
            booleanSerializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a boolean."]
            });
            booleanSerializeWithoutStrictTypeCheckingTest({
                value: "true",
                expectedResult: "true",
                expectedLogs: ["WARNING: Property a.property.path with value \"true\" should be a boolean."]
            });
            booleanSerializeWithoutStrictTypeCheckingTest({
                value: "false",
                expectedResult: "false",
                expectedLogs: ["WARNING: Property a.property.path with value \"false\" should be a boolean."]
            });
            booleanSerializeWithoutStrictTypeCheckingTest({
                value: true,
                expectedResult: true
            });
            booleanSerializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function booleanDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: booleanSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            booleanDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a boolean."]
            });
            booleanDeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a boolean."]
            });
            booleanDeserializeWithStrictTypeCheckingTest({
                value: "true",
                expectedResult: new Error("Property a.property.path with value \"true\" must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path with value \"true\" must be a boolean."]
            });
            booleanDeserializeWithStrictTypeCheckingTest({
                value: "false",
                expectedResult: new Error("Property a.property.path with value \"false\" must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path with value \"false\" must be a boolean."]
            });
            booleanDeserializeWithStrictTypeCheckingTest({
                value: true,
                expectedResult: true
            });
            booleanDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: false
            });
        });
        describe("without strict type-checking", function () {
            function booleanDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: booleanSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            booleanDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a boolean."]
            });
            booleanDeserializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a boolean."]
            });
            booleanDeserializeWithoutStrictTypeCheckingTest({
                value: "true",
                expectedResult: "true",
                expectedLogs: ["WARNING: Property a.property.path with value \"true\" should be a boolean."]
            });
            booleanDeserializeWithoutStrictTypeCheckingTest({
                value: "false",
                expectedResult: "false",
                expectedLogs: ["WARNING: Property a.property.path with value \"false\" should be a boolean."]
            });
            booleanDeserializeWithoutStrictTypeCheckingTest({
                value: true,
                expectedResult: true
            });
            booleanDeserializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false
            });
        });
    });
});
//# sourceMappingURL=booleanSpecTests.js.map