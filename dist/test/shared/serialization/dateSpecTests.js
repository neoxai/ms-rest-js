"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var dateSpec_1 = require("../../../lib/serialization/dateSpec");
var specTest_1 = require("./specTest");
describe("dateSpec", function () {
    it("should have \"Date\" for its typeName property", function () {
        assert.strictEqual("Date", dateSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function dateSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: dateSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an instanceof Date or a string in ISO8601 Date format."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an instanceof Date or a string in ISO8601 Date format."]
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an instanceof Date or a string in ISO8601 Date format."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an instanceof Date or a string in ISO8601 Date format."]
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be an instanceof Date or a string in ISO8601 Date format."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be an instanceof Date or a string in ISO8601 Date format."]
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be an instanceof Date or a string in ISO8601 Date format."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be an instanceof Date or a string in ISO8601 Date format."]
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: "2011-10-05"
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: new Date("2011-10-06T14:48:00.000Z"),
                expectedResult: "2011-10-06"
            });
        });
        describe("without strict type-checking", function () {
            function dateSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: dateSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an instanceof Date or a string in ISO8601 Date format."]
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an instanceof Date or a string in ISO8601 Date format."]
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be an instanceof Date or a string in ISO8601 Date format."]
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be an instanceof Date or a string in ISO8601 Date format."]
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: "2011-10-05"
            });
            dateSerializeWithStrictTypeCheckingTest({
                value: new Date("2011-10-06T14:48:00.000Z"),
                expectedResult: "2011-10-06"
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function dateDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: dateSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a string in ISO8601 Date format."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a string in ISO8601 Date format."]
            });
            dateDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a string in ISO8601 Date format."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a string in ISO8601 Date format."]
            });
            dateDeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a string in ISO8601 Date format."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a string in ISO8601 Date format."]
            });
            dateDeserializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be a string in ISO8601 Date format."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be a string in ISO8601 Date format."]
            });
            dateDeserializeWithStrictTypeCheckingTest({
                value: "2011-10-05",
                expectedResult: new Date("2011-10-05")
            });
        });
        describe("without strict type-checking", function () {
            function dateDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: dateSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a string in ISO8601 Date format."]
            });
            dateDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a string in ISO8601 Date format."]
            });
            dateDeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a string in ISO8601 Date format."]
            });
            dateDeserializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be a string in ISO8601 Date format."]
            });
            dateDeserializeWithStrictTypeCheckingTest({
                value: "2011-10-05",
                expectedResult: new Date("2011-10-05")
            });
        });
    });
});
//# sourceMappingURL=dateSpecTests.js.map