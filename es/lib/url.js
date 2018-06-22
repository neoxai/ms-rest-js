// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { replaceAll } from "./util/utils";
/**
 * A class that handles the query portion of a URLBuilder.
 */
var URLQuery = /** @class */ (function () {
    function URLQuery() {
        this._rawQuery = {};
    }
    /**
     * Get whether or not there any query parameters in this URLQuery.
     */
    URLQuery.prototype.any = function () {
        return Object.keys(this._rawQuery).length > 0;
    };
    /**
     * Set a query parameter with the provided name and value. If the parameterValue is undefined or
     * empty, then this will attempt to remove an existing query parameter with the provided
     * parameterName.
     */
    URLQuery.prototype.set = function (parameterName, parameterValue) {
        if (parameterName) {
            if (parameterValue != undefined) {
                this._rawQuery[parameterName] = parameterValue.toString();
            }
            else {
                delete this._rawQuery[parameterName];
            }
        }
    };
    /**
     * Get the value of the query parameter with the provided name. If no parameter exists with the
     * provided parameter name, then undefined will be returned.
     */
    URLQuery.prototype.get = function (parameterName) {
        return parameterName ? this._rawQuery[parameterName] : undefined;
    };
    /**
     * Get the string representation of this query. The return value will not start with a "?".
     */
    URLQuery.prototype.toString = function () {
        var result = "";
        for (var parameterName in this._rawQuery) {
            if (result) {
                result += "&";
            }
            result += parameterName + "=" + this._rawQuery[parameterName];
        }
        return result;
    };
    /**
     * Parse a URLQuery from the provided text.
     */
    URLQuery.parse = function (text) {
        var result = new URLQuery();
        if (text) {
            if (text.startsWith("?")) {
                text = text.substring(1);
            }
            var currentState = 0 /* parameterName */;
            var parameterName = "";
            var parameterValue = "";
            for (var i = 0; i < text.length; ++i) {
                var currentCharacter = text[i];
                switch (currentState) {
                    case 0 /* parameterName */:
                        switch (currentCharacter) {
                            case "=":
                                currentState = 1 /* parameterValue */;
                                break;
                            case "&":
                                parameterName = "";
                                parameterValue = "";
                                break;
                            default:
                                parameterName += currentCharacter;
                                break;
                        }
                        break;
                    case 1 /* parameterValue */:
                        switch (currentCharacter) {
                            case "=":
                                parameterName = "";
                                parameterValue = "";
                                currentState = 2 /* invalid */;
                                break;
                            case "&":
                                result.set(parameterName, parameterValue);
                                parameterName = "";
                                parameterValue = "";
                                currentState = 0 /* parameterName */;
                                break;
                            default:
                                parameterValue += currentCharacter;
                                break;
                        }
                        break;
                    case 2 /* invalid */:
                        if (currentCharacter === "&") {
                            currentState = 0 /* parameterName */;
                        }
                        break;
                    default:
                        throw new Error("Unrecognized URLQuery parse state: " + currentState);
                }
            }
            if (currentState === 1 /* parameterValue */) {
                result.set(parameterName, parameterValue);
            }
        }
        return result;
    };
    return URLQuery;
}());
export { URLQuery };
/**
 * A class that handles creating, modifying, and parsing URLs.
 */
