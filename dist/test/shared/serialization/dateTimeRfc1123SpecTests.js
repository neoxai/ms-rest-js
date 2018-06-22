"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var dateTimeRfc1123Spec_1 = require("../../../lib/serialization/dateTimeRfc1123Spec");
var specTest_1 = require("./specTest");
describe("dateTimeRfc1123Spec", function () {
    it("should have \"DateTimeRFC1123\" for its typeName property", function () {
        assert.strictEqual("DateTimeRFC1123", dateTimeRfc1123Spec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function dateTimeRfc1123SerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: dateTimeRfc1123Spec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an instanceof Date or a string in RFC1123 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an instanceof Date or a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an instanceof Date or a string in RFC1123 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an instanceof Date or a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be an instanceof Date or a string in RFC1123 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be an instanceof Date or a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be an instanceof Date or a string in RFC1123 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be an instanceof Date or a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: "Wed, 05 Oct 2011 14:48:00 GMT"
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: new Date("2011-10-05T14:48:00.000Z"),
                expectedResult: "Wed, 05 Oct 2011 14:48:00 GMT"
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: "Wed, 05 Oct 2011 14:48:00 GMT",
                expectedResult: "Wed, 05 Oct 2011 14:48:00 GMT"
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: new Date("Wed, 05 Oct 2011 14:48:00 GMT"),
                expectedResult: "Wed, 05 Oct 2011 14:48:00 GMT"
            });
        });
        describe("without strict type-checking", function () {
            function dateTimeRfc1123SerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: dateTimeRfc1123Spec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an instanceof Date or a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an instanceof Date or a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be an instanceof Date or a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be an instanceof Date or a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: "2011-10-05T14:48:00.000Z",
                expectedResult: "Wed, 05 Oct 2011 14:48:00 GMT"
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: new Date("2011-10-05T14:48:00.000Z"),
                expectedResult: "Wed, 05 Oct 2011 14:48:00 GMT"
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: "Wed, 05 Oct 2011 14:48:00 GMT",
                expectedResult: "Wed, 05 Oct 2011 14:48:00 GMT"
            });
            dateTimeRfc1123SerializeWithStrictTypeCheckingTest({
                value: new Date("Wed, 05 Oct 2011 14:48:00 GMT"),
                expectedResult: "Wed, 05 Oct 2011 14:48:00 GMT"
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function dateTimeRfc1123DeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: dateTimeRfc1123Spec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a string in RFC1123 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a string in RFC1123 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a string in RFC1123 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be a string in RFC1123 DateTime format."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: "Wed, 05 Oct 2011 14:48:00 GMT",
                expectedResult: new Date("2011-10-05T14:48:00.000Z")
            });
        });
        describe("without strict type-checking", function () {
            function dateTimeRfc1123DeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: dateTimeRfc1123Spec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be a string in RFC1123 DateTime format."]
            });
            dateTimeRfc1123DeserializeWithStrictTypeCheckingTest({
                value: "Wed, 05 Oct 2011 14:48:00 GMT",
                expectedResult: new Date("2011-10-05T14:48:00.000Z")
            });
        });
    });
});
//# sourceMappingURL=dateTimeRfc1123SpecTests.js.map