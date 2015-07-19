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
      var addEventListener, nestId, nests, proto, removeEventListener;
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
        nestId = 0;
        nests = {};
        addEventListener = proto.addEventListener;
        proto.addEventListener = function (type, listener, useCapture) {
          var id, l, nest;
          l = listener;
          nest = function (event) {
            var e;
            try {
              exports.Egg.apply(this, arguments)
            } catch (_error) {
              e = _error
            }
            return l.apply(this, arguments)
          };
          id = l.__nestId;
          if (id == null) {
            id = nestId++;
            l.__nestId = id;
            nests[id] = {
              nest: nest,
              count: 0
            }
          }
          nests[id].count++;
          return addEventListener.call(this, type, nest, useCapture)
        };
        removeEventListener = proto.removeEventListener;
        proto.removeEventListener = function (type, listener, useCapture) {
          var id, nest, nestRecord;
          id = listener.id;
          if (id == null) {
            nest = listener
          } else {
            nestRecord = nests[id];
            nest = nestRecord.nest;
            nestRecord.count--;
            if (nestRecord.count === 0) {
              delete [nests.id]
            }
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
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6WyJleHBvcnRzIiwiRWdnIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJuZXN0SWQiLCJuZXN0cyIsInByb3RvIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkV2ZW50VGFyZ2V0IiwicHJvdG90eXBlIiwiTm9kZSIsInR5cGUiLCJsaXN0ZW5lciIsInVzZUNhcHR1cmUiLCJpZCIsImwiLCJuZXN0IiwiZXZlbnQiLCJlIiwiYXBwbHkiLCJfZXJyb3IiLCJfX25lc3RJZCIsImNvdW50IiwiY2FsbCIsIm5lc3RSZWNvcmQiLCJUYXJnZXQiLCJ0eXBlcyIsImV2ZW50cyIsImkiLCJsZW4iLCJyZXN1bHRzIiwic3BsaXQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJjdWNrb28iLCJtb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLElBQUFBLE9BQUEsQztJQUFBQSxPO01BQ0VDLEdBQUEsRUFBSztBQUFBLFEsT0FDSEMsT0FBQSxDQUFRQyxHQUFSLENBQVksa0JBQVosRUFBZ0NDLFNBQWhDLENBREc7QUFBQSxPOztJQUdKO0FBQUEsTUFDRCxJQUFBQyxnQkFBQSxFQUFBQyxNQUFBLEVBQUFDLEtBQUEsRUFBQUMsS0FBQSxFQUFBQyxtQkFBQSxDQURDO0FBQUEsTSxJQUNFLE9BQUFDLFdBQUEsb0JBQUFBLFdBQUEsUyxFQUFIO0FBQUEsUUFDRUYsS0FBQSxHQUFRRSxXQUFBLENBQVlDLFNBRHRCO0FBQUEsTyxVQUVRLE9BQUFDLElBQUEsb0JBQUFBLElBQUEsUyxFQUFIO0FBQUEsUUFDSEosS0FBQSxHQUFRSSxJQUFBLENBQUtELFNBRFY7QUFBQSxPOzs7WUFHSFQsT0FBQSxDQUFTQyxHQUFULENBQWMsa0NBQWQsQzs7O1FBQ0EsTTtPQVBEO0FBQUEsTSxJQVNFSyxLO1lBQ0dBLEtBQUEsQ0FBQUgs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