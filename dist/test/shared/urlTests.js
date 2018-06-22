"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var url_1 = require("../../lib/url");
describe("URLQuery", function () {
    it("constructor()", function () {
        var urlQuery = new url_1.URLQuery();
        assert.strictEqual(urlQuery.any(), false);
        assert.strictEqual(urlQuery.toString(), "");
    });
    describe("set(string,string)", function () {
        it("with undefined parameter name", function () {
            var urlQuery = new url_1.URLQuery();
            urlQuery.set(undefined, "tasty");
            assert.strictEqual(urlQuery.get(undefined), undefined);
            assert.strictEqual(urlQuery.any(), false);
            assert.strictEqual(urlQuery.toString(), "");
        });
        it("with empty parameter name", function () {
            var urlQuery = new url_1.URLQuery();
            urlQuery.set("", "tasty");
            assert.strictEqual(urlQuery.get(""), undefined);
            assert.strictEqual(urlQuery.any(), false);
            assert.strictEqual(urlQuery.toString(), "");
        });
        it("with undefined parameter value", function () {
            var urlQuery = new url_1.URLQuery();
            urlQuery.set("apples", undefined);
            assert.strictEqual(urlQuery.get("apples"), undefined);
            assert.strictEqual(urlQuery.any(), false);
            assert.strictEqual(urlQuery.toString(), "");
        });
        it("with empty parameter value", function () {
            var urlQuery = new url_1.URLQuery();
            urlQuery.set("apples", "");
            assert.strictEqual(urlQuery.get("apples"), "");
            assert.strictEqual(urlQuery.any(), true);
            assert.strictEqual(urlQuery.toString(), "apples=");
        });
        it("with non-empty parameter value", function () {
            var urlQuery = new url_1.URLQuery();
            urlQuery.set("apples", "grapes");
            assert.strictEqual(urlQuery.get("apples"), "grapes");
            assert.strictEqual(urlQuery.any(), true);
            assert.strictEqual(urlQuery.toString(), "apples=grapes");
        });
        it("with existing parameter value and undefined parameter value", function () {
            var urlQuery = new url_1.URLQuery();
            urlQuery.set("apples", "grapes");
            urlQuery.set("apples", undefined);
            assert.strictEqual(urlQuery.get("apples"), undefined);
            assert.strictEqual(urlQuery.any(), false);
            assert.strictEqual(urlQuery.toString(), "");
        });
        it("with existing parameter value and empty parameter value", function () {
            var urlQuery = new url_1.URLQuery();
            urlQuery.set("apples", "grapes");
            urlQuery.set("apples", "");
            assert.strictEqual(urlQuery.get("apples"), "");
            assert.strictEqual(urlQuery.any(), true);
            assert.strictEqual(urlQuery.toString(), "apples=");
        });
    });
    describe("parse(string)", function () {
        it("with undefined", function () {
            assert.strictEqual(url_1.URLQuery.parse(undefined).toString(), "");
        });
        it("with \"\"", function () {
            assert.strictEqual(url_1.URLQuery.parse("").toString(), "");
        });
        it("with \"A\"", function () {
            assert.strictEqual(url_1.URLQuery.parse("A").toString(), "");
        });
        it("with \"A=\"", function () {
            assert.strictEqual(url_1.URLQuery.parse("A=").toString(), "A=");
        });
        it("with \"A=B\"", function () {
            assert.strictEqual(url_1.URLQuery.parse("A=B").toString(), "A=B");
        });
        it("with \"A=&\"", function () {
            assert.strictEqual(url_1.URLQuery.parse("A=").toString(), "A=");
        });
        it("with \"A==\"", function () {
            assert.strictEqual(url_1.URLQuery.parse("A==").toString(), "");
        });
        it("with \"A=&B=C\"", function () {
            assert.strictEqual(url_1.URLQuery.parse("A=&B=C").toString(), "A=&B=C");
        });
    });
});
describe("URLBuilder", function () {
    describe("setScheme()", function () {
        it("to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("");
            assert.strictEqual(urlBuilder.getScheme(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("to \"http\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            assert.strictEqual(urlBuilder.getScheme(), "http");
            assert.strictEqual(urlBuilder.toString(), "http://");
        });
        it("to \"http://\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http://");
            assert.strictEqual(urlBuilder.getScheme(), "http");
            assert.strictEqual(urlBuilder.getHost(), undefined);
            assert.strictEqual(urlBuilder.toString(), "http://");
        });
        it("to \"http://www.example.com\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http://www.example.com");
            assert.strictEqual(urlBuilder.getScheme(), "http");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.toString(), "http://www.example.com");
        });
        it("to \"http://www.exa mple.com\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http://www.exa mple.com");
            assert.strictEqual(urlBuilder.getScheme(), "http");
            assert.strictEqual(urlBuilder.getHost(), "www.exa mple.com");
            assert.strictEqual(urlBuilder.toString(), "http://www.exa mple.com");
        });
        it("from \"http\" to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setScheme("");
            assert.strictEqual(urlBuilder.getScheme(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("from \"http\" to \"https\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setScheme("https");
            assert.strictEqual(urlBuilder.getScheme(), "https");
            assert.strictEqual(urlBuilder.toString(), "https://");
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"A=B\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("A", "B");
            assert.strictEqual("http://www.example.com?A=B", urlBuilder.toString());
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"App les=B\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("App les", "B");
            assert.strictEqual("http://www.example.com?App les=B", urlBuilder.toString());
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"App+les=B\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("App+les", "B");
            assert.strictEqual("http://www.example.com?App+les=B", urlBuilder.toString());
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"App%20les=B\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("App%20les", "B");
            assert.strictEqual("http://www.example.com?App%20les=B", urlBuilder.toString());
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"Apples=Go od\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("Apples", "Go od");
            assert.strictEqual("http://www.example.com?Apples=Go od", urlBuilder.toString());
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"Apples=Go+od\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("Apples", "Go+od");
            assert.strictEqual("http://www.example.com?Apples=Go+od", urlBuilder.toString());
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"Apples=Go%20od\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("Apples", "Go%20od");
            assert.strictEqual("http://www.example.com?Apples=Go%20od", urlBuilder.toString());
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"A=B&C=D\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("A", "B");
            urlBuilder.setQueryParameter("C", "D");
            assert.strictEqual(urlBuilder.toString(), "http://www.example.com?A=B&C=D");
        });
        it("to \"http\" and setHost() to \"www.example.com\" and setQueryParameter() to \"A=B&C=D\" and setPath() to \"index.html\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("http");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setQueryParameter("A", "B");
            urlBuilder.setQueryParameter("C", "D");
            urlBuilder.setPath("index.html");
            assert.strictEqual(urlBuilder.toString(), "http://www.example.com/index.html?A=B&C=D");
        });
        it("to \"https\" and setHost() to \"www.example.com\" and setPath() to \"http://www.othersite.com\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("https");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setPath("http://www.othersite.com");
            assert.strictEqual(urlBuilder.getScheme(), "http");
            assert.strictEqual(urlBuilder.getHost(), "www.othersite.com");
            assert.strictEqual(urlBuilder.getPath(), undefined);
            assert.strictEqual(urlBuilder.toString(), "http://www.othersite.com");
        });
        it("to \"https\" and setHost() to \"www.example.com\" and setPath() to \"mypath?thing=stuff\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("https");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setPath("mypath?thing=stuff");
            urlBuilder.setQueryParameter("otherthing", "otherstuff");
            assert.strictEqual(urlBuilder.getScheme(), "https");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.getPath(), "mypath");
            assert.strictEqual(urlBuilder.toString(), "https://www.example.com/mypath?thing=stuff&otherthing=otherstuff");
        });
        it("to \"https\" and setHost() to \"www.example.com\" and setPath() to \"http://www.othersite.com/mypath?thing=stuff\" and setQueryParameter() to \"otherthing=otherstuff\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setScheme("https");
            urlBuilder.setHost("www.example.com");
            urlBuilder.setPath("http://www.othersite.com/mypath?thing=stuff");
            urlBuilder.setQueryParameter("otherthing", "otherstuff");
            assert.strictEqual(urlBuilder.getScheme(), "http");
            assert.strictEqual(urlBuilder.getPath(), "/mypath");
            assert.strictEqual(urlBuilder.toString(), "http://www.othersite.com/mypath?thing=stuff&otherthing=otherstuff");
        });
    });
    describe("setHost()", function () {
        it("to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("");
            assert.strictEqual(urlBuilder.getHost(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("to \"://www.example.com\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("://www.example.com");
            assert.strictEqual(urlBuilder.getScheme(), undefined);
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.toString(), "www.example.com");
        });
        it("to \"https://www.example.com\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("https://www.example.com");
            assert.strictEqual(urlBuilder.getScheme(), "https");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.toString(), "https://www.example.com");
        });
        it("to \"www.example.com:\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com:");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.getPort(), undefined);
            assert.strictEqual(urlBuilder.toString(), "www.example.com");
        });
        it("to \"www.example.com:1234\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com:1234");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.getPort(), "1234");
            assert.strictEqual(urlBuilder.toString(), "www.example.com:1234");
        });
        it("to \"www.example.com/\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com/");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.getPath(), "/");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/");
        });
        it("to \"www.example.com/index.html\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com/index.html");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.getPath(), "/index.html");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/index.html");
        });
        it("to \"www.example.com?\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com?");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.toString(), "www.example.com");
        });
        it("to \"www.example.com?a=b\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com?a=b");
            assert.strictEqual(urlBuilder.getHost(), "www.example.com");
            assert.strictEqual(urlBuilder.toString(), "www.example.com?a=b");
        });
        it("to \"www.examp le.com\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.examp le.com");
            assert.strictEqual(urlBuilder.getHost(), "www.examp le.com");
            assert.strictEqual(urlBuilder.toString(), "www.examp le.com");
        });
        it("from \"www.example.com\" to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com");
            urlBuilder.setHost("");
            assert.strictEqual(urlBuilder.getHost(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("from \"www.example.com\" to \"www.bing.com\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com");
            urlBuilder.setHost("www.bing.com");
            assert.strictEqual(urlBuilder.getHost(), "www.bing.com");
            assert.strictEqual(urlBuilder.toString(), "www.bing.com");
        });
        it("to \"www.example.com\" and setPath() to \"my/path\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com");
            urlBuilder.setPath("my/path");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/my/path");
        });
        it("to \"www.example.com\" and setPath() to \"/my/path\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com");
            urlBuilder.setPath("/my/path");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/my/path");
        });
        it("to \"www.example.com/\" and setPath() to \"my/path\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com/");
            urlBuilder.setPath("my/path");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/my/path");
        });
        it("to \"www.example.com/\" and setPath() to \"/my/path\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com/");
            urlBuilder.setPath("/my/path");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/my/path");
        });
        it("to \"www.example.com\" and setPath() to \"my path\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com/");
            urlBuilder.setPath("my path");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/my path");
        });
        it("to \"www.example.com\" and setPath() to \"my+path\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com/");
            urlBuilder.setPath("my+path");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/my+path");
        });
        it("to \"www.example.com\" and setPath() to \"my%20path\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setHost("www.example.com/");
            urlBuilder.setPath("my%20path");
            assert.strictEqual(urlBuilder.toString(), "www.example.com/my%20path");
        });
    });
    describe("setPort()", function () {
        it("to undefined", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort(undefined);
            assert.strictEqual(urlBuilder.getPort(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort("");
            assert.strictEqual(urlBuilder.getPort(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("to 50", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort(50);
            assert.strictEqual(urlBuilder.getPort(), "50");
            assert.strictEqual(urlBuilder.toString(), ":50");
        });
        it("to \"50\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort("50");
            assert.strictEqual(urlBuilder.getPort(), "50");
            assert.strictEqual(urlBuilder.toString(), ":50");
        });
        it("to \"50/\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort("50/");
            assert.strictEqual(urlBuilder.getPort(), "50");
            assert.strictEqual(urlBuilder.getPath(), "/");
            assert.strictEqual(urlBuilder.toString(), ":50/");
        });
        it("to \"50/index.html\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort("50/index.html");
            assert.strictEqual(urlBuilder.getPort(), "50");
            assert.strictEqual(urlBuilder.getPath(), "/index.html");
            assert.strictEqual(urlBuilder.toString(), ":50/index.html");
        });
        it("to \"50?\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort("50?");
            assert.strictEqual(urlBuilder.getPort(), "50");
            assert.strictEqual(urlBuilder.toString(), ":50");
        });
        it("to \"50?a=b&c=d\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort("50?a=b&c=d");
            assert.strictEqual(urlBuilder.getPort(), "50");
            assert.strictEqual(urlBuilder.toString(), ":50?a=b&c=d");
        });
        it("from 8080 to undefined", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort(8080);
            urlBuilder.setPort(undefined);
            assert.strictEqual(urlBuilder.getPort(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("from 8080 to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort(8080);
            urlBuilder.setPort("");
            assert.strictEqual(urlBuilder.getPort(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("from 8080 to 123", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort(8080);
            urlBuilder.setPort(123);
            assert.strictEqual(urlBuilder.getPort(), "123");
            assert.strictEqual(urlBuilder.toString(), ":123");
        });
        it("from 8080 to \"123\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPort(8080);
            urlBuilder.setPort("123");
            assert.strictEqual(urlBuilder.getPort(), "123");
            assert.strictEqual(urlBuilder.toString(), ":123");
        });
    });
    describe("setPath()", function () {
        it("to undefined", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath(undefined);
            assert.strictEqual(urlBuilder.getPath(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("");
            assert.strictEqual(urlBuilder.getPath(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("to \"/\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("/");
            assert.strictEqual(urlBuilder.getPath(), "/");
            assert.strictEqual(urlBuilder.toString(), "/");
        });
        it("to \"test/path.html\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("test/path.html");
            assert.strictEqual(urlBuilder.getPath(), "test/path.html");
            assert.strictEqual(urlBuilder.toString(), "/test/path.html");
        });
        it("from \"/\" to undefined", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("/");
            urlBuilder.setPath(undefined);
            assert.strictEqual(urlBuilder.getPath(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("from \"/\" to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("/");
            urlBuilder.setPath("");
            assert.strictEqual(urlBuilder.getPath(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("from \"/\" to \"/\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("/");
            urlBuilder.setPath("/");
            assert.strictEqual(urlBuilder.getPath(), "/");
            assert.strictEqual(urlBuilder.toString(), "/");
        });
        it("from \"/\" to \"test/path.html\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("/");
            urlBuilder.setPath("test/path.html");
            assert.strictEqual(urlBuilder.getPath(), "test/path.html");
            assert.strictEqual(urlBuilder.toString(), "/test/path.html");
        });
    });
    describe("setQuery()", function () {
        it("to undefined", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQuery(undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("to \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQuery("");
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("to \"?\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQuery("?");
            assert.strictEqual(urlBuilder.toString(), "");
        });
    });
    describe("setQueryParameter()", function () {
        it("with \"a\" and undefined", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQueryParameter("a", undefined);
            assert.strictEqual(urlBuilder.getQueryParameterValue("a"), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("with \"a\" and \"\"", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQueryParameter("a", "");
            assert.strictEqual(urlBuilder.getQueryParameterValue("a"), "");
            assert.strictEqual(urlBuilder.toString(), "?a=");
        });
    });
    describe("parse()", function () {
        it("with \"\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("").toString(), "");
        });
        it("with \"www.bing.com\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com").toString(), "www.bing.com");
        });
        it("with \"www.bing.com:8080\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com:8080").toString(), "www.bing.com:8080");
        });
        it("with \"ftp://www.bing.com:8080\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("ftp://www.bing.com:8080").toString(), "ftp://www.bing.com:8080");
        });
        it("with \"www.bing.com/my/path\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com/my/path").toString(), "www.bing.com/my/path");
        });
        it("with \"ftp://www.bing.com/my/path\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("ftp://www.bing.com/my/path").toString(), "ftp://www.bing.com/my/path");
        });
        it("with \"www.bing.com:1234/my/path\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com:1234/my/path").toString(), "www.bing.com:1234/my/path");
        });
        it("with \"ftp://www.bing.com:1234/my/path\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("ftp://www.bing.com:1234/my/path").toString(), "ftp://www.bing.com:1234/my/path");
        });
        it("with \"www.bing.com?a=1\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com?a=1").toString(), "www.bing.com?a=1");
        });
        it("with \"https://www.bing.com?a=1\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com?a=1").toString(), "https://www.bing.com?a=1");
        });
        it("with \"www.bing.com:123?a=1\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com:123?a=1").toString(), "www.bing.com:123?a=1");
        });
        it("with \"https://www.bing.com:987?a=1\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com:987?a=1").toString(), "https://www.bing.com:987?a=1");
        });
        it("with \"www.bing.com/folder/index.html?a=1\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com/folder/index.html?a=1").toString(), "www.bing.com/folder/index.html?a=1");
        });
        it("with \"https://www.bing.com/image.gif?a=1\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com/image.gif?a=1").toString(), "https://www.bing.com/image.gif?a=1");
        });
        it("with \"www.bing.com:123/index.html?a=1\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com:123/index.html?a=1").toString(), "www.bing.com:123/index.html?a=1");
        });
        it("with \"https://www.bing.com:987/my/path/again?a=1\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com:987/my/path/again?a=1").toString(), "https://www.bing.com:987/my/path/again?a=1");
        });
        it("with \"www.bing.com?a=1&b=2\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com?a=1&b=2").toString(), "www.bing.com?a=1&b=2");
        });
        it("with \"https://www.bing.com?a=1&b=2\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com?a=1&b=2").toString(), "https://www.bing.com?a=1&b=2");
        });
        it("with \"www.bing.com:123?a=1&b=2\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com:123?a=1&b=2").toString(), "www.bing.com:123?a=1&b=2");
        });
        it("with \"https://www.bing.com:987?a=1&b=2\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com:987?a=1&b=2").toString(), "https://www.bing.com:987?a=1&b=2");
        });
        it("with \"www.bing.com/folder/index.html?a=1&b=2\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com/folder/index.html?a=1&b=2").toString(), "www.bing.com/folder/index.html?a=1&b=2");
        });
        it("with \"https://www.bing.com/image.gif?a=1&b=2\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com/image.gif?a=1&b=2").toString(), "https://www.bing.com/image.gif?a=1&b=2");
        });
        it("with \"www.bing.com:123/index.html?a=1&b=2\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("www.bing.com:123/index.html?a=1&b=2").toString(), "www.bing.com:123/index.html?a=1&b=2");
        });
        it("with \"https://www.bing.com:987/my/path/again?a=1&b=2\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com:987/my/path/again?a=1&b=2").toString(), "https://www.bing.com:987/my/path/again?a=1&b=2");
        });
        it("with \"https://www.bing.com/my:/path\"", function () {
            assert.strictEqual(url_1.URLBuilder.parse("https://www.bing.com/my:/path").toString(), "https://www.bing.com/my:/path");
        });
    });
    describe("replaceAll()", function () {
        it("with undefined path, \"{arg}\" searchValue, and \"cats\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath(undefined);
            urlBuilder.replaceAll("{arg}", "cats");
            assert.strictEqual(urlBuilder.getPath(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("with \"\" path, \"{arg}\" searchValue, and \"cats\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("");
            urlBuilder.replaceAll("{arg}", "cats");
            assert.strictEqual(urlBuilder.getPath(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("with \"my/really/cool/path\" path, \"\" searchValue, and \"cats\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("my/really/cool/path");
            urlBuilder.replaceAll("", "cats");
            assert.strictEqual(urlBuilder.getPath(), "my/really/cool/path");
            assert.strictEqual(urlBuilder.toString(), "/my/really/cool/path");
        });
        it("with \"my/really/cool/path\" path, \"y\" searchValue, and \"z\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("my/really/cool/path");
            urlBuilder.replaceAll("y", "z");
            assert.strictEqual(urlBuilder.getPath(), "mz/reallz/cool/path");
            assert.strictEqual(urlBuilder.toString(), "/mz/reallz/cool/path");
        });
        it("with \"my/really/cool/path\" path, \"y\" searchValue, and \"\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setPath("my/really/cool/path");
            urlBuilder.replaceAll("y", "");
            assert.strictEqual(urlBuilder.getPath(), "m/reall/cool/path");
            assert.strictEqual(urlBuilder.toString(), "/m/reall/cool/path");
        });
        it("with undefined query, \"A\" searchValue, and \"Z\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQuery(undefined);
            urlBuilder.replaceAll("A", "Z");
            assert.strictEqual(urlBuilder.getQuery(), undefined);
            assert.strictEqual(urlBuilder.toString(), "");
        });
        it("with \"A=B&C=D&E=A\" query, \"\" searchValue, and \"Z\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQuery("A=B&C=D&E=A");
            urlBuilder.replaceAll("", "Z");
            assert.strictEqual(urlBuilder.getQuery(), "A=B&C=D&E=A");
            assert.strictEqual(urlBuilder.toString(), "?A=B&C=D&E=A");
        });
        it("with \"A=B&C=D&E=A\" query, \"A\" searchValue, and \"\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQuery("A=B&C=D&E=A");
            urlBuilder.replaceAll("A", "");
            assert.strictEqual(urlBuilder.getQuery(), "C=D&E=");
            assert.strictEqual(urlBuilder.toString(), "?C=D&E=");
        });
        it("with \"A=B&C=D&E=A\" query, \"A\" searchValue, and \"Z\" replaceValue", function () {
            var urlBuilder = new url_1.URLBuilder();
            urlBuilder.setQuery("A=B&C=D&E=A");
            urlBuilder.replaceAll("A", "Z");
            assert.strictEqual(urlBuilder.getQuery(), "Z=B&C=D&E=Z");
            assert.strictEqual(urlBuilder.toString(), "?Z=B&C=D&E=Z");
        });
    });
});
describe("URLTokenizer", function () {
    it("should not have a current token when first created", function () {
        var tokenizer = new url_1.URLTokenizer("http://www.bing.com");
        assert.strictEqual(tokenizer.current(), undefined);
    });
    describe("next()", function () {
        function nextTest(text, expectedURLTokens) {
            var tokenizer = new url_1.URLTokenizer(text);
            if (expectedURLTokens) {
                for (var i = 0; i < expectedURLTokens.length; ++i) {
                    assert.strictEqual(tokenizer.next(), true, "Expected to find " + expectedURLTokens.length + " URLTokens, but found " + i + " instead.");
                    assert.deepEqual(tokenizer.current(), expectedURLTokens[i], "Expected the " + (i + 1) + " URLToken to be " + JSON.stringify(expectedURLTokens[i]) + ", but found " + JSON.stringify(tokenizer.current()) + " instead.");
                }
            }
            assert.strictEqual(tokenizer.next(), false, "Only expected to find " + (expectedURLTokens ? expectedURLTokens.length : 0) + " URL token(s).");
            assert.strictEqual(tokenizer.current(), undefined, "After reading all of the URLTokens, expected the current value to be undefined.");
        }
        it("with \"\"", function () {
            nextTest("", []);
        });
        it("with \"http\"", function () {
            nextTest("http", [
                url_1.URLToken.host("http")
            ]);
        });
        it("with \"http:\"", function () {
            nextTest("http:", [
                url_1.URLToken.host("http"),
                url_1.URLToken.port("")
            ]);
        });
        it("with \"http:/\"", function () {
            nextTest("http:/", [
                url_1.URLToken.host("http"),
                url_1.URLToken.port(""),
                url_1.URLToken.path("/")
            ]);
        });
        it("with \"http://\"", function () {
            nextTest("http://", [
                url_1.URLToken.scheme("http"),
                url_1.URLToken.host("")
            ]);
        });
        it("with \"https://www.example.com\"", function () {
            nextTest("https://www.example.com", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com")
            ]);
        });
        it("with \"https://www.example.com:\"", function () {
            nextTest("https://www.example.com:", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.port("")
            ]);
        });
        it("with \"https://www.example.com:8080\"", function () {
            nextTest("https://www.example.com:8080", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.port("8080")
            ]);
        });
        it("with \"ftp://www.bing.com:123/\"", function () {
            nextTest("ftp://www.bing.com:123/", [
                url_1.URLToken.scheme("ftp"),
                url_1.URLToken.host("www.bing.com"),
                url_1.URLToken.port("123"),
                url_1.URLToken.path("/")
            ]);
        });
        it("with \"ftp://www.bing.com:123/a/b/c.txt\"", function () {
            nextTest("ftp://www.bing.com:123/a/b/c.txt", [
                url_1.URLToken.scheme("ftp"),
                url_1.URLToken.host("www.bing.com"),
                url_1.URLToken.port("123"),
                url_1.URLToken.path("/a/b/c.txt")
            ]);
        });
        it("with \"ftp://www.bing.com:123?\"", function () {
            nextTest("ftp://www.bing.com:123?", [
                url_1.URLToken.scheme("ftp"),
                url_1.URLToken.host("www.bing.com"),
                url_1.URLToken.port("123"),
                url_1.URLToken.query("")
            ]);
        });
        it("with \"ftp://www.bing.com:123?a=b&c=d\"", function () {
            nextTest("ftp://www.bing.com:123?a=b&c=d", [
                url_1.URLToken.scheme("ftp"),
                url_1.URLToken.host("www.bing.com"),
                url_1.URLToken.port("123"),
                url_1.URLToken.query("a=b&c=d")
            ]);
        });
        it("with \"https://www.example.com/\"", function () {
            nextTest("https://www.example.com/", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.path("/")
            ]);
        });
        it("with \"https://www.example.com/index.html\"", function () {
            nextTest("https://www.example.com/index.html", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.path("/index.html")
            ]);
        });
        it("with \"https://www.example.com/index.html?\"", function () {
            nextTest("https://www.example.com/index.html?", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.path("/index.html"),
                url_1.URLToken.query("")
            ]);
        });
        it("with \"https://www.example.com/index.html?\"", function () {
            nextTest("https://www.example.com/index.html?", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.path("/index.html"),
                url_1.URLToken.query("")
            ]);
        });
        it("with \"https://www.example.com/index.html?alpha=beta\"", function () {
            nextTest("https://www.example.com/index.html?alpha=beta", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.path("/index.html"),
                url_1.URLToken.query("alpha=beta")
            ]);
        });
        it("with \"https://www.example.com?\"", function () {
            nextTest("https://www.example.com?", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.query("")
            ]);
        });
        it("with \"https://www.example.com?a=b\"", function () {
            nextTest("https://www.example.com?a=b", [
                url_1.URLToken.scheme("https"),
                url_1.URLToken.host("www.example.com"),
                url_1.URLToken.query("a=b")
            ]);
        });
        it("with \"www.test.com/\"", function () {
            nextTest("www.test.com/", [
                url_1.URLToken.host("www.test.com"),
                url_1.URLToken.path("/")
            ]);
        });
        it("with \"www.test.com?\"", function () {
            nextTest("www.test.com?", [
                url_1.URLToken.host("www.test.com"),
                url_1.URLToken.query("")
            ]);
        });
        it("with \"folder/index.html\"", function () {
            nextTest("folder/index.html", [
                url_1.URLToken.host("folder"),
                url_1.URLToken.path("/index.html")
            ]);
        });
        it("with \"/folder/index.html\"", function () {
            nextTest("/folder/index.html", [
                url_1.URLToken.host(""),
                url_1.URLToken.path("/folder/index.html")
            ]);
        });
    });
});
//# sourceMappingURL=urlTests.js.map