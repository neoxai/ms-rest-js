"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var booleanSpec_1 = require("../../../lib/serialization/booleanSpec");
var compositeSpec_1 = require("../../../lib/serialization/compositeSpec");
var numberSpec_1 = require("../../../lib/serialization/numberSpec");
var sequenceSpec_1 = require("../../../lib/serialization/sequenceSpec");
var serializationOptions_1 = require("../../../lib/serialization/serializationOptions");
var stringSpec_1 = require("../../../lib/serialization/stringSpec");
var specTest_1 = require("./specTest");
describe("compositeSpec", function () {
    it("should have \"Composite\" for its specType property", function () {
        assert.strictEqual("Composite", compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: {} }).specType);
    });
    it("should have the correct typeName property", function () {
        assert.strictEqual("Spam", compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: {} }).typeName);
    });
    var jsonFlattenableType = compositeSpec_1.compositeSpec({
        typeName: "Spam",
        propertySpecs: {
            "a": {
                serializedName: "A.B.C",
                valueSpec: numberSpec_1.default
            },
            "b": {
                serializedName: "A.B.D",
                valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
            },
            "c": {
                serializedName: "A.E",
                valueSpec: stringSpec_1.default
            }
        }
    });
    var xmlFlattenableType = compositeSpec_1.compositeSpec({
        typeName: "Spam",
        propertySpecs: {
            "a": {
                xmlIsAttribute: true,
                xmlName: "A",
                valueSpec: numberSpec_1.default
            },
            "b": {
                xmlIsWrapped: true,
                xmlElementName: "bool",
                xmlName: "b.o.o.l.s",
                valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
            },
            "c": {
                xmlName: "A.E",
                valueSpec: stringSpec_1.default
            }
        }
    });
    var xmlWithWrappedSequence = compositeSpec_1.compositeSpec({
        typeName: "Spam",
        propertySpecs: {
            "a": {
                xmlIsAttribute: true,
                xmlName: "a",
                valueSpec: numberSpec_1.default
            },
            "b": {
                xmlIsWrapped: true,
                xmlElementName: "bool",
                xmlName: "bools",
                valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
            },
            "c": {
                xmlName: "spam",
                valueSpec: stringSpec_1.default
            }
        }
    });
    var tree = compositeSpec_1.compositeSpec({
        typeName: "Tree",
        propertySpecs: {
            name: {
                required: true,
                valueSpec: stringSpec_1.default
            },
            children: {
                valueSpec: sequenceSpec_1.sequenceSpec("Tree")
            }
        }
    });
    var animal = compositeSpec_1.compositeSpec({
        typeName: "Animal",
        polymorphism: {
            inheritedBy: ["Cat"],
            discriminatorPropertyName: "animalType",
            discriminatorPropertyValue: "animal"
        },
        propertySpecs: {
            animalType: {
                required: true,
                valueSpec: stringSpec_1.default
            },
            ageInYears: {
                required: true,
                valueSpec: numberSpec_1.default
            }
        }
    });
    var cat = compositeSpec_1.compositeSpec({
        typeName: "Cat",
        polymorphism: {
            inheritsFrom: animal,
            inheritedBy: ["Tiger"],
            discriminatorPropertyValue: "cat"
        },
        propertySpecs: {
            cuddly: {
                required: true,
                valueSpec: booleanSpec_1.default
            }
        }
    });
    var tiger = compositeSpec_1.compositeSpec({
        typeName: "Tiger",
        polymorphism: {
            inheritsFrom: cat,
            inheritedBy: ["Saber-toothed Tiger"],
            discriminatorPropertyValue: "tiger"
        },
        propertySpecs: {
            stripes: {
                required: true,
                valueSpec: numberSpec_1.default
            },
            toothType: {
                required: true,
                valueSpec: stringSpec_1.default
            }
        }
    });
    var saberToothedTiger = compositeSpec_1.compositeSpec({
        typeName: "Saber-toothed Tiger",
        polymorphism: {
            inheritsFrom: tiger,
            discriminatorPropertyValue: "saber-toothed tiger"
        }
    });
    var animalCompositeSpecDictionary = {
        Animal: animal,
        Cat: cat,
        Tiger: tiger,
        "Saber-toothed Tiger": saberToothedTiger
    };
    describe("serialize()", function () {
        describe("with strict type-checking", function () {
            function compositeSerializeWithStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.serializationStrictTypeChecking = true;
                specTest_1.serializeTest({
                    testName: args.testName,
                    typeSpec: args.compositeSpec || compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: {} }),
                    propertyPath: args.propertyPath,
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            compositeSerializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an object."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an object."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be an object."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: {}
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log a warning when a required property is missing and strict missing properties is false",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { required: true, valueSpec: booleanSpec_1.default } } }),
                value: {},
                options: {
                    serializationStrictMissingProperties: false
                },
                expectedResult: {},
                expectedLogs: ["WARNING: Missing non-constant boolean property at a.property.path.tasty?."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should throw an error when a required property is missing and strict missing properties is true",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { required: true, valueSpec: booleanSpec_1.default } } }),
                value: {},
                options: {
                    serializationStrictMissingProperties: true
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.tasty?."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.tasty?."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should throw an error when a property has the wrong type",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { valueSpec: booleanSpec_1.default } } }),
                value: { "tasty?": 2 },
                expectedResult: new Error("Property a.property.path.tasty? with value 2 must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path.tasty? with value 2 must be a boolean."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should drop properties that exist on the value but not in the specification",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "age": { valueSpec: numberSpec_1.default } } }),
                value: { "age": 30, "height": "tall" },
                expectedResult: { "age": 30 }
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should return the correct flattened serialization for JSON",
                compositeSpec: jsonFlattenableType,
                value: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                },
                expectedResult: {
                    "A": {
                        "B": {
                            "C": 5,
                            "D": [true, false, true]
                        },
                        "E": "test"
                    }
                }
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should return the correct XML serialization",
                compositeSpec: xmlWithWrappedSequence,
                value: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                },
                options: {
                    outputType: serializationOptions_1.SerializationOutputType.XML
                },
                expectedResult: {
                    $: {
                        "a": 5
                    },
                    "bools": {
                        "bool": [true, false, true]
                    },
                    "spam": "test"
                }
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should return the correct flattened serialization for XML",
                compositeSpec: xmlFlattenableType,
                value: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                },
                options: {
                    outputType: serializationOptions_1.SerializationOutputType.XML
                },
                expectedResult: {
                    "$": {
                        "A": 5
                    },
                    "b": {
                        "o": {
                            "o": {
                                "l": {
                                    "s": {
                                        "bool": [true, false, true]
                                    }
                                }
                            }
                        }
                    },
                    "A": {
                        "E": "test"
                    }
                }
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should support recursive specs in JSON",
                compositeSpec: tree,
                value: {
                    name: "A",
                    children: [
                        {
                            name: "B",
                            children: [
                                {
                                    name: "C"
                                }
                            ]
                        }
                    ]
                },
                options: {
                    compositeSpecDictionary: {
                        "Tree": tree
                    }
                },
                expectedResult: {
                    name: "A",
                    children: [
                        {
                            name: "B",
                            children: [
                                {
                                    name: "C"
                                }
                            ]
                        }
                    ]
                }
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "A": {
                            valueSpec: "B"
                        }
                    }
                }),
                value: {
                    "A": "B doesn't exist in the composite TypeSpec dictionary"
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"B\" at a.property.path.A."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"B\" at a.property.path.A."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value is missing property in base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.ageInYears."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.ageInYears."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value is missing property in derived type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.cuddly."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.cuddly."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is missing property in base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.ageInYears."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.ageInYears."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is missing property in derived type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: 12
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.cuddly."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.cuddly."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value has wrong type for base type property",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedResult: new Error("Property a.property.path.ageInYears with value \"12\" must be a number."),
                expectedLogs: ["ERROR: Property a.property.path.ageInYears with value \"12\" must be a number."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value has wrong type for derived type property",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: 10
                },
                expectedResult: new Error("Property a.property.path.cuddly with value 10 must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path.cuddly with value 10 must be a boolean."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value has wrong type for base type property",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedResult: new Error("Property a.property.path.ageInYears with value \"12\" must be a number."),
                expectedLogs: ["ERROR: Property a.property.path.ageInYears with value \"12\" must be a number."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is has wrong type for derived type property",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: "definitely"
                },
                expectedResult: new Error("Property a.property.path.cuddly with value \"definitely\" must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path.cuddly with value \"definitely\" must be a boolean."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should support serializing base type when composite spec is base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "animal",
                    ageInYears: 12
                },
                expectedResult: {
                    animalType: "animal",
                    ageInYears: 12
                }
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should support serializing derived type when composite spec is base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: false
                }
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should support serializing 2nd-level derived type when composite spec is base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    ageInYears: 12,
                    cuddly: false,
                    stripes: 43,
                    toothType: "sharp"
                },
                expectedResult: {
                    animalType: "tiger",
                    ageInYears: 12,
                    cuddly: false,
                    stripes: 43,
                    toothType: "sharp"
                }
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error with unrecognized polymorphic discriminator value when serializationStrictRequiredPolymorphicDiscriminator is true",
                options: {
                    serializationStrictMissingProperties: true,
                    serializationStrictRequiredPolymorphicDiscriminator: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "lion",
                    toothType: "terrifying",
                    ageInYears: 12,
                    stripes: 20,
                    cuddly: true
                },
                expectedResult: new Error("Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."),
                expectedLogs: ["ERROR: Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log a warning with unrecognized polymorphic discriminator value when serializationStrictRequiredPolymorphicDiscriminator is false",
                options: {
                    serializationStrictMissingProperties: true,
                    serializationStrictRequiredPolymorphicDiscriminator: false,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "lion",
                    toothType: "terrifying",
                    ageInYears: 12,
                    stripes: 20,
                    cuddly: true
                },
                expectedResult: {
                    animalType: "lion",
                    ageInYears: 12
                },
                expectedLogs: ["WARNING: Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when missing a required property of a 2nd-level derived type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    ageInYears: 12,
                    cuddly: true,
                    toothType: "sharp"
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.stripes."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.stripes."]
            });
            compositeSerializeWithStrictTypeCheckingTest({
                testName: "should support 3rd-level derived types with multiple discriminator properties",
                options: {
                    serializationStrictMissingProperties: true,
                    serializationStrictAllowedProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                }
            });
        });
        describe("without strict type-checking", function () {
            function compositeSerializeWithoutStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.serializationStrictTypeChecking = false;
                specTest_1.serializeTest({
                    testName: args.testName,
                    typeSpec: args.compositeSpec || compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: {} }),
                    propertyPath: args.propertyPath,
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            compositeSerializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an object."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an object."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be an object."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                value: {},
                expectedResult: {}
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when a required property is missing and strict missing properties is false",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { required: true, valueSpec: booleanSpec_1.default } } }),
                value: {},
                options: {
                    serializationStrictMissingProperties: false
                },
                expectedResult: {},
                expectedLogs: ["WARNING: Missing non-constant boolean property at a.property.path.tasty?."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should throw an error when a required property is missing and strict missing properties is true",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { required: true, valueSpec: booleanSpec_1.default } } }),
                value: {},
                options: {
                    serializationStrictMissingProperties: true
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.tasty?."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.tasty?."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should throw an error when a property has the wrong type",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { valueSpec: booleanSpec_1.default } } }),
                value: { "tasty?": 2 },
                expectedResult: { "tasty?": 2 },
                expectedLogs: ["WARNING: Property a.property.path.tasty? with value 2 should be a boolean."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should drop properties that exist on the value but not in the specification",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "age": { valueSpec: numberSpec_1.default } } }),
                value: { "age": 30, "height": "tall" },
                expectedResult: { "age": 30 }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should return the correct flattened serialization for JSON",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "a": {
                            serializedName: "A.B.C",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            serializedName: "A.B.D",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            serializedName: "A.E",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                },
                expectedResult: {
                    "A": {
                        "B": {
                            "C": 5,
                            "D": [true, false, true]
                        },
                        "E": "test"
                    }
                }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should return the correct XML serialization",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "a": {
                            xmlIsAttribute: true,
                            xmlName: "a",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            xmlIsWrapped: true,
                            xmlElementName: "bool",
                            xmlName: "bools",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            xmlName: "spam",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                },
                options: {
                    outputType: serializationOptions_1.SerializationOutputType.XML
                },
                expectedResult: {
                    $: {
                        "a": 5
                    },
                    "bools": {
                        "bool": [true, false, true]
                    },
                    "spam": "test"
                }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should return the correct flattened serialization for XML",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "a": {
                            xmlIsAttribute: true,
                            xmlName: "A",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            xmlIsWrapped: true,
                            xmlElementName: "bool",
                            xmlName: "b.o.o.l.s",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            xmlName: "A.E",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                },
                options: {
                    outputType: serializationOptions_1.SerializationOutputType.XML
                },
                expectedResult: {
                    "$": {
                        "A": 5
                    },
                    "b": {
                        "o": {
                            "o": {
                                "l": {
                                    "s": {
                                        "bool": [true, false, true]
                                    }
                                }
                            }
                        }
                    },
                    "A": {
                        "E": "test"
                    }
                }
            });
            var recursiveCompositeSpec = compositeSpec_1.compositeSpec({
                typeName: "Letters",
                propertySpecs: {
                    "A": {
                        valueSpec: stringSpec_1.default
                    },
                    "B": {
                        valueSpec: "Letters"
                    }
                }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should support recursive specs in JSON",
                compositeSpec: recursiveCompositeSpec,
                value: {
                    "A": "a",
                    "B": {
                        "B": {
                            "A": "aaa"
                        }
                    }
                },
                options: {
                    compositeSpecDictionary: {
                        "Letters": recursiveCompositeSpec
                    }
                },
                expectedResult: {
                    "A": "a",
                    "B": {
                        "B": {
                            "A": "aaa"
                        }
                    }
                }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "A": {
                            valueSpec: "B"
                        }
                    }
                }),
                value: {
                    "A": "B doesn't exist in the composite TypeSpec dictionary"
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"B\" at a.property.path.A."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"B\" at a.property.path.A."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value is missing property in base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.ageInYears."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.ageInYears."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value is missing property in derived type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.cuddly."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.cuddly."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is missing property in base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.ageInYears."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.ageInYears."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is missing property in derived type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: 12
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.cuddly."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.cuddly."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when the composite spec is base type and value has wrong type for base type property",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedLogs: ["WARNING: Property a.property.path.ageInYears with value \"12\" should be a number."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when the composite spec is base type and value has wrong type for derived type property",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: 10
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: 10
                },
                expectedLogs: ["WARNING: Property a.property.path.cuddly with value 10 should be a boolean."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when the composite spec is derived type and value has wrong type for base type property",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedLogs: ["WARNING: Property a.property.path.ageInYears with value \"12\" should be a number."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when the composite spec is derived type and value is has wrong type for derived type property",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: "definitely"
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: "definitely"
                },
                expectedLogs: ["WARNING: Property a.property.path.cuddly with value \"definitely\" should be a boolean."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should support serializing base type when composite spec is base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "animal",
                    ageInYears: 12
                },
                expectedResult: {
                    animalType: "animal",
                    ageInYears: 12
                }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should support serializing derived type when composite spec is base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: false
                }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should support serializing 2nd-level derived type when composite spec is base type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: false,
                    stripes: 43
                },
                expectedResult: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: false,
                    stripes: 43
                }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error with unrecognized polymorphic discriminator value when serializationStrictRequiredPolymorphicDiscriminator is true",
                options: {
                    serializationStrictMissingProperties: true,
                    serializationStrictRequiredPolymorphicDiscriminator: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "lion",
                    toothType: "terrifying",
                    ageInYears: 12,
                    stripes: 20,
                    cuddly: true
                },
                expectedResult: new Error("Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."),
                expectedLogs: ["ERROR: Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning with unrecognized polymorphic discriminator value when serializationStrictRequiredPolymorphicDiscriminator is false",
                options: {
                    serializationStrictMissingProperties: true,
                    serializationStrictRequiredPolymorphicDiscriminator: false,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "lion",
                    toothType: "terrifying",
                    ageInYears: 12,
                    stripes: 20,
                    cuddly: true
                },
                expectedResult: {
                    animalType: "lion",
                    ageInYears: 12,
                },
                expectedLogs: ["WARNING: Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when missing a required property of a 2nd-level derived type",
                options: {
                    serializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.stripes."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.stripes."]
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should support 3rd-level derived types with multiple discriminator properties",
                options: {
                    serializationStrictMissingProperties: true,
                    serializationStrictAllowedProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                }
            });
            compositeSerializeWithoutStrictTypeCheckingTest({
                testName: "should support 3rd-level derived types with multiple discriminator properties",
                options: {
                    serializationStrictMissingProperties: true,
                    serializationStrictAllowedProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                }
            });
        });
    });
    describe("deserialize()", function () {
        describe("with strict type-checking", function () {
            function compositeDeserializeWithStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.deserializationStrictTypeChecking = true;
                specTest_1.deserializeTest({
                    testName: args.testName,
                    typeSpec: args.compositeSpec || compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: {} }),
                    propertyPath: args.propertyPath,
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            compositeDeserializeWithStrictTypeCheckingTest({
                value: undefined,
                expectedResult: new Error("Property a.property.path with value undefined must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value undefined must be an object."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                value: false,
                expectedResult: new Error("Property a.property.path with value false must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value false must be an object."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                value: [],
                expectedResult: new Error("Property a.property.path with value [] must be an object."),
                expectedLogs: ["ERROR: Property a.property.path with value [] must be an object."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                value: {},
                expectedResult: {}
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log a warning when a required property is missing and strict missing properties is false",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { required: true, valueSpec: booleanSpec_1.default } } }),
                value: {},
                options: {
                    deserializationStrictMissingProperties: false
                },
                expectedResult: {},
                expectedLogs: ["WARNING: Missing non-constant boolean property at a.property.path.tasty?."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should throw an error when a required property is missing and strict missing properties is true",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { required: true, valueSpec: booleanSpec_1.default } } }),
                value: {},
                options: {
                    deserializationStrictMissingProperties: true
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.tasty?."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.tasty?."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should throw an error when the value has a property with the wrong type",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { valueSpec: booleanSpec_1.default } } }),
                value: { "tasty?": 2 },
                expectedResult: new Error("Property a.property.path.tasty? with value 2 must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path.tasty? with value 2 must be a boolean."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should return the provided value without properties not in the property specification",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "age": { valueSpec: numberSpec_1.default } } }),
                value: { "height": "tall", "age": 30 },
                expectedResult: { "age": 30 }
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should return the correct flattened serialization for JSON",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "a": {
                            serializedName: "A.B.C",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            serializedName: "A.B.D",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            serializedName: "A.E",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    "A": {
                        "B": {
                            "C": 5,
                            "D": [true, false, true]
                        },
                        "E": "test"
                    }
                },
                expectedResult: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                }
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should return the correct XML serialization",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "a": {
                            xmlIsAttribute: true,
                            xmlName: "a",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            xmlIsWrapped: true,
                            xmlElementName: "bool",
                            xmlName: "bools",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            xmlName: "spam",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    $: {
                        "a": 5
                    },
                    "bools": {
                        "bool": [true, false, true]
                    },
                    "spam": "test"
                },
                options: {
                    outputType: serializationOptions_1.SerializationOutputType.XML
                },
                expectedResult: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                }
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should return the correct flattened serialization for XML",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "a": {
                            xmlIsAttribute: true,
                            xmlName: "A",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            xmlIsWrapped: true,
                            xmlElementName: "bool",
                            xmlName: "b.o.o.l.s",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            xmlName: "A.E",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    "$": {
                        "A": 5
                    },
                    "b": {
                        "o": {
                            "o": {
                                "l": {
                                    "s": {
                                        "bool": [true, false, true]
                                    }
                                }
                            }
                        }
                    },
                    "A": {
                        "E": "test"
                    }
                },
                options: {
                    outputType: serializationOptions_1.SerializationOutputType.XML
                },
                expectedResult: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                }
            });
            var recursiveCompositeSpec = compositeSpec_1.compositeSpec({
                typeName: "Letters",
                propertySpecs: {
                    "A": {
                        valueSpec: stringSpec_1.default
                    },
                    "B": {
                        valueSpec: "Letters"
                    }
                }
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should support recursive specs in JSON",
                compositeSpec: recursiveCompositeSpec,
                value: {
                    "A": "a",
                    "B": {
                        "B": {
                            "A": "aaa"
                        }
                    }
                },
                options: {
                    compositeSpecDictionary: {
                        "Letters": recursiveCompositeSpec
                    }
                },
                expectedResult: {
                    "A": "a",
                    "B": {
                        "B": {
                            "A": "aaa"
                        }
                    }
                }
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "A": {
                            valueSpec: "B"
                        }
                    }
                }),
                value: {
                    "A": "B doesn't exist in the composite TypeSpec dictionary"
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"B\" at a.property.path.A."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"B\" at a.property.path.A."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value is missing property in base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.ageInYears."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.ageInYears."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value is missing property in derived type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.cuddly."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.cuddly."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is missing property in base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.ageInYears."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.ageInYears."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is missing property in derived type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: 12
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.cuddly."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.cuddly."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value has wrong type for base type property",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedResult: new Error("Property a.property.path.ageInYears with value \"12\" must be a number."),
                expectedLogs: ["ERROR: Property a.property.path.ageInYears with value \"12\" must be a number."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value has wrong type for derived type property",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: 10
                },
                expectedResult: new Error("Property a.property.path.cuddly with value 10 must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path.cuddly with value 10 must be a boolean."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value has wrong type for base type property",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedResult: new Error("Property a.property.path.ageInYears with value \"12\" must be a number."),
                expectedLogs: ["ERROR: Property a.property.path.ageInYears with value \"12\" must be a number."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is has wrong type for derived type property",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: "definitely"
                },
                expectedResult: new Error("Property a.property.path.cuddly with value \"definitely\" must be a boolean."),
                expectedLogs: ["ERROR: Property a.property.path.cuddly with value \"definitely\" must be a boolean."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should support serializing base type when composite spec is base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "animal",
                    ageInYears: 12
                },
                expectedResult: {
                    animalType: "animal",
                    ageInYears: 12
                }
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should support serializing derived type when composite spec is base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: false
                }
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should support serializing 2nd-level derived type when composite spec is base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: false,
                    stripes: 43
                },
                expectedResult: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: false,
                    stripes: 43
                }
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error with unrecognized polymorphic discriminator value when deserializationStrictRequiredPolymorphicDiscriminator is true",
                options: {
                    deserializationStrictMissingProperties: true,
                    deserializationStrictRequiredPolymorphicDiscriminator: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "lion",
                    toothType: "terrifying",
                    ageInYears: 12,
                    stripes: 20,
                    cuddly: true
                },
                expectedResult: new Error("Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."),
                expectedLogs: ["ERROR: Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log a warning with unrecognized polymorphic discriminator value when deserializationStrictRequiredPolymorphicDiscriminator is false",
                options: {
                    deserializationStrictMissingProperties: true,
                    deserializationStrictRequiredPolymorphicDiscriminator: false,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "lion",
                    toothType: "terrifying",
                    ageInYears: 12,
                    stripes: 20,
                    cuddly: true
                },
                expectedResult: {
                    animalType: "lion",
                    ageInYears: 12
                },
                expectedLogs: ["WARNING: Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should log and throw an error when missing a required property of a 2nd-level derived type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.stripes."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.stripes."]
            });
            compositeDeserializeWithStrictTypeCheckingTest({
                testName: "should support 3rd-level derived types with multiple discriminator properties",
                options: {
                    deserializationStrictMissingProperties: true,
                    deserializationStrictAllowedProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                }
            });
        });
        describe("without strict type-checking", function () {
            function compositeDeserializeWithoutStrictTypeCheckingTest(args) {
                var options = args.options || {};
                options.deserializationStrictTypeChecking = false;
                specTest_1.deserializeTest({
                    testName: args.testName,
                    typeSpec: args.compositeSpec || compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: {} }),
                    propertyPath: args.propertyPath,
                    options: options,
                    value: args.value,
                    expectedResult: args.expectedResult,
                    expectedLogs: args.expectedLogs
                });
            }
            compositeDeserializeWithoutStrictTypeCheckingTest({
                value: undefined,
                expectedResult: undefined,
                expectedLogs: ["WARNING: Property a.property.path with value undefined should be an object."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                value: false,
                expectedResult: false,
                expectedLogs: ["WARNING: Property a.property.path with value false should be an object."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                value: [],
                expectedResult: [],
                expectedLogs: ["WARNING: Property a.property.path with value [] should be an object."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                value: {},
                expectedResult: {}
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when a required property is missing and strict missing properties is false",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { required: true, valueSpec: booleanSpec_1.default } } }),
                value: {},
                options: {
                    deserializationStrictMissingProperties: false
                },
                expectedResult: {},
                expectedLogs: ["WARNING: Missing non-constant boolean property at a.property.path.tasty?."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should throw an error when a required property is missing and strict missing properties is true",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { required: true, valueSpec: booleanSpec_1.default } } }),
                value: {},
                options: {
                    deserializationStrictMissingProperties: true
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.tasty?."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.tasty?."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should throw an error when the value has a property with the wrong type",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "tasty?": { valueSpec: booleanSpec_1.default } } }),
                value: { "tasty?": 2 },
                expectedResult: { "tasty?": 2 },
                expectedLogs: ["WARNING: Property a.property.path.tasty? with value 2 should be a boolean."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should return the provided value without properties not in the property specification",
                compositeSpec: compositeSpec_1.compositeSpec({ typeName: "Spam", propertySpecs: { "age": { valueSpec: numberSpec_1.default } } }),
                value: { "height": "tall", "age": 30 },
                expectedResult: { "age": 30 }
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should return the correct flattened serialization for JSON",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "a": {
                            serializedName: "A.B.C",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            serializedName: "A.B.D",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            serializedName: "A.E",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    "A": {
                        "B": {
                            "C": 5,
                            "D": [true, false, true]
                        },
                        "E": "test"
                    }
                },
                expectedResult: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                }
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should return the correct XML serialization",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "a": {
                            xmlIsAttribute: true,
                            xmlName: "a",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            xmlIsWrapped: true,
                            xmlElementName: "bool",
                            xmlName: "bools",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            xmlName: "spam",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    $: {
                        "a": 5
                    },
                    "bools": {
                        "bool": [true, false, true]
                    },
                    "spam": "test"
                },
                options: {
                    outputType: serializationOptions_1.SerializationOutputType.XML
                },
                expectedResult: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                }
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should return the correct flattened serialization for XML",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam", propertySpecs: {
                        "a": {
                            xmlIsAttribute: true,
                            xmlName: "A",
                            valueSpec: numberSpec_1.default
                        },
                        "b": {
                            xmlIsWrapped: true,
                            xmlElementName: "bool",
                            xmlName: "b.o.o.l.s",
                            valueSpec: sequenceSpec_1.sequenceSpec(booleanSpec_1.default)
                        },
                        "c": {
                            xmlName: "A.E",
                            valueSpec: stringSpec_1.default
                        }
                    }
                }),
                value: {
                    "$": {
                        "A": 5
                    },
                    "b": {
                        "o": {
                            "o": {
                                "l": {
                                    "s": {
                                        "bool": [true, false, true]
                                    }
                                }
                            }
                        }
                    },
                    "A": {
                        "E": "test"
                    }
                },
                options: {
                    outputType: serializationOptions_1.SerializationOutputType.XML
                },
                expectedResult: {
                    "a": 5,
                    "b": [true, false, true],
                    "c": "test"
                }
            });
            var recursiveCompositeSpec = compositeSpec_1.compositeSpec({
                typeName: "Letters",
                propertySpecs: {
                    "A": {
                        valueSpec: stringSpec_1.default
                    },
                    "B": {
                        valueSpec: "Letters"
                    }
                }
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should support recursive specs in JSON",
                compositeSpec: recursiveCompositeSpec,
                value: {
                    "A": "a",
                    "B": {
                        "B": {
                            "A": "aaa"
                        }
                    }
                },
                options: {
                    compositeSpecDictionary: {
                        "Letters": recursiveCompositeSpec
                    }
                },
                expectedResult: {
                    "A": "a",
                    "B": {
                        "B": {
                            "A": "aaa"
                        }
                    }
                }
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when a composite spec reference doesn't exist in composite spec dictionary",
                compositeSpec: compositeSpec_1.compositeSpec({
                    typeName: "Spam",
                    propertySpecs: {
                        "A": {
                            valueSpec: "B"
                        }
                    }
                }),
                value: {
                    "A": "B doesn't exist in the composite TypeSpec dictionary"
                },
                expectedResult: new Error("Missing composite specification entry in composite type dictionary for type named \"B\" at a.property.path.A."),
                expectedLogs: ["ERROR: Missing composite specification entry in composite type dictionary for type named \"B\" at a.property.path.A."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value is missing property in base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.ageInYears."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.ageInYears."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is base type and value is missing property in derived type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.cuddly."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.cuddly."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is missing property in base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.ageInYears."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.ageInYears."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when the composite spec is derived type and value is missing property in derived type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: 12
                },
                expectedResult: new Error("Missing non-constant boolean property at a.property.path.cuddly."),
                expectedLogs: ["ERROR: Missing non-constant boolean property at a.property.path.cuddly."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when the composite spec is base type and value has wrong type for base type property",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedLogs: ["WARNING: Property a.property.path.ageInYears with value \"12\" should be a number."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when the composite spec is base type and value has wrong type for derived type property",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: 10
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: 10
                },
                expectedLogs: ["WARNING: Property a.property.path.cuddly with value 10 should be a boolean."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when the composite spec is derived type and value has wrong type for base type property",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: "12",
                    cuddly: true
                },
                expectedLogs: ["WARNING: Property a.property.path.ageInYears with value \"12\" should be a number."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning when the composite spec is derived type and value is has wrong type for derived type property",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: cat,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: "definitely"
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: "definitely"
                },
                expectedLogs: ["WARNING: Property a.property.path.cuddly with value \"definitely\" should be a boolean."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should support serializing base type when composite spec is base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "animal",
                    ageInYears: 12
                },
                expectedResult: {
                    animalType: "animal",
                    ageInYears: 12
                }
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should support serializing derived type when composite spec is base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "cat",
                    ageInYears: 12,
                    cuddly: false
                }
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should support serializing 2nd-level derived type when composite spec is base type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: false,
                    stripes: 43
                },
                expectedResult: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: false,
                    stripes: 43
                }
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error with unrecognized polymorphic discriminator value when deserializationStrictRequiredPolymorphicDiscriminator is true",
                options: {
                    deserializationStrictMissingProperties: true,
                    deserializationStrictRequiredPolymorphicDiscriminator: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "lion",
                    toothType: "terrifying",
                    ageInYears: 12,
                    stripes: 20,
                    cuddly: true
                },
                expectedResult: new Error("Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."),
                expectedLogs: ["ERROR: Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log a warning with unrecognized polymorphic discriminator value when deserializationStrictRequiredPolymorphicDiscriminator is false",
                options: {
                    deserializationStrictMissingProperties: true,
                    deserializationStrictRequiredPolymorphicDiscriminator: false,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "lion",
                    toothType: "terrifying",
                    ageInYears: 12,
                    stripes: 20,
                    cuddly: true
                },
                expectedResult: {
                    animalType: "lion",
                    ageInYears: 12
                },
                expectedLogs: ["WARNING: Unrecognized polymorphic discriminator value lion for composite type Animal at property a.property.path.animalType."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should log and throw an error when missing a required property of a 2nd-level derived type",
                options: {
                    deserializationStrictMissingProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "sharp",
                    ageInYears: 12,
                    cuddly: true
                },
                expectedResult: new Error("Missing non-constant number property at a.property.path.stripes."),
                expectedLogs: ["ERROR: Missing non-constant number property at a.property.path.stripes."]
            });
            compositeDeserializeWithoutStrictTypeCheckingTest({
                testName: "should support 3rd-level derived types with multiple discriminator properties",
                options: {
                    deserializationStrictMissingProperties: true,
                    deserializationStrictAllowedProperties: true,
                    compositeSpecDictionary: animalCompositeSpecDictionary
                },
                compositeSpec: animal,
                value: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                },
                expectedResult: {
                    animalType: "tiger",
                    toothType: "saber",
                    stripes: 12,
                    ageInYears: 10000,
                    cuddly: false
                }
            });
        });
    });
});
//# sourceMappingURL=compositeSpecTests.js.map