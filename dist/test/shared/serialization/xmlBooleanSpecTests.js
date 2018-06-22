"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var booleanSpec_1 = require("../../../lib/serialization/booleanSpec");
var specTest_1 = require("./specTest");
var serializationOptions_1 = require("../../../lib/serialization/serializationOptions");
describe("booleanSpec XML", function () {
    describe("deserialize()", function () {
        specTest_1.deserializeTest({
            testName: "should deserialize true",
            typeSpec: booleanSpec_1.default,
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: "true",
            expectedResult: true
        });
        specTest_1.deserializeTest({
            testName: "should deserialize false",
            typeSpec: booleanSpec_1.default,
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: "false",
            expectedResult: false
        });
        specTest_1.deserializeTest({
            testName: "should deserialize a malformed boolean",
            typeSpec: booleanSpec_1.default,
            options: { outputType: serializationOptions_1.SerializationOutputType.XML },
            value: "hello",
            expectedResult: "hello",
            expectedLogs: ['WARNING: Property a.property.path with value "hello" should be a boolean.']
        });
    });
});
//# sourceMappingURL=xmlBooleanSpecTests.js.map