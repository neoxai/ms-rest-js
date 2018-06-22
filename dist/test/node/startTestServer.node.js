"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var childProcess = require("child_process");
var path = require("path");
var serverProcess;
before(function (done) {
    serverProcess = childProcess.spawn(path.join(__dirname, "../../node_modules/.bin/ts-node"), ["testserver", "--no-webpack"], { shell: true });
    var dataListener = function () {
        serverProcess.stdout.removeListener("data", dataListener);
        serverProcess.stderr.removeListener("data", dataListener);
        done();
    };
    serverProcess.stdout.on("data", dataListener);
    serverProcess.stderr.on("data", dataListener);
    serverProcess.on("error", function (err) {
        console.error(err);
        done(err);
    });
});
after(function () {
    serverProcess.stdout.destroy();
    serverProcess.stderr.destroy();
    serverProcess.kill();
});
//# sourceMappingURL=startTestServer.node.js.map