// We wrote this ourselves
// j.k. taken from https://github.com/es-shims/es5-shim/blob/master/es5-shim.js
// We couldn't use any partial implementations because React

var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var NumberPrototype = Number.prototype;
var array_slice = ArrayPrototype.slice;
var array_splice = ArrayPrototype.splice;
var array_push = ArrayPrototype.push;
var array_unshift = ArrayPrototype.unshift;
var call = FunctionPrototype.call;
var to_string = ObjectPrototype.toString;
var Empty = function Empty() {};

var isFunction = function (val) {
  return to_string.call(val) === '[object Function]';
};

if(!Function.prototype.bind) {
  Function.prototype.bind = function bind(that) {
    var target = this;
    if (!isFunction(target)) {
      throw new TypeError('Function.prototype.bind called on incompatible ' + target);
    }
    var args = array_slice.call(arguments, 1);
    var bound;
    var binder = function () {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          args.concat(array_slice.call(arguments))
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      } else {
        return target.apply(
          that,
          args.concat(array_slice.call(arguments))
        );
      }
    };

    var boundLength = Math.max(0, target.length - args.length);

    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
      boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

    if (target.prototype) {
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }

    return bound;
  }
}
