"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var should = require("should");
var msRest = require("../../lib/msRest");
var base64 = require("../../lib/util/base64");
var TokenCredentials = msRest.TokenCredentials;
var BasicAuthenticationCredentials = msRest.BasicAuthenticationCredentials;
var ApiKeyCredentials = msRest.ApiKeyCredentials;
var dummyToken = "A-dummy-access-token";
var fakeScheme = "fake-auth-scheme";
var dummyuserName = "dummy@mummy.com";
var dummyPassword = "IL0veDummies";
describe("Token credentials", function () {
    describe("usage", function () {
        it("should set auth header with bearer scheme in request", function (done) {
            var creds = new TokenCredentials(dummyToken);
            var request = new msRest.WebResource();
            creds.signRequest(request).then(function (signedRequest) {
                should.exist(signedRequest.headers.get("authorization"));
                should(signedRequest.headers.get("authorization")).match(new RegExp("^Bearer\\s+" + dummyToken + "$"));
                done();
            });
        });
        it("should set auth header with custom scheme in request", function (done) {
            var creds = new TokenCredentials(dummyToken, fakeScheme);
            var request = new msRest.WebResource();
            creds.signRequest(request).then(function (signedRequest) {
                should.exist(signedRequest.headers.get("authorization"));
                should(signedRequest.headers.get("authorization")).match(new RegExp("^" + fakeScheme + "\\s+" + dummyToken + "$"));
                done();
            });
        });
    });
    describe("construction", function () {
        it("should succeed with token", function () {
            (function () {
                new TokenCredentials(dummyToken);
            }).should.not.throw();
        });
        // it("should fail without credentials", () => {
        //   (() => {
        //     new TokenCredentials();
        //   }).should.throw();
        // });
        // it("should fail without token", () => {
        //   (() => {
        //     new TokenCredentials(null, fakeScheme);
        //   }).should.throw();
        // });
    });
});
describe("Basic Authentication credentials", function () {
    var encodedCredentials = base64.encodeString(dummyuserName + ":" + dummyPassword);
    describe("usage", function () {
        it("should base64 encode the username and password and set auth header with baisc scheme in request", function (done) {
            var creds = new BasicAuthenticationCredentials(dummyuserName, dummyPassword);
            var request = new msRest.WebResource();
            creds.signRequest(request).then(function (signedRequest) {
                should.exist(signedRequest.headers.get("authorization"));
                should(signedRequest.headers.get("authorization")).match(new RegExp("^Basic\\s+" + encodedCredentials + "$"));
                done();
            });
        });
        it("should base64 encode the username and password and set auth header with custom scheme in request", function (done) {
            var creds = new BasicAuthenticationCredentials(dummyuserName, dummyPassword, fakeScheme);
            var request = new msRest.WebResource();
            creds.signRequest(request).then(function (signedRequest) {
                should.exist(signedRequest.headers.get("authorization"));
                should(signedRequest.headers.get("authorization")).match(new RegExp("^" + fakeScheme + "\\s+" + encodedCredentials + "$"));
                done();
            });
        });
    });
    describe("construction", function () {
        it("should succeed with userName and password", function () {
            (function () {
                new BasicAuthenticationCredentials(dummyuserName, dummyPassword);
            }).should.not.throw();
        });
        // it("should fail without credentials", () => {
        //   (() => {
        //     new BasicAuthenticationCredentials(null, null);
        //   }).should.throw();
        // });
        // it("should fail without userName and password", () => {
        //   (() => {
        //     new BasicAuthenticationCredentials(null, null, fakeScheme);
        //   }).should.throw();
        // });
    });
    describe("ApiKey credentials", function () {
        describe("usage", function () {
            it("should set header parameters properly in request", function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var creds, request;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                creds = new ApiKeyCredentials({ inHeader: { "key1": "value1", "key2": "value2" } });
                                request = new msRest.WebResource();
                                request.headers = new msRest.HttpHeaders();
                                return [4 /*yield*/, creds.signRequest(request)];
                            case 1:
                                _a.sent();
                                should.exist(request.headers.get("key1"));
                                should.exist(request.headers.get("key2"));
                                should(request.headers.get("key1")).match(new RegExp("^value1$"));
                                should(request.headers.get("key2")).match(new RegExp("^value2$"));
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("should set query parameters properly in the request url without any query parameters", function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var creds, request;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                creds = new ApiKeyCredentials({ inQuery: { "key1": "value1", "key2": "value2" } });
                                request = {
                                    headers: {},
                                    url: "https://example.com"
                                };
                                return [4 /*yield*/, creds.signRequest(request)];
                            case 1:
                                _a.sent();
                                request.url.should.equal("https://example.com?key1=value1&key2=value2");
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("should set query parameters properly in the request url with existing query parameters", function () {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var creds, request;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                creds = new ApiKeyCredentials({ inQuery: { "key1": "value1", "key2": "value2" } });
                                request = {
                                    headers: {},
                                    url: "https://example.com?q1=v2"
                                };
                                return [4 /*yield*/, creds.signRequest(request)];
                            case 1:
                                _a.sent();
                                request.url.should.equal("https://example.com?q1=v2&key1=value1&key2=value2");
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe("construction", function () {
            it("should fail with options.inHeader and options.inQuery set to null or undefined", function (done) {
                (function () {
                    new ApiKeyCredentials({ inHeader: undefined, inQuery: undefined });
                }).should.throw();
                done();
            });
            it("should fail without options", function (done) {
                (function () {
                    new ApiKeyCredentials();
                }).should.throw();
                done();
            });
            it("should fail with empty options", function (done) {
                (function () {
                    new ApiKeyCredentials({});
                }).should.throw();
                done();
            });
        });
    });
});
//# sourceMappingURL=credentialTests.js.map