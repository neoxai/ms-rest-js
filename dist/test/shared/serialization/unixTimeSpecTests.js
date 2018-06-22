"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var unixTimeSpec_1 = require("../../../lib/serialization/unixTimeSpec");
var specTest_1 = require("./specTest");
describe("unixTimeSpec", function () {
    it("should have \"UnixTime\" for its typeName property", function () {
        assert.strictEqual("UnixTime", unixTimeSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function unixTimeSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: unixTimeSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            unixTimeSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an instanceof Date or a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            unixTimeSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an instanceof Date or a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            unixTimeSerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be an instanceof Date or a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            unixTimeSerializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be an instanceof Date or a string in ISO8601 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            unixTimeSerializeWithStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: 1317826080
            });
            unixTimeSerializeWithStrictTypeCheckingTest({
                value: new Date("2011-10-05T14:48:00.000Z"),
                expectedResult: 1317826080
            });
        });
        describe("with strict type-checking", function () {
            function unixTimeSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: unixTimeSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            unixTimeSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            unixTimeSerializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            unixTimeSerializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            unixTimeSerializeWithoutStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be an instanceof Date or a string in ISO8601 DateTime format."]
            });
            unixTimeSerializeWithoutStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: 1317826080
            });
            unixTimeSerializeWithoutStrictTypeCheckingTest({
                value: new Date("2011-10-05T14:48:00.000Z"),
                expectedResult: 1317826080
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function unixTimeDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: unixTimeSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            unixTimeDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a unix time number."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a unix time number."]
            });
            unixTimeDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a unix time number."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a unix time number."]
            });
            unixTimeDeserializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be a unix time number."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be a unix time number."]
            });
            unixTimeDeserializeWithStrictTypeCheckingTest({
                value: 1317826080,
                expectedResult: new Date("2011-10-05T14:48:00.000Z")
            });
        });
        describe("with strict type-checking", function () {
            function unixTimeDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: unixTimeSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            unixTimeDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a unix time number."]
            });
            unixTimeDeserializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a unix time number."]
            });
            unixTimeDeserializeWithoutStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be a unix time number."]
            });
            unixTimeDeserializeWithoutStrictTypeCheckingTest({
                value: 1317826080,
                expectedResult: new Date("2011-10-05T14:48:00.000Z")
            });
        });
    });
});
//# sourceMappingURL=unixTimeSpecTests.js.map