"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var dictionarySpec_1 = require("../../../lib/serialization/dictionarySpec");
var numberSpec_1 = require("../../../lib/serialization/numberSpec");
var specTest_1 = require("./specTest");
var msRest_1 = require("../../../lib/msRest");
describe("dictionarySpec", function () {
    it("should have \"Dictionary<T>\" for its specType property", function () {
        assert.strictEqual("Dictionary", dictionarySpec_1.dictionarySpec(numberSpec_1.default).specType);
    });
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function dictionarySerializeWithStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.serializationStrictTypeChecking = true;
                specTest_1.serializeTest({
                    testName: args.testName,
                    typeSpec: dictionarySpec_1.dictionarySpec(args.valueSpec),
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dictionarySerializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an object."]
            });
            dictionarySerializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an object."]
            });
            dictionarySerializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be an object."]
            });
            dictionarySerializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: {},
                expectedResult: {}
            });
            dictionarySerializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: { "9": "9" },
                expectedResult: new Error("Property a.property.path.9 with value \"9\" must be a number."),
                expectedLogs: ["ERROR: Property a.property.path.9 with value \"9\" must be a number."]
            });
            dictionarySerializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: { "1": 1, "2": 2 },
                expectedResult: { "1": 1, "2": 2 }
            });
            dictionarySerializeWithStrictTypeCheckingTest({
                valueSpec: "CompositeRef",
                value: {
                    "A": {
                        "b": "B"
                    }
                },
                options: {
                    compositeSpecDictionary: {
                        "CompositeRef": msRest_1.compositeSpec({
                            typeName: "CompositeRef",
                            propertySpecs: {
                                "b": {
                                    valueSpec: msRest_1.stringSpec
                                }
                            }
                        })
                    }
                },
                expectedResult: {
                    "A": {
                        "b": "B"
                    }
                }
            });
            dictionarySerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                valueSpec: "NotFound",
                value: {
                    "A": "B doesn't exist in the composite TypeSpec dictionary"
                },
                options: {
                    compositeSpecDictionary: {}
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."]
            });
        });
        describe("without strict type-checking", function () {
            function dictionarySerializeWithoutStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.serializationStrictTypeChecking = false;
                specTest_1.serializeTest({
                    testName: args.testName,
                    typeSpec: dictionarySpec_1.dictionarySpec(args.valueSpec),
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dictionarySerializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an object."]
            });
            dictionarySerializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an object."]
            });
            dictionarySerializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be an object."]
            });
            dictionarySerializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: {},
                expectedResult: {}
            });
            dictionarySerializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: { "9": "9" },
                expectedResult: { "9": "9" },
                expectedLogs: ["WARNING: Property a.property.path.9 with value \"9\" should be a number."]
            });
            dictionarySerializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: { "1": 1, "2": 2 },
                expectedResult: { "1": 1, "2": 2 }
            });
            dictionarySerializeWithoutStrictTypeCheckingTest({
                valueSpec: "CompositeRef",
                value: {
                    "A": {
                        "b": "B"
                    }
                },
                options: {
                    compositeSpecDictionary: {
                        "CompositeRef": msRest_1.compositeSpec({
                            typeName: "CompositeRef",
                            propertySpecs: {
                                "b": {
                                    valueSpec: msRest_1.stringSpec
                                }
                            }
                        })
                    }
                },
                expectedResult: {
                    "A": {
                        "b": "B"
                    }
                }
            });
            dictionarySerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                valueSpec: "NotFound",
                value: {
                    "A": "B doesn't exist in the composite TypeSpec dictionary"
                },
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
            function dictionaryDeserializeWithStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.deserializationStrictTypeChecking = true;
                specTest_1.deserializeTest({
                    testName: args.testName,
                    typeSpec: dictionarySpec_1.dictionarySpec(args.valueSpec),
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dictionaryDeserializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an object."]
            });
            dictionaryDeserializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an object."]
            });
            dictionaryDeserializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be an object."]
            });
            dictionaryDeserializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: {},
                expectedResult: {}
            });
            dictionaryDeserializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: { "9": "9" },
                expectedResult: new Error("Property a.property.path.9 with value \"9\" must be a number."),
                expectedLogs: ["ERROR: Property a.property.path.9 with value \"9\" must be a number."]
            });
            dictionaryDeserializeWithStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: { "1": 1, "2": 2 },
                expectedResult: { "1": 1, "2": 2 }
            });
            dictionaryDeserializeWithStrictTypeCheckingTest({
                valueSpec: "CompositeRef",
                value: {
                    "A": {
                        "b": "B"
                    }
                },
                options: {
                    compositeSpecDictionary: {
                        "CompositeRef": msRest_1.compositeSpec({
                            typeName: "CompositeRef",
                            propertySpecs: {
                                "b": {
                                    valueSpec: msRest_1.stringSpec
                                }
                            }
                        })
                    }
                },
                expectedResult: {
                    "A": {
                        "b": "B"
                    }
                }
            });
            dictionaryDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                valueSpec: "NotFound",
                value: {
                    "A": "B doesn't exist in the composite TypeSpec dictionary"
                },
                options: {
                    compositeSpecDictionary: {}
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."]
            });
        });
        describe("without strict type-checking", function () {
            function dictionaryDeserializeWithoutStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.deserializationStrictTypeChecking = false;
                specTest_1.deserializeTest({
                    testName: args.testName,
                    typeSpec: dictionarySpec_1.dictionarySpec(args.valueSpec),
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            dictionaryDeserializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an object."]
            });
            dictionaryDeserializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an object."]
            });
            dictionaryDeserializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be an object."]
            });
            dictionaryDeserializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: {},
                expectedResult: {}
            });
            dictionaryDeserializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: { "9": "9" },
                expectedResult: { "9": "9" },
                expectedLogs: ["WARNING: Property a.property.path.9 with value \"9\" should be a number."]
            });
            dictionaryDeserializeWithoutStrictTypeCheckingTest({
                valueSpec: numberSpec_1.default,
                value: { "1": 1, "2": 2 },
                expectedResult: { "1": 1, "2": 2 }
            });
            dictionaryDeserializeWithoutStrictTypeCheckingTest({
                valueSpec: "CompositeRef",
                value: {
                    "A": {
                        "b": "B"
                    }
                },
                options: {
                    compositeSpecDictionary: {
                        "CompositeRef": msRest_1.compositeSpec({
                            typeName: "CompositeRef",
                            propertySpecs: {
                                "b": {
                                    valueSpec: msRest_1.stringSpec
                                }
                            }
                        })
                    }
                },
                expectedResult: {
                    "A": {
                        "b": "B"
                    }
                }
            });
            dictionaryDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                valueSpec: "NotFound",
                value: {
                    "A": "B doesn't exist in the composite TypeSpec dictionary"
                },
                options: {
                    compositeSpecDictionary: {}
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"NotFound\" at a.property.path."]
            });
        });
    });
});
//# sourceMappingURL=dictionarySpecTests.js.map