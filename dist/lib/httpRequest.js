"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var FormData = require("form-data");
var httpHeaders_1 = require("./httpHeaders");
/**
 * An individual HTTP request that can be sent with a HttpClient.
 */
var HttpRequest = /** @class */ (function () {
    /**
     * Create a new HTTP request using the provided properties.
     * @param args The arguments that will be used to create the HTTP request.
     */
    function HttpRequest(args) {
        this.method = args.method;
        if (!args.url) {
            var urlString = (args.url == undefined ? args.url : "\"" + args.url + "\"");
            throw new Error(urlString + " is not a valid URL for a HttpRequest.");
        }
        this.url = args.url;
        this.headers = args.headers instanceof httpHeaders_1.HttpHeaders ? args.headers : new httpHeaders_1.HttpHeaders(args.headers);
        this.body = args.body;
        this.serializedBody = args.serializedBody;
        this.operationSpec = args.operationSpec;
    }
    /**
     * Update this HttpRequest from the provided form data.
     */
    HttpRequest.prototype.updateFromFormData = function (formData) {
        var requestForm = new FormData();
        var appendFormValue = function (key, value) {
            if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
                requestForm.append(key, value.value, value.options);
            }
            else {
                requestForm.append(key, value);
            }
        };
        for (var formKey in formData) {
            if (formData.hasOwnProperty(formKey)) {
                var formValue = formData[formKey];
                if (formValue instanceof Array) {
                    for (var j = 0; j < formValue.length; j++) {
                        appendFormValue(formKey, formValue[j]);
                    }
                }
                else {
                    appendFormValue(formKey, formValue);
                }
            }
        }
        this.body = requestForm;
        if (typeof requestForm.getBoundary === "function") {
            var contentType = this.headers.get("Content-Type");
            if (contentType && contentType.indexOf("multipart/form-data") > -1) {
                this.headers.set("Content-Type", "multipart/form-data; boundary=" + requestForm.getBoundary());
            }
        }
    };
    /**
     * Create a deep clone/copy of this HttpRequest.
     */
    HttpRequest.prototype.clone = function () {
        return new HttpRequest({
            method: this.method,
            url: this.url,
            headers: this.headers.clone(),
            body: this.body,
            serializedBody: this.serializedBody,
            operationSpec: this.operationSpec
        });
    };
    return HttpRequest;
}());
exports.HttpRequest = HttpRequest;
//# sourceMappingURL=httpRequest.js.map