(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {};

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DummyReact_1 = require("./DummyReact");
var MyButton = /** @class */ (function () {
    function MyButton() {
        this.clickHandler = this.clickHandler.bind(this);
    }
    MyButton.prototype.clickHandler = function () {
        console.log('Button clicked');
    };
    MyButton.prototype.render = function () {
        return DummyReact_1.default.createElement("button", { onClick: this.clickHandler });
    };
    return MyButton;
}());
exports.default = MyButton;

},{"./DummyReact":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DummyReact_1 = require("./DummyReact");
var MyButton_1 = require("./MyButton");
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.render = function () {
        return (DummyReact_1.default.createElement("div", null,
            "Hello ",
            DummyReact_1.default.createElement(MyButton_1.default, null)));
    };
    return App;
}());

},{"./DummyReact":1,"./MyButton":2}]},{},[3]);
