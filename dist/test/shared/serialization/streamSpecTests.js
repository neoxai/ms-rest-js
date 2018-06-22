"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var streamSpec_1 = require("../../../lib/serialization/streamSpec");
var specTest_1 = require("./specTest");
describe("objectSpec", function () {
    it("should have \"Stream\" for its typeName property", function () {
        assert.strictEqual("Stream", streamSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function streamSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: streamSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            streamSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a Stream."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a Stream."]
            });
            streamSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a Stream."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a Stream."]
            });
            streamSerializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: new Error("Property a.property.path with value {} must be a Stream."),
                expectedLogs: ["ERROR: Property a.property.path with value {} must be a Stream."]
            });
            streamSerializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be a Stream."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be a Stream."]
            });
        });
        describe("without strict type-checking", function () {
            function streamSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: streamSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            streamSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a Stream."]
            });
            streamSerializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a Stream."]
            });
            streamSerializeWithoutStrictTypeCheckingTest({
                value: {},
                expectedResult: {},
                expectedLogs: ["WARNING: Property a.property.path with value {} should be a Stream."]
            });
            streamSerializeWithoutStrictTypeCheckingTest({
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be a Stream."]
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function streamDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: streamSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            streamDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a Stream."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a Stream."]
            });
            streamDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be a Stream."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be a Stream."]
            });
            streamDeserializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: new Error("Property a.property.path with value {} must be a Stream."),
                expectedLogs: ["ERROR: Property a.property.path with value {} must be a Stream."]
            });
            streamDeserializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be a Stream."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be a Stream."]
            });
        });
        describe("without strict type-checking", function () {
            function streamDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: streamSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            streamDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a Stream."]
            });
            streamDeserializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be a Stream."]
            });
            streamDeserializeWithoutStrictTypeCheckingTest({
                value: {},
                expectedResult: {},
                expectedLogs: ["WARNING: Property a.property.path with value {} should be a Stream."]
            });
            streamDeserializeWithoutStrictTypeCheckingTest({
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be a Stream."]
            });
        });
    });
});
//# sourceMappingURL=streamSpecTests.js.map