"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var sequenceSpec_1 = require("../../../lib/serialization/sequenceSpec");
var stringSpec_1 = require("../../../lib/serialization/stringSpec");
var specTest_1 = require("./specTest");
var compositeSpec_1 = require("../../../lib/serialization/compositeSpec");
describe("sequenceSpec", function () {
    it("should have \"Sequence\" for its specType property", function () {
        assert.strictEqual("Sequence", sequenceSpec_1.sequenceSpec(stringSpec_1.default).specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function sequenceSerializeWithStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.serializationStrictTypeChecking = true;
                specTest_1.serializeTest({
                    testName: args.testName,
                    typeSpec: sequenceSpec_1.sequenceSpec(args.elementSpec),
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            sequenceSerializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an Array."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an Array."]
            });
            sequenceSerializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an Array."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an Array."]
            });
            sequenceSerializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: {},
                expectedResult: new Error("Property a.property.path with value {} must be an Array."),
                expectedLogs: ["ERROR: Property a.property.path with value {} must be an Array."]
            });
            sequenceSerializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: [],
                expectedResult: []
            });
            sequenceSerializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: [9],
                expectedResult: new Error("Property a.property.path.0 with value 9 must be a string."),
                expectedLogs: ["ERROR: Property a.property.path.0 with value 9 must be a string."]
            });
            sequenceSerializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: ["9"],
                expectedResult: ["9"]
            });
            sequenceSerializeWithStrictTypeCheckingTest({
                elementSpec: "CompositeRef",
                value: [{ "b": "B" }],
                options: {
                    compositeSpecDictionary: {
                        "CompositeRef": compositeSpec_1.compositeSpec({
                            typeName: "CompositeRef",
                            propertySpecs: {
                                "b": {
                                    valueSpec: stringSpec_1.default
                                }
                            }
                        })
                    }
                },
                expectedResult: [{ "b": "B" }]
            });
            sequenceSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                elementSpec: "NotFound",
                value: [{ "A": "B doesn't exist in the composite TypeSpec dictionary" }],
                options: {
                    compositeSpecDictionary: {}
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."]
            });
        });
        describe("without strict type-checking", function () {
            function sequenceSerializeWithoutStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.serializationStrictTypeChecking = false;
                specTest_1.serializeTest({
                    testName: args.testName,
                    typeSpec: sequenceSpec_1.sequenceSpec(args.elementSpec),
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            sequenceSerializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an Array."]
            });
            sequenceSerializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an Array."]
            });
            sequenceSerializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: {},
                expectedResult: {},
                expectedLogs: ["WARNING: Property a.property.path with value {} should be an Array."]
            });
            sequenceSerializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: [],
                expectedResult: []
            });
            sequenceSerializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: [9],
                expectedResult: [9],
                expectedLogs: ["WARNING: Property a.property.path.0 with value 9 should be a string."]
            });
            sequenceSerializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: ["9"],
                expectedResult: ["9"]
            });
            sequenceSerializeWithoutStrictTypeCheckingTest({
                elementSpec: "CompositeRef",
                value: [{ "b": "B" }],
                options: {
                    compositeSpecDictionary: {
                        "CompositeRef": compositeSpec_1.compositeSpec({
                            typeName: "CompositeRef",
                            propertySpecs: {
                                "b": {
                                    valueSpec: stringSpec_1.default
                                }
                            }
                        })
                    }
                },
                expectedResult: [{ "b": "B" }]
            });
            sequenceSerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                elementSpec: "NotFound",
                value: [{ "A": "B doesn't exist in the composite TypeSpec dictionary" }],
                options: {
                    compositeSpecDictionary: {}
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."]
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function sequenceDeserializeWithStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.deserializationStrictTypeChecking = true;
                specTest_1.deserializeTest({
                    testName: args.testName,
                    typeSpec: sequenceSpec_1.sequenceSpec(args.elementSpec),
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            sequenceDeserializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an Array."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an Array."]
            });
            sequenceDeserializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an Array."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an Array."]
            });
            sequenceDeserializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: {},
                expectedResult: new Error("Property a.property.path with value {} must be an Array."),
                expectedLogs: ["ERROR: Property a.property.path with value {} must be an Array."]
            });
            sequenceDeserializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: [],
                expectedResult: []
            });
            sequenceDeserializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: [9],
                expectedResult: new Error("Property a.property.path.0 with value 9 must be a string."),
                expectedLogs: ["ERROR: Property a.property.path.0 with value 9 must be a string."]
            });
            sequenceDeserializeWithStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: ["9"],
                expectedResult: ["9"]
            });
            sequenceDeserializeWithStrictTypeCheckingTest({
                elementSpec: "CompositeRef",
                value: [{ "b": "B" }],
                options: {
                    compositeSpecDictionary: {
                        "CompositeRef": compositeSpec_1.compositeSpec({
                            typeName: "CompositeRef",
                            propertySpecs: {
                                "b": {
                                    valueSpec: stringSpec_1.default
                                }
                            }
                        })
                    }
                },
                expectedResult: [{ "b": "B" }]
            });
            sequenceDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                elementSpec: "NotFound",
                value: [{ "A": "B doesn't exist in the composite TypeSpec dictionary" }],
                options: {
                    compositeSpecDictionary: {}
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."]
            });
        });
        describe("without strict type-checking", function () {
            function sequenceDeserializeWithoutStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.deserializationStrictTypeChecking = false;
                specTest_1.deserializeTest({
                    testName: args.testName,
                    typeSpec: sequenceSpec_1.sequenceSpec(args.elementSpec),
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            sequenceDeserializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an Array."]
            });
            sequenceDeserializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an Array."]
            });
            sequenceDeserializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: {},
                expectedResult: {},
                expectedLogs: ["WARNING: Property a.property.path with value {} should be an Array."]
            });
            sequenceDeserializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: [],
                expectedResult: []
            });
            sequenceDeserializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: [9],
                expectedResult: [9],
                expectedLogs: ["WARNING: Property a.property.path.0 with value 9 should be a string."]
            });
            sequenceDeserializeWithoutStrictTypeCheckingTest({
                elementSpec: stringSpec_1.default,
                value: ["9"],
                expectedResult: ["9"]
            });
            sequenceDeserializeWithoutStrictTypeCheckingTest({
                elementSpec: "CompositeRef",
                value: [{ "b": "B" }],
                options: {
                    compositeSpecDictionary: {
                        "CompositeRef": compositeSpec_1.compositeSpec({
                            typeName: "CompositeRef",
                            propertySpecs: {
                                "b": {
                                    valueSpec: stringSpec_1.default
                                }
                            }
                        })
                    }
                },
                expectedResult: [{ "b": "B" }]
            });
            sequenceDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                elementSpec: "NotFound",
                value: [{ "A": "B doesn't exist in the composite TypeSpec dictionary" }],
                options: {
                    compositeSpecDictionary: {}
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."]
            });
        });
    });
});
//# sourceMappingURL=sequenceSpecTests.js.map