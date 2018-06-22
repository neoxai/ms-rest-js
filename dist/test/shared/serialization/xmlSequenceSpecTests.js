"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequenceSpec_1 = require("../../../lib/serialization/sequenceSpec");
var serializationOptions_1 = require("../../../lib/serialization/serializationOptions");
var specTest_1 = require("./specTest");
var stringSpec_1 = require("../../../lib/serialization/stringSpec");
describe("sequenceSpec XML", function () {
    describe("deserialize()", function () {
        specTest_1.deserializeTest({
            testName: "deserialize a simple list",
            typeSpec: sequenceSpec_1.sequenceSpec(stringSpec_1.default),
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: ["a", "b", "c"],
            expectedResult: ["a", "b", "c"],
            expectedLogs: []
        });
        specTest_1.deserializeTest({
            testName: "deserialize a list of one element",
            typeSpec: sequenceSpec_1.sequenceSpec(stringSpec_1.default),
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: "a",
            expectedResult: ["a"],
            expectedLogs: []
        });
        specTest_1.deserializeTest({
            testName: "deserialize an empty list",
            typeSpec: sequenceSpec_1.sequenceSpec(stringSpec_1.default),
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: undefined,
            expectedResult: [],
            expectedLogs: []
        });
    });
});
//# sourceMappingURL=xmlSequenceSpecTests.js.map