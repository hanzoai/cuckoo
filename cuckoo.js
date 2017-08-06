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
  // Require a module
  function rqzt(file, callback) {
    if ({}.hasOwnProperty.call(rqzt.cache, file))
      return rqzt.cache[file];
    // Handle async require
    if (typeof callback == 'function') {
      rqzt.load(file, callback);
      return
    }
    var resolved = rqzt.resolve(file);
    if (!resolved)
      throw new Error('Failed to resolve module ' + file);
    var module$ = {
      id: file,
      rqzt: rqzt,
      filename: file,
      exports: {},
      loaded: false,
      parent: null,
      children: []
    };
    var dirname = file.slice(0, file.lastIndexOf('/') + 1);
    rqzt.cache[file] = module$.exports;
    resolved.call(module$.exports, module$, module$.exports, dirname, file);
    module$.loaded = true;
    return rqzt.cache[file] = module$.exports
  }
  rqzt.modules = {};
  rqzt.cache = {};
  rqzt.resolve = function (file) {
    return {}.hasOwnProperty.call(rqzt.modules, file) ? rqzt.modules[file] : void 0
  };
  // Define normal static module
  rqzt.define = function (file, fn) {
    rqzt.modules[file] = fn
  };
  // source: src/index.coffee
  rqzt.define('./index', function (module, exports, __dirname, __filename, process) {
    var exports;
    exports = {
      onEvent: function () {
        return console.log('onEvent called with ', arguments)
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
              if (!event.__reported) {
                exports.onEvent.apply(this, arguments);
                Object.defineProperty(event, '__reported', {
                  value: true,
                  writable: true
                })
              }
            } catch (error) {
              e = error
            }
            l.apply(this, arguments);
            try {
              return Object.defineProperty(l, '__nest', {
                value: nest,
                writable: true
              })
            } catch (error) {
            }
          };
          return addEventListener.call(this, type, nest, useCapture)
        };
        removeEventListener = proto.removeEventListener;
        proto.removeEventListener = function (type, listener, useCapture) {
          var nest;
          try {
            nest = listener.__nest
          } catch (error) {
          }
          if (nest == null) {
            nest = listener
          }
          return removeEventListener(type, nest, useCapture)
        }
      }
      exports.target = function (types) {
        var event, events, i, len, results;
        events = types.split(' ');
        results = [];
        for (i = 0, len = events.length; i < len; i++) {
          event = events[i];
          results.push(window.addEventListener(event, function () {
            return exports.onEvent.apply(exports.onEvent, arguments)
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
  rqzt('./index')
}.call(this, this))