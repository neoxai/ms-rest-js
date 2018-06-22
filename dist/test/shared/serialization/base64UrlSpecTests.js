"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var base64UrlSpec_1 = require("../../../lib/serialization/base64UrlSpec");
var specTest_1 = require("./specTest");
describe("base64UrlSpec", function () {
    it("should have \"Base64Url\" for its typeName property", function () {
        assert.strictEqual("Base64Url", base64UrlSpec_1.default.specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function base64UrlSerializeWithStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: base64UrlSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            base64UrlSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a Buffer."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a Buffer."]
            });
            base64UrlSerializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a Buffer."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a Buffer."]
            });
            base64UrlSerializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: new Error("Property a.property.path with value {} must be a Buffer."),
                expectedLogs: ["ERROR: Property a.property.path with value {} must be a Buffer."]
            });
            base64UrlSerializeWithStrictTypeCheckingTest({
                value: new Buffer([0, 1, 2, 3, 4]),
                expectedResult: "AAECAwQ"
            });
        });
        describe("without strict type-checking", function () {
            function base64UrlSerializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.serializeTest({
                    typeSpec: base64UrlSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        serializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            base64UrlSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a Buffer."]
            });
            base64UrlSerializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a Buffer."]
            });
            base64UrlSerializeWithoutStrictTypeCheckingTest({
                value: {},
                expectedResult: {},
                expectedLogs: ["WARNING: Property a.property.path with value {} should be a Buffer."]
            });
            base64UrlSerializeWithoutStrictTypeCheckingTest({
                value: new Buffer([0, 1, 2, 3, 4]),
                expectedResult: "AAECAwQ"
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function base64UrlDeserializeWithStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: base64UrlSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: true
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            base64UrlDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be a string."]
            });
            base64UrlDeserializeWithStrictTypeCheckingTest({
                value: 5,
                expectedResult: new Error("Property a.property.path with value 5 must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value 5 must be a string."]
            });
            base64UrlDeserializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: new Error("Property a.property.path with value {} must be a string."),
                expectedLogs: ["ERROR: Property a.property.path with value {} must be a string."]
            });
            base64UrlDeserializeWithStrictTypeCheckingTest({
                value: "AAECAwQ",
                expectedResult: new Buffer([0, 1, 2, 3, 4])
            });
        });
        describe("without strict type-checking", function () {
            function base64UrlDeserializeWithoutStrictTypeCheckingTest(args) {
                specTest_1.deserializeTest({
                    typeSpec: base64UrlSpec_1.default,
                    propertyPath: args.propertyPath,
                    options: {
                        deserializationStrictTypeChecking: false
                    },
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            base64UrlDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be a string."]
            });
            base64UrlDeserializeWithoutStrictTypeCheckingTest({
                value: 5,
                expectedResult: 5,
                expectedLogs: ["WARNING: Property a.property.path with value 5 should be a string."]
            });
            base64UrlDeserializeWithoutStrictTypeCheckingTest({
                value: {},
                expectedResult: {},
                expectedLogs: ["WARNING: Property a.property.path with value {} should be a string."]
            });
            base64UrlDeserializeWithoutStrictTypeCheckingTest({
                value: "AAECAwQ",
                expectedResult: new Buffer([0, 1, 2, 3, 4])
            });
        });
    });
});
//# sourceMappingURL=base64UrlSpecTests.js.map