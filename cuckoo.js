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
  global.require = require;
  // source: /Users/dtai/work/verus/cuckoo/src/index.coffee
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
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6WyJleHBvcnRzIiwiRWdnIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm90byIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJFdmVudFRhcmdldCIsInByb3RvdHlwZSIsIk5vZGUiLCJ0eXBlIiwibGlzdGVuZXIiLCJ1c2VDYXB0dXJlIiwibCIsIm5lc3QiLCJldmVudCIsImUiLCJhcHBseSIsIl9lcnJvciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImNhbGwiLCJfX25lc3QiLCJUYXJnZXQiLCJ0eXBlcyIsImV2ZW50cyIsImkiLCJsZW4iLCJyZXN1bHRzIiwic3BsaXQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJjdWNrb28iLCJtb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLElBQUFBLE9BQUEsQztJQUFBQSxPO01BQ0VDLEdBQUEsRUFBSztBQUFBLFEsT0FDSEMsT0FBQSxDQUFRQyxHQUFSLENBQVksa0JBQVosRUFBZ0NDLFNBQWhDLENBREc7QUFBQSxPOztJQUdKO0FBQUEsTUFDRCxJQUFBQyxnQkFBQSxFQUFBQyxLQUFBLEVBQUFDLG1CQUFBLENBREM7QUFBQSxNLElBQ0UsT0FBQUMsV0FBQSxvQkFBQUEsV0FBQSxTLEVBQUg7QUFBQSxRQUNFRixLQUFBLEdBQVFFLFdBQUEsQ0FBWUMsU0FEdEI7QUFBQSxPLFVBRVEsT0FBQUMsSUFBQSxvQkFBQUEsSUFBQSxTLEVBQUg7QUFBQSxRQUNISixLQUFBLEdBQVFJLElBQUEsQ0FBS0QsU0FEVjtBQUFBLE87OztZQUdIUCxPQUFBLENBQVNDLEdBQVQsQ0FBYyxrQ0FBZCxDOzs7UUFDQSxNO09BUEQ7QUFBQSxNLElBU0VHLEs7WUFDR0EsS0FBQSxDQUFBRCxnQkFBQSxROzs7Y0FDRkgsT0FBQSxD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