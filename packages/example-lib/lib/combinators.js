"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var compose = exports.compose = function compose(a) {
  return function (b) {
    return function (c) {
      return a(b(c));
    };
  };
};
var pipe = exports.pipe = function pipe(fns) {
  return function (x) {
    return fns.reduce(function (fn, v) {
      return fn(v);
    }, x);
  };
};
var blackbird = exports.blackbird = compose(compose)(compose);