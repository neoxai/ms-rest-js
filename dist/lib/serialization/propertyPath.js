"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The path to a property in both the deserialized and serialized scenarios.
 */
var PropertyPath = /** @class */ (function () {
    function PropertyPath(path, serializedPath) {
        this.path = path || [];
        this.serializedPath = serializedPath || this.path;
    }
    Object.defineProperty(PropertyPath.prototype, "pathString", {
        get: function () {
            return pathToString(this.path);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyPath.prototype, "serializedPathString", {
        get: function () {
            return pathToString(this.serializedPath);
        },
        enumerable: true,
        configurable: true
    });
    PropertyPath.prototype.pathStringConcat = function () {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        return new PropertyPath(this.path.concat(path));
    };
    PropertyPath.prototype.concat = function (path, serializedPath) {
        return new PropertyPath(this.path.concat(path), this.serializedPath.concat(serializedPath || path));
    };
    PropertyPath.prototype.toString = function () {
        var pathString = this.pathString;
        var serializedPathString = this.serializedPathString;
        return pathString + (pathString === serializedPathString ? "" : " (" + serializedPathString + ")");
    };
    return PropertyPath;
}());
exports.PropertyPath = PropertyPath;
function pathToString(path) {
    return path.join(".");
}
//# sourceMappingURL=propertyPath.js.map