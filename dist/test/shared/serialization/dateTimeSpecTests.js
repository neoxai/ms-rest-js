"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var dateTimeSpec_1 = require("../../../lib/serialization/dateTimeSpec");
var specTest_1 = require("./specTest");
describe("dateTimeSpec", function () {
    it("should have \"DateTime\" for its typeName property", function () {
        assert.strictEqual("DateTime", dateTimeSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function dateTimeSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: dateTimeSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateTimeSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an instanceof Date or a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            dateTimeSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an instanceof Date or a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            dateTimeSerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be an instanceof Date or a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            dateTimeSerializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be an instanceof Date or a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            dateTimeSerializeWithStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: "2011-10-05T14:48:00.000Z"
            });
            dateTimeSerializeWithStrictTypeCheckingTest({
                value: new Date("2011-10-05T14:48:00.000Z"),
                expectedResult: "2011-10-05T14:48:00.000Z"
            });
        });
        describe("without strict type-checking", function () {
            function dateTimeSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: dateTimeSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateTimeSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            dateTimeSerializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            dateTimeSerializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            dateTimeSerializeWithoutStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            dateTimeSerializeWithoutStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: "2011-10-05T14:48:00.000Z"
            });
            dateTimeSerializeWithoutStrictTypeCheckingTest({
                value: new Date("2011-10-05T14:48:00.000Z"),
                expectedResult: "2011-10-05T14:48:00.000Z"
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function dateTimeDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: dateTimeSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateTimeDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a string in ISO8601 DateTime format."]
            });
            dateTimeDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a string in ISO8601 DateTime format."]
            });
            dateTimeDeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a string in ISO8601 DateTime format."]
            });
            dateTimeDeserializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be a string in ISO8601 DateTime format."]
            });
            dateTimeDeserializeWithStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: new Date("2011-10-05T14:48:00.000Z")
            });
        });
        describe("without strict type-checking", function () {
            function dateTimeDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: dateTimeSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateTimeDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a string in ISO8601 DateTime format."]
            });
            dateTimeDeserializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a string in ISO8601 DateTime format."]
            });
            dateTimeDeserializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a string in ISO8601 DateTime format."]
            });
            dateTimeDeserializeWithoutStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be a string in ISO8601 DateTime format."]
            });
            dateTimeDeserializeWithoutStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: new Date("2011-10-05T14:48:00.000Z")
            });
        });
    });
});
//# sourceMappingURL=dateTimeSpecTests.js.map