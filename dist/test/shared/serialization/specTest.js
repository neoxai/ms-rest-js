"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var assert = require("assert");
var propertyPath_1 = require("../../../lib/serialization/propertyPath");
var inMemoryHttpPipelineLogger_1 = require("../inMemoryHttpPipelineLogger");
function serializeTest(args) {
    var propertyPath = args.propertyPath || ["a", "property", "path"];
    var logger = new inMemoryHttpPipelineLogger_1.InMemoryHttpPipelineLogger();
    var options = args.options || {};
    options.logger = logger;
    var expectedResult = args.expectedResult;
    var expectedLogs = args.expectedLogs || [];
    if (expectedResult instanceof Error) {
        it(args.testName || "should throw an error when given " + JSON.stringify(args.value), function () {
            try {
                args.typeSpec.serialize(new propertyPath_1.PropertyPath(propertyPath), args.value, options);
                assert.fail("Expected an error to be thrown.");
            }
            catch (error) {
                assert.deepEqual(error.message, expectedResult.message);
            }
            assert.deepEqual(logger.logs, expectedLogs);
        });
    }
    else {
        it(args.testName || "should return " + JSON.stringify(expectedResult) + " when given " + JSON.stringify(args.value), function () {
            assert.deepEqual(args.typeSpec.serialize(new propertyPath_1.PropertyPath(propertyPath), args.value, options), expectedResult);
            assert.deepEqual(logger.logs, expectedLogs);
        });
    }
}
exports.serializeTest = serializeTest;
function deserializeTest(args) {
    var propertyPath = args.propertyPath || ["a", "property", "path"];
    var logger = new inMemoryHttpPipelineLogger_1.InMemoryHttpPipelineLogger();
    var options = args.options || {};
    options.logger = logger;
    var expectedResult = args.expectedResult;
    var expectedLogs = args.expectedLogs || [];
    if (expectedResult instanceof Error) {
        it(args.testName || "should throw an error when given " + JSON.stringify(args.value), function () {
            try {
                args.typeSpec.deserialize(new propertyPath_1.PropertyPath(propertyPath), args.value, options);
                assert.fail("Expected an error to be thrown.");
            }
            catch (error) {
                assert.deepEqual(error.message, expectedResult.message);
            }
            assert.deepEqual(logger.logs, expectedLogs);
        });
    }
    else {
        it(args.testName || "should return " + JSON.stringify(expectedResult) + " when given " + JSON.stringify(args.value), function () {
            assert.deepEqual(args.typeSpec.deserialize(new propertyPath_1.PropertyPath(propertyPath), args.value, options), expectedResult);
            assert.deepEqual(logger.logs, expectedLogs);
        });
    }
}
exports.deserializeTest = deserializeTest;
//# sourceMappingURL=specTest.js.map