var URLBuilder = /** @class */ (function () {
    function URLBuilder() {
    }
    /**
     * Set the scheme/protocol for this URL. If the provided scheme contains other parts of a URL
     * (such as a host, port, path, or query), those parts will be added to this URL as well.
     */
    URLBuilder.prototype.setScheme = function (scheme) {
        if (!scheme) {
            this._scheme = undefined;
        }
        else {
            this.set(scheme, 0 /* SCHEME */);
        }
    };
    /**
     * Get the scheme that has been set in this URL.
     */
    URLBuilder.prototype.getScheme = function () {
        return this._scheme;
    };
    /**
     * Set the host for this URL. If the provided host contains other parts of a URL (such as a
     * port, path, or query), those parts will be added to this URL as well.
     */
    URLBuilder.prototype.setHost = function (host) {
        if (!host) {
            this._host = undefined;
        }
        else {
            this.set(host, 1 /* SCHEME_OR_HOST */);
        }
    };
    /**
     * Get the host that has been set in this URL.
     */
    URLBuilder.prototype.getHost = function () {
        return this._host;
    };
    /**
     * Set the port for this URL. If the provided port contains other parts of a URL (such as a
     * path or query), those parts will be added to this URL as well.
     */
    URLBuilder.prototype.setPort = function (port) {
        if (port == undefined || port === "") {
            this._port = undefined;
        }
        else {
            this.set(port.toString(), 3 /* PORT */);
        }
    };
    /**
     * Get the port that has been set in this URL.
     */
    URLBuilder.prototype.getPort = function () {
        return this._port;
    };
    /**
     * Set the path for this URL. If the provided path contains a query, then it will be added to
     * this URL as well.
     */
    URLBuilder.prototype.setPath = function (path) {
        if (!path) {
            this._path = undefined;
        }
        else {
            if (path.indexOf("://") !== -1) {
                this.set(path, 0 /* SCHEME */);
            }
            else {
                this.set(path, 4 /* PATH */);
            }
        }
    };
    /**
     * Get the path that has been set in this URL.
     */
    URLBuilder.prototype.getPath = function () {
        return this._path;
    };
    /**
     * Set the query in this URL.
     */
    URLBuilder.prototype.setQuery = function (query) {
        if (!query) {
            this._query = undefined;
        }
        else {
            this._query = URLQuery.parse(query);
        }
    };
    /**
     * Set a query parameter with the provided name and value in this URL's query. If the provided
     * query parameter value is undefined or empty, then the query parameter will be removed if it
     * existed.
     */
    URLBuilder.prototype.setQueryParameter = function (queryParameterName, queryParameterValue) {
        if (queryParameterName) {
            if (!this._query) {
                this._query = new URLQuery();
            }
            this._query.set(queryParameterName, queryParameterValue);
        }
    };
    /**
     * Get the value of the query parameter with the provided query parameter name. If no query
     * parameter exists with the provided name, then undefined will be returned.
     */
    URLBuilder.prototype.getQueryParameterValue = function (queryParameterName) {
        return this._query ? this._query.get(queryParameterName) : undefined;
    };
    /**
     * Get the query in this URL.
     */
    URLBuilder.prototype.getQuery = function () {
        return this._query ? this._query.toString() : undefined;
    };
    /**
     * Set the parts of this URL by parsing the provided text using the provided startState.
     */
    URLBuilder.prototype.set = function (text, startState) {
        var tokenizer = new URLTokenizer(text, startState);
        while (tokenizer.next()) {
            var token = tokenizer.current();
            if (token) {
                switch (token.type) {
                    case 0 /* SCHEME */:
                        this._scheme = token.text || undefined;
                        break;
                    case 1 /* HOST */:
                        this._host = token.text || undefined;
                        break;
                    case 2 /* PORT */:
                        this._port = token.text || undefined;
                        break;
                    case 3 /* PATH */:
                        var tokenPath = token.text || undefined;
                        if (!this._path || this._path === "/" || tokenPath !== "/") {
                            this._path = tokenPath;
                        }
                        break;
                    case 4 /* QUERY */:
                        this._query = URLQuery.parse(token.text);
                        break;
                    default:
                        throw new Error("Unrecognized URLTokenType: " + token.type);
                }
            }
        }
    };
    URLBuilder.prototype.toString = function () {
        var result = "";
        if (this._scheme) {
            result += this._scheme + "://";
        }
        if (this._host) {
            result += this._host;
        }
        if (this._port) {
            result += ":" + this._port;
        }
        if (this._path) {
            if (!this._path.startsWith("/")) {
                result += "/";
            }
            result += this._path;
        }
        if (this._query && this._query.any()) {
            result += "?" + this._query.toString();
        }
        return result;
    };
    /**
     * If the provided searchValue is found in this URLBuilder, then replace it with the provided
     * replaceValue.
     */
    URLBuilder.prototype.replaceAll = function (searchValue, replaceValue) {
        if (searchValue) {
            this.setScheme(replaceAll(this.getScheme(), searchValue, replaceValue));
            this.setHost(replaceAll(this.getHost(), searchValue, replaceValue));
            this.setPort(replaceAll(this.getPort(), searchValue, replaceValue));
            this.setPath(replaceAll(this.getPath(), searchValue, replaceValue));
            this.setQuery(replaceAll(this.getQuery(), searchValue, replaceValue));
        }
    };
    URLBuilder.parse = function (text) {
        var result = new URLBuilder();
        result.set(text, 1 /* SCHEME_OR_HOST */);
        return result;
    };
    return URLBuilder;
}());
export { URLBuilder };
var URLToken = /** @class */ (function () {
    function URLToken(text, type) {
        this.text = text;
        this.type = type;
    }
    URLToken.scheme = function (text) {
        return new URLToken(text, 0 /* SCHEME */);
    };
    URLToken.host = function (text) {
        return new URLToken(text, 1 /* HOST */);
    };
    URLToken.port = function (text) {
        return new URLToken(text, 2 /* PORT */);
    };
    URLToken.path = function (text) {
        return new URLToken(text, 3 /* PATH */);
    };
    URLToken.query = function (text) {
        return new URLToken(text, 4 /* QUERY */);
    };
    return URLToken;
}());
export { URLToken };
/**
 * Get whether or not the provided character (single character string) is an alphanumeric (letter or
 * digit) character.
 */
export function isAlphaNumericCharacter(character) {
    var characterCode = character.charCodeAt(0);
    return (48 /* '0' */ <= characterCode && characterCode <= 57 /* '9' */) ||
        (65 /* 'A' */ <= characterCode && characterCode <= 90 /* 'Z' */) ||
        (97 /* 'a' */ <= characterCode && characterCode <= 122 /* 'z' */);
}
/**
 * A class that tokenizes URL strings.
 */
var URLTokenizer = /** @class */ (function () {
    function URLTokenizer(_text, state) {
        this._text = _text;
        this._textLength = _text ? _text.length : 0;
        this._currentState = state != undefined ? state : 1 /* SCHEME_OR_HOST */;
        this._currentIndex = 0;
    }
    /**
     * Get the current URLToken this URLTokenizer is pointing at, or undefined if the URLTokenizer
     * hasn't started or has finished tokenizing.
     */
    URLTokenizer.prototype.current = function () {
        return this._currentToken;
    };
    /**
     * Advance to the next URLToken and return whether or not a URLToken was found.
     */
    URLTokenizer.prototype.next = function () {
        if (!hasCurrentCharacter(this)) {
            this._currentToken = undefined;
        }
        else {
            switch (this._currentState) {
                case 0 /* SCHEME */:
                    nextScheme(this);
                    break;
                case 1 /* SCHEME_OR_HOST */:
                    nextSchemeOrHost(this);
                    break;
                case 2 /* HOST */:
                    nextHost(this);
                    break;
                case 3 /* PORT */:
                    nextPort(this);
                    break;
                case 4 /* PATH */:
                    nextPath(this);
                    break;
                case 5 /* QUERY */:
                    nextQuery(this);
                    break;
                default:
                    throw new Error("Unrecognized URLTokenizerState: " + this._currentState);
            }
        }
        return !!this._currentToken;
    };
    return URLTokenizer;
}());
export { URLTokenizer };
/**
 * Read the remaining characters from this Tokenizer's character stream.
 */
function readRemaining(tokenizer) {
    var result = "";
    if (tokenizer._currentIndex < tokenizer._textLength) {
        result = tokenizer._text.substring(tokenizer._currentIndex);
        tokenizer._currentIndex = tokenizer._textLength;
    }
    return result;
}
/**
 * Whether or not this URLTokenizer has a current character.
 */
function hasCurrentCharacter(tokenizer) {
    return tokenizer._currentIndex < tokenizer._textLength;
}
/**
 * Get the character in the text string at the current index.
 */
function getCurrentCharacter(tokenizer) {
    return tokenizer._text[tokenizer._currentIndex];
}
/**
 * Advance to the character in text that is "step" characters ahead. If no step value is provided,
 * then step will default to 1.
 */
function nextCharacter(tokenizer, step) {
    if (hasCurrentCharacter(tokenizer)) {
        if (!step) {
            step = 1;
        }
        tokenizer._currentIndex += step;
    }
}
/**
 * Starting with the current character, peek "charactersToPeek" number of characters ahead in this
 * Tokenizer's stream of characters.
 */
function peekCharacters(tokenizer, charactersToPeek) {
    var endIndex = tokenizer._currentIndex + charactersToPeek;
    if (tokenizer._textLength < endIndex) {
        endIndex = tokenizer._textLength;
    }
    return tokenizer._text.substring(tokenizer._currentIndex, endIndex);
}
/**
 * Read characters from this Tokenizer until the end of the stream or until the provided condition
 * is false when provided the current character.
 */
function readWhile(tokenizer, condition) {
    var result = "";
    while (hasCurrentCharacter(tokenizer)) {
        var currentCharacter = getCurrentCharacter(tokenizer);
        if (!condition(currentCharacter)) {
            break;
        }
        else {
            result += currentCharacter;
            nextCharacter(tokenizer);
        }
    }
    return result;
}
/**
 * Read characters from this Tokenizer until a non-alphanumeric character or the end of the
 * character stream is reached.
 */
function readWhileLetterOrDigit(tokenizer) {
    return readWhile(tokenizer, function (character) { return isAlphaNumericCharacter(character); });
}
/**
 * Read characters from this Tokenizer until one of the provided terminating characters is read or
 * the end of the character stream is reached.
 */
function readUntilCharacter(tokenizer) {
    var terminatingCharacters = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        terminatingCharacters[_i - 1] = arguments[_i];
    }
    return readWhile(tokenizer, function (character) { return terminatingCharacters.indexOf(character) === -1; });
}
function nextScheme(tokenizer) {
    var scheme = readWhileLetterOrDigit(tokenizer);
    tokenizer._currentToken = URLToken.scheme(scheme);
    if (!hasCurrentCharacter(tokenizer)) {
        tokenizer._currentState = 6 /* DONE */;
    }
    else {
        tokenizer._currentState = 2 /* HOST */;
    }
}
function nextSchemeOrHost(tokenizer) {
    var schemeOrHost = readUntilCharacter(tokenizer, ":", "/", "?");
    if (!hasCurrentCharacter(tokenizer)) {
        tokenizer._currentToken = URLToken.host(schemeOrHost);
        tokenizer._currentState = 6 /* DONE */;
    }
    else if (getCurrentCharacter(tokenizer) === ":") {
        if (peekCharacters(tokenizer, 3) === "://") {
            tokenizer._currentToken = URLToken.scheme(schemeOrHost);
            tokenizer._currentState = 2 /* HOST */;
        }
        else {
            tokenizer._currentToken = URLToken.host(schemeOrHost);
            tokenizer._currentState = 3 /* PORT */;
        }
    }
    else {
        tokenizer._currentToken = URLToken.host(schemeOrHost);
        if (getCurrentCharacter(tokenizer) === "/") {
            tokenizer._currentState = 4 /* PATH */;
        }
        else {
            tokenizer._currentState = 5 /* QUERY */;
        }
    }
}
function nextHost(tokenizer) {
    if (peekCharacters(tokenizer, 3) === "://") {
        nextCharacter(tokenizer, 3);
    }
    var host = readUntilCharacter(tokenizer, ":", "/", "?");
    tokenizer._currentToken = URLToken.host(host);
    if (!hasCurrentCharacter(tokenizer)) {
        tokenizer._currentState = 6 /* DONE */;
    }
    else if (getCurrentCharacter(tokenizer) === ":") {
        tokenizer._currentState = 3 /* PORT */;
    }
    else if (getCurrentCharacter(tokenizer) === "/") {
        tokenizer._currentState = 4 /* PATH */;
    }
    else {
        tokenizer._currentState = 5 /* QUERY */;
    }
}
function nextPort(tokenizer) {
    if (getCurrentCharacter(tokenizer) === ":") {
        nextCharacter(tokenizer);
    }
    var port = readUntilCharacter(tokenizer, "/", "?");
    tokenizer._currentToken = URLToken.port(port);
    if (!hasCurrentCharacter(tokenizer)) {
        tokenizer._currentState = 6 /* DONE */;
    }
    else if (getCurrentCharacter(tokenizer) === "/") {
        tokenizer._currentState = 4 /* PATH */;
    }
    else {
        tokenizer._currentState = 5 /* QUERY */;
    }
}
function nextPath(tokenizer) {
    var path = readUntilCharacter(tokenizer, "?");
    tokenizer._currentToken = URLToken.path(path);
    if (!hasCurrentCharacter(tokenizer)) {
        tokenizer._currentState = 6 /* DONE */;
    }
    else {
        tokenizer._currentState = 5 /* QUERY */;
    }
}
function nextQuery(tokenizer) {
    if (getCurrentCharacter(tokenizer) === "?") {
        nextCharacter(tokenizer);
    }
    var query = readRemaining(tokenizer);
    tokenizer._currentToken = URLToken.query(query);
    tokenizer._currentState = 6 /* DONE */;
}
//# sourceMappingURL=url.js.map