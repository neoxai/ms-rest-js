"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var numberSpec_1 = require("../../../lib/serialization/numberSpec");
var specTest_1 = require("./specTest");
describe("numberSpec", function () {
    it("should have \"number\" for its typeName property", function () {
        assert.strictEqual("number", numberSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function numberSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: numberSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            numberSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a number."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a number."]
            });
            numberSerializeWithStrictTypeCheckingTest({
                value: "",
                expectedResult: new Error("Property a.property.path with value \"\" must be a number."),
                expectedLogs: ["ERROR: Property a.property.path with value \"\" must be a number."]
            });
            numberSerializeWithStrictTypeCheckingTest({
                value: 12,
                expectedResult: 12
            });
        });
        describe("without strict type-checking", function () {
            function numberSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: numberSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            numberSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a number."]
            });
            numberSerializeWithoutStrictTypeCheckingTest({
                value: "",
                expectedResult: "",
                expectedLogs: ["WARNING: Property a.property.path with value \"\" should be a number."]
            });
            numberSerializeWithoutStrictTypeCheckingTest({
                value: 12,
                expectedResult: 12
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function numberDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: numberSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            numberDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a number."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a number."]
            });
            numberDeserializeWithStrictTypeCheckingTest({
                value: "",
                expectedResult: new Error("Property a.property.path with value \"\" must be a number."),
                expectedLogs: ["ERROR: Property a.property.path with value \"\" must be a number."]
            });
            numberDeserializeWithStrictTypeCheckingTest({
                value: 12,
                expectedResult: 12
            });
        });
        describe("without strict type-checking", function () {
            function numberDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: numberSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            numberDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a number."]
            });
            numberDeserializeWithoutStrictTypeCheckingTest({
                value: "",
                expectedResult: "",
                expectedLogs: ["WARNING: Property a.property.path with value \"\" should be a number."]
            });
            numberDeserializeWithoutStrictTypeCheckingTest({
                value: 12,
                expectedResult: 12
            });
        });
    });
});
//# sourceMappingURL=numberSpecTests.js.map