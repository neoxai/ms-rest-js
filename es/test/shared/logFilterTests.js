// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as assert from "assert";
import { HttpHeaders } from "../../lib/httpHeaders";
import { LogPolicy } from "../../lib/policies/logPolicy";
import { RequestPolicyOptions } from "../../lib/policies/requestPolicy";
import { WebResource } from "../../lib/webResource";
var emptyRequestPolicy = {
    sendRequest: function (request) {
        assert(request);
        throw new Error("Not Implemented");
    }
};
describe("Log filter", function () {
    it("should log messages when a logger object is provided", function (done) {
        var expected = ">> Request: {\n  \"rawResponse\": false,\n  \"url\": \"https://foo.com\",\n  \"method\": \"PUT\",\n  \"headers\": {\n    \"_headersMap\": {}\n  },\n  \"body\": {\n    \"a\": 1\n  }\n}\n>> Response status code: 200\n>> Body: null\n";
        var output = "";
        var logger = function (message) { output += message + "\n"; };
        var lf = new LogPolicy(emptyRequestPolicy, new RequestPolicyOptions(), logger);
        var req = new WebResource("https://foo.com", "PUT", { "a": 1 });
        var opRes = { request: req, status: 200, headers: new HttpHeaders(), bodyAsText: null };
        lf.logResponse(opRes).then(function () {
            // console.dir(output, { depth: null });
            // console.log(">>>>>>>");
            // console.dir(expected);
            assert.deepEqual(output, expected);
            done();
        }).catch(function (err) {
            done(err);
        });
    });
});
//# sourceMappingURL=logFilterTests.js.map