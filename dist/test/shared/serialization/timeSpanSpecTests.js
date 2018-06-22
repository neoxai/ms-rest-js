"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var moment = require("moment");
var timeSpanSpec_1 = require("../../../lib/serialization/timeSpanSpec");
var specTest_1 = require("./specTest");
describe("timeSpanSpec", function () {
    it("should have \"TimeSpan\" for its typeName property", function () {
        assert.strictEqual("TimeSpan", timeSpanSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function timeSpanSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: timeSpanSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            timeSpanSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a TimeSpan/Duration."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a TimeSpan/Duration."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a TimeSpan/Duration."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be a TimeSpan/Duration."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithStrictTypeCheckingTest({
                value: "P123DT22H14M12.011S",
                expectedResult: new Error("Property a.property.path with value \"P123DT22H14M12.011S\" must be a TimeSpan/Duration."),
                expectedLogs: ["ERROR: Property a.property.path with value \"P123DT22H14M12.011S\" must be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithStrictTypeCheckingTest({
                value: moment.duration({ days: 123, hours: 22, minutes: 14, seconds: 12, milliseconds: 11 }),
                expectedResult: "P123DT22H14M12.011S"
            });
        });
        describe("without strict type-checking", function () {
            function timeSpanSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: timeSpanSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            timeSpanSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithoutStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithoutStrictTypeCheckingTest({
                value: "P123DT22H14M12.011S",
                expectedResult: "P123DT22H14M12.011S",
                expectedLogs: ["WARNING: Property a.property.path with value \"P123DT22H14M12.011S\" should be a TimeSpan/Duration."]
            });
            timeSpanSerializeWithoutStrictTypeCheckingTest({
                value: moment.duration({ days: 123, hours: 22, minutes: 14, seconds: 12, milliseconds: 11 }),
                expectedResult: "P123DT22H14M12.011S"
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function timeSpanDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: timeSpanSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            timeSpanDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an ISO8601 TimeSpan/Duration string."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an ISO8601 TimeSpan/Duration string."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be an ISO8601 TimeSpan/Duration string."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: new Error("Property a.property.path with value \"hello world!\" must be an ISO8601 TimeSpan/Duration string."),
                expectedLogs: ["ERROR: Property a.property.path with value \"hello world!\" must be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithStrictTypeCheckingTest({
                value: moment.duration({ days: 123, hours: 22, minutes: 14, seconds: 12, milliseconds: 11 }),
                expectedResult: new Error("Property a.property.path with value \"P123DT22H14M12.011S\" must be an ISO8601 TimeSpan/Duration string."),
                expectedLogs: ["ERROR: Property a.property.path with value \"P123DT22H14M12.011S\" must be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithStrictTypeCheckingTest({
                value: "P123DT22H14M12.011S",
                expectedResult: moment.duration({ days: 123, hours: 22, minutes: 14, seconds: 12, milliseconds: 11 })
            });
        });
        describe("without strict type-checking", function () {
            function timeSpanDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: timeSpanSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            timeSpanDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithoutStrictTypeCheckingTest({
                value: "hello world!",
                expectedResult: "hello world!",
                expectedLogs: ["WARNING: Property a.property.path with value \"hello world!\" should be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithoutStrictTypeCheckingTest({
                value: moment.duration({ days: 123, hours: 22, minutes: 14, seconds: 12, milliseconds: 11 }),
                expectedResult: moment.duration({ days: 123, hours: 22, minutes: 14, seconds: 12, milliseconds: 11 }),
                expectedLogs: ["WARNING: Property a.property.path with value \"P123DT22H14M12.011S\" should be an ISO8601 TimeSpan/Duration string."]
            });
            timeSpanDeserializeWithoutStrictTypeCheckingTest({
                value: "P123DT22H14M12.011S",
                expectedResult: moment.duration({ days: 123, hours: 22, minutes: 14, seconds: 12, milliseconds: 11 })
            });
        });
    });
});
//# sourceMappingURL=timeSpanSpecTests.js.map