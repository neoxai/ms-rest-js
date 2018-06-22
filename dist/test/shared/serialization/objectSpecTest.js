"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var objectSpec_1 = require("../../../lib/serialization/objectSpec");
var specTest_1 = require("./specTest");
describe("objectSpec", function () {
    it("should have \"object\" for its typeName property", function () {
        assert.strictEqual("object", objectSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function objectSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: objectSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            objectSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an object."]
            });
            objectSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an object."]
            });
            objectSerializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be an object."]
            });
            objectSerializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: {}
            });
        });
        describe("without strict type-checking", function () {
            function objectSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: objectSpec_1.default,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            objectSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an object."]
            });
            objectSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an object."]
            });
            objectSerializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be an object."]
            });
            objectSerializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: {}
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function objectDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: objectSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            objectDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an object."]
            });
            objectDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an object."]
            });
            objectDeserializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be an object."]
            });
            objectDeserializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: {}
            });
        });
        describe("without strict type-checking", function () {
            function objectDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: objectSpec_1.default,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            objectDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an object."]
            });
            objectDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an object."]
            });
            objectDeserializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be an object."]
            });
            objectDeserializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: {}
            });
        });
    });
});
//# sourceMappingURL=objectSpecTest.js.map