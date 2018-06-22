"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var numberSpec_1 = require("../../../lib/serialization/numberSpec");
var specTest_1 = require("./specTest");
var serializationOptions_1 = require("../../../lib/serialization/serializationOptions");
describe("numberSpec", function () {
    describe("serialize()", function () {
        specTest_1.serializeTest({
            testName: "serialize a number",
            typeSpec: numberSpec_1.default,
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: 42,
            expectedResult: 42,
            expectedLogs: []
        });
    });
    describe("deserialize()", function () {
        specTest_1.deserializeTest({
            testName: "deserialize a number",
            typeSpec: numberSpec_1.default,
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: "42",
            expectedResult: 42,
            expectedLogs: []
        });
        specTest_1.deserializeTest({
            testName: "deserialize a malformed number",
            typeSpec: numberSpec_1.default,
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: "hello",
            expectedResult: "hello",
            expectedLogs: ["WARNING: Property a.property.path with value \"hello\" should be a number."]
        });
    });
});
//# sourceMappingURL=xmlNumberSpecTests.js.map