(function (global) {
  var process = {
    title: 'browser',
    browser: true,
    env: {},
    argv: [],
    nextTick: function (fn) {
      setTimeout(fn, 0)
    },
    cwd: function () {
      return '/'
    },
    chdir: function () {
    }
  };
  // Require module
  function require(file, callback) {
    if ({}.hasOwnProperty.call(require.cache, file))
      return require.cache[file];
    // Handle async require
    if (typeof callback == 'function') {
      require.load(file, callback);
      return
    }
    var resolved = require.resolve(file);
    if (!resolved)
      throw new Error('Failed to resolve module ' + file);
    var module$ = {
      id: file,
      require: require,
      filename: file,
      exports: {},
      loaded: false,
      parent: null,
      children: []
    };
    var dirname = file.slice(0, file.lastIndexOf('/') + 1);
    require.cache[file] = module$.exports;
    resolved.call(module$.exports, module$, module$.exports, dirname, file);
    module$.loaded = true;
    return require.cache[file] = module$.exports
  }
  require.modules = {};
  require.cache = {};
  require.resolve = function (file) {
    return {}.hasOwnProperty.call(require.modules, file) ? require.modules[file] : void 0
  };
  // define normal static module
  require.define = function (file, fn) {
    require.modules[file] = fn
  };
  // source: /Users/zk/work/verus/cuckoo/src/index.coffee
  require.define('./index', function (module, exports, __dirname, __filename) {
    var exports;
    exports = {
      Egg: function () {
        return console.log('Egg called with ', arguments)
      }
    };
    (function () {
      var addEventListener, proto, removeEventListener;
      if (typeof EventTarget !== 'undefined' && EventTarget !== null) {
        proto = EventTarget.prototype
      } else if (typeof Node !== 'undefined' && Node !== null) {
        proto = Node.prototype
      } else {
        if (typeof console !== 'undefined' && console !== null) {
          if (typeof console.log === 'function') {
            console.log('EventTarget and Node are missing')
          }
        }
        return
      }
      if (proto) {
        if (proto.addEventListener == null) {
          if (typeof console !== 'undefined' && console !== null) {
            if (typeof console.log === 'function') {
              console.log('addEventListener is missing')
            }
          }
          return
        }
        if (proto.removeEventListener == null) {
          if (typeof console !== 'undefined' && console !== null) {
            if (typeof console.log === 'function') {
              console.log('removeEventListener is missing')
            }
          }
          return
        }
        addEventListener = proto.addEventListener;
        proto.addEventListener = function (type, listener, useCapture) {
          var l, nest;
          l = listener;
          nest = function (event) {
            var e;
            try {
              exports.Egg.apply(this, arguments)
            } catch (_error) {
              e = _error
            }
            l.apply(this, arguments);
            try {
              return Object.defineProperty(l, '__nest', {
                value: nest,
                writable: true
              })
            } catch (_error) {
            }
          };
          return addEventListener.call(this, type, nest, useCapture)
        };
        removeEventListener = proto.removeEventListener;
        proto.removeEventListener = function (type, listener, useCapture) {
          var nest;
          try {
            nest = listener.__nest
          } catch (_error) {
          }
          if (nest == null) {
            nest = listener
          }
          return removeEventListener(type, nest, useCapture)
        }
      }
      exports.Target = function (types) {
        var event, events, i, len, results;
        events = types.split(' ');
        results = [];
        for (i = 0, len = events.length; i < len; i++) {
          event = events[i];
          results.push(window.addEventListener(event, function () {
            return exports.Egg.apply(exports.Egg, arguments)
          }))
        }
        return results
      };
      if (typeof window !== 'undefined' && window !== null) {
        return window.cuckoo = exports
      }
    }());
    module.exports = exports
  });
  require('./index')
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6WyJleHBvcnRzIiwiRWdnIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm90byIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJFdmVudFRhcmdldCIsInByb3RvdHlwZSIsIk5vZGUiLCJ0eXBlIiwibGlzdGVuZXIiLCJ1c2VDYXB0dXJlIiwibCIsIm5lc3QiLCJldmVudCIsImUiLCJhcHBseSIsIl9lcnJvciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImNhbGwiLCJfX25lc3QiLCJUYXJnZXQiLCJ0eXBlcyIsImV2ZW50cyIsImkiLCJsZW4iLCJyZXN1bHRzIiwic3BsaXQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJjdWNrb28iLCJtb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsSUFBQUEsT0FBQSxDO0lBQUFBLE87TUFDRUMsR0FBQSxFQUFLO0FBQUEsUSxPQUNIQyxPQUFBLENBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ0MsU0FBaEMsQ0FERztBQUFBLE87O0lBR0o7QUFBQSxNQUNELElBQUFDLGdCQUFBLEVBQUFDLEtBQUEsRUFBQUMsbUJBQUEsQ0FEQztBQUFBLE0sSUFDRSxPQUFBQyxXQUFBLG9CQUFBQSxXQUFBLFMsRUFBSDtBQUFBLFFBQ0VGLEtBQUEsR0FBUUUsV0FBQSxDQUFZQyxTQUR0QjtBQUFBLE8sVUFFUSxPQUFBQyxJQUFBLG9CQUFBQSxJQUFBLFMsRUFBSDtBQUFBLFFBQ0hKLEtBQUEsR0FBUUksSUFBQSxDQUFLRCxTQURWO0FBQUEsTzs7O1lBR0hQLE9BQUEsQ0FBU0MsR0FBVCxDQUFjLGtDQUFkLEM7OztRQUNBLE07T0FQRDtBQUFBLE0sSUFTRUcsSztZQUNHQSxLQUFBLENBQUFELGdCQUFBLFE7OztjQUNGSCxPQUFBLENB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