"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var msRestUserAgentPolicy_1 = require("../../lib/policies/msRestUserAgentPolicy");
var requestPolicy_1 = require("../../lib/policies/requestPolicy");
var constants_1 = require("../../lib/util/constants");
var webResource_1 = require("../../lib/webResource");
var should = require("should");
var userAgentHeader = constants_1.Constants.HeaderConstants.USER_AGENT;
var emptyRequestPolicy = {
    sendRequest: function (request) {
        assert(request);
        throw new Error("Not Implemented");
    }
};
describe("ms-rest user agent filter (nodejs only)", function () {
    it("should construct user agent header when supplied empty array", function (done) {
        var userAgentArray = [];
        var userAgentFilter = new msRestUserAgentPolicy_1.MsRestUserAgentPolicy(emptyRequestPolicy, new requestPolicy_1.RequestPolicyOptions(), userAgentArray);
        var resource = new webResource_1.WebResource();
        userAgentFilter.addUserAgentHeader(resource);
        should.ok(resource);
        should(resource.headers.get(userAgentHeader)).containEql("Node");
        should(resource.headers.get(userAgentHeader)).containEql("Azure-SDK-For-Node");
        done();
    });
    it("should not modify user agent header if already present", function (done) {
        var genericRuntime = "ms-rest";
        var azureRuntime = "ms-rest-azure";
        var azureSDK = "Azure-SDK-For-Node";
        var userAgentArray = [genericRuntime + "/v1.0.0", azureRuntime + "/v1.0.0"];
        var userAgentFilter = new msRestUserAgentPolicy_1.MsRestUserAgentPolicy(emptyRequestPolicy, new requestPolicy_1.RequestPolicyOptions(), userAgentArray);
        var customUA = "my custom user agent";
        var resource = new webResource_1.WebResource();
        resource.headers.set(userAgentHeader, customUA);
        userAgentFilter.addUserAgentHeader(resource);
        should.ok(resource);
        var actualUA = resource.headers.get(userAgentHeader);
        actualUA.should.not.containEql("Node");
        actualUA.should.not.containEql(azureSDK);
        actualUA.should.not.containEql(azureRuntime);
        actualUA.should.containEql(customUA);
        done();
    });
    it("should insert azure-sdk-for-node at right position", function (done) {
        var genericRuntime = "ms-rest";
        var azureRuntime = "ms-rest-azure";
        var azureSDK = "Azure-SDK-For-Node";
        var userAgentArray = [genericRuntime + "/v1.0.0", azureRuntime + "/v1.0.0"];
        var userAgentFilter = new msRestUserAgentPolicy_1.MsRestUserAgentPolicy(emptyRequestPolicy, new requestPolicy_1.RequestPolicyOptions(), userAgentArray);
        var resource = new webResource_1.WebResource();
        userAgentFilter.addUserAgentHeader(resource);
        should.ok(resource);
        var deconstructedUserAgent = resource.headers.get(userAgentHeader).split(" ");
        should.ok(deconstructedUserAgent);
        var indexOfAzureRuntime = deconstructedUserAgent.findIndex(function (e) { return e.startsWith(azureRuntime); });
        assert.notEqual(indexOfAzureRuntime, -1, "did not find " + azureRuntime + " in user agent");
        var indexOfAzureSDK = deconstructedUserAgent.indexOf(azureSDK);
        assert.notEqual(indexOfAzureSDK, -1, "did not find " + azureSDK + " in user agent");
        assert.equal(indexOfAzureSDK, 1 + indexOfAzureRuntime, azureSDK + " is not in the right place in user agent string");
        done();
    });
});
//# sourceMappingURL=userAgentFilterTests.node.js.map