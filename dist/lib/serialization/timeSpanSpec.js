"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var moment_1 = require("moment");
var serializationOptions_1 = require("./serializationOptions");
/**
 * A type specification that describes how to validate and serialize a Date.
 */
var timeSpanSpec = {
    specType: "TimeSpan",
    serialize: function (propertyPath, value, options) {
        var result;
        if (!value || (!moment_1.isDuration(value) && !(value.constructor && value.constructor.name === "Duration" && typeof value.isValid === "function" && value.isValid()))) {
            serializationOptions_1.failSerializeTypeCheck(options, propertyPath, value, "a TimeSpan/Duration");
            result = value;
        }
        else {
            result = value.toISOString();
        }
        return result;
    },
    deserialize: function (propertyPath, value, options) {
        var result;
        if (!value || typeof value !== "string" || !iso8601TimeSpanRegExp.exec(value)) {
            serializationOptions_1.failDeserializeTypeCheck(options, propertyPath, value, "an ISO8601 TimeSpan/Duration string");
            result = value;
        }
        else {
            result = moment_1.duration(value);
        }
        return result;
    }
};
/**
 * Regular expression for ISO8601 TimeSpan/Durations. This was copied from moment.js.
 */
var iso8601TimeSpanRegExp = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
exports.default = timeSpanSpec;
//# sourceMappingURL=timeSpanSpec.js.map