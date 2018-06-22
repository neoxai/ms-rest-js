"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var operationParameter_1 = require("../../lib/operationParameter");
describe("getParameterPathString()", function () {
    it("should throw when given undefined", function () {
        assert.throws(function () { return operationParameter_1.getPathStringFromParameter(undefined); });
    });
    it("should throw when given null", function () {
        // tslint:disable-next-line:no-null-keyword
        assert.throws(function () { return operationParameter_1.getPathStringFromParameter(null); });
    });
    it("should return the parameterPath value when parameterPath is a string", function () {
        var parameter = {
            parameterPath: "pathToParameterValue",
            mapper: {
                serializedName: "value",
                type: {
                    name: "number"
                }
            }
        };
        assert.strictEqual(operationParameter_1.getPathStringFromParameter(parameter), "pathToParameterValue");
    });
    it("should return the dotted version of parameterPath when parameterPath is a string[]", function () {
        var parameter = {
            parameterPath: ["path", "to", "parameter", "value"],
            mapper: {
                serializedName: "value",
                type: {
                    name: "number"
                }
            }
        };
        assert.strictEqual(operationParameter_1.getPathStringFromParameter(parameter), "path.to.parameter.value");
    });
    it("should return the escaped dotted version of parameterPath when parameterPath is a string[] with dots", function () {
        var parameter = {
            parameterPath: ["pa.th", "to", "par.ameter", "valu.e"],
            mapper: {
                serializedName: "value",
                type: {
                    name: "number"
                }
            }
        };
        assert.strictEqual(operationParameter_1.getPathStringFromParameter(parameter), "pa.th.to.par.ameter.valu.e");
    });
    it("should return the mapper's serialized name when the parameterPath is an object", function () {
        var parameter = {
            parameterPath: {
                "a": "A",
                "b": "B"
            },
            mapper: {
                serializedName: "value",
                type: {
                    name: "number"
                }
            }
        };
        assert.strictEqual(operationParameter_1.getPathStringFromParameter(parameter), "value");
    });
});
//# sourceMappingURL=operationParameterTests.js.map