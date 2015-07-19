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
              if (!event.__reported) {
                exports.Egg.apply(this, arguments);
                Object.defineProperty(event, '__reported', {
                  value: true,
                  writable: true
                })
              }
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
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6WyJleHBvcnRzIiwiRWdnIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm90byIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJFdmVudFRhcmdldCIsInByb3RvdHlwZSIsIk5vZGUiLCJ0eXBlIiwibGlzdGVuZXIiLCJ1c2VDYXB0dXJlIiwibCIsIm5lc3QiLCJldmVudCIsImUiLCJfX3JlcG9ydGVkIiwiYXBwbHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJfZXJyb3IiLCJjYWxsIiwiX19uZXN0IiwiVGFyZ2V0IiwidHlwZXMiLCJldmVudHMiLCJpIiwibGVuIiwicmVzdWx0cyIsInNwbGl0IiwibGVuZ3RoIiwid2luZG93IiwiY3Vja29vIiwibW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxJQUFBQSxPQUFBLEM7SUFBQUEsTztNQUNFQyxHQUFBLEVBQUs7QUFBQSxRLE9BQ0hDLE9BQUEsQ0FBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDQyxTQUFoQyxDQURHO0FBQUEsTzs7SUFHSjtBQUFBLE1BQ0QsSUFBQUMsZ0JBQUEsRUFBQUMsS0FBQSxFQUFBQyxtQkFBQSxDQURDO0FBQUEsTSxJQUNFLE9BQUFDLFdBQUEsb0JBQUFBLFdBQUEsUyxFQUFIO0FBQUEsUUFDRUYsS0FBQSxHQUFRRSxXQUFBLENBQVlDLFNBRHRCO0FBQUEsTyxVQUVRLE9BQUFDLElBQUEsb0JBQUFBLElBQUEsUyxFQUFIO0FBQUEsUUFDSEosS0FBQSxHQUFRSSxJQUFBLENBQUtELFNBRFY7QUFBQSxPOzs7WUFHSFAsT0FBQSxDQUFTQyxHQUFULENBQWMsa0NBQWQsQzs7O1FBQ0EsTTtPQVBEO0FBQUEsTSxJQVNFRyxLO1lBQ0dBLEtBQUEsQ0FBQUQsZ0JBQUEsUTs7O2NBQ0ZILE9BQUEsQ0FBU0MsR0FBVCxDQUFjLDZCQUFkLEM7OztVQUNBLE07O1lBQ0VHLEtBQUEsQ0FBQUMsbUJBQUEsUTs7O2NBQ0ZMLE9BQUEsQ0FBU0MsR0FBVCxDQUFjLGdDQUFkLEM7OztVQUNBLE07O1FBRUZFLGdCQUFBLEdBQW1CQyxLQUFBLENBQU1ELGdCQUF6QixDO1FBQ0FDLEtBQUEsQ0FBTUQsZ0JBQU4sR0FBeUIsVUFBQ00sSUFBRCxFQUFPQyxRQUFQLEVBQWlCQyxVQUFqQjtBQUFBLFVBQ3ZCLElBQUFDLENBQUEsRUFBQUMsSUFBQSxDQUR1QjtBQUFBLFVBQ3ZCRCxDQUFBLEdBQUlGLFFBQUosQ0FEdUI7QUFBQSxVQUd2QkcsSUFBQSxHQUFPLFVBQUNDLEtBQUQ7QUFBQSxZQUNMLElBQUFDLENBQUEsQ0FESztBQUFBLFksSUFDTDtBQUFBLGNBQ0UsSUFBRyxDQUFDRCxLQUFBLENBQU1FLFVBQVY7QUFBQSxnQkFDRWxCLE9BQUEsQ0FBUUMsR0FBUixDQUFZa0IsS0FBWixDQUFrQixJQUFsQixFQUFxQmYsU0FBckIsRUFERjtBQUFBLGdCQUVFZ0IsTUFBQSxDQUFPQyxjQUFQLENBQXNCTCxLQUF0QixFQUE2QixZQUE3QixFQUNFO0FBQUEsa0JBQUFNLEtBQUEsRUFBTyxJQUFQO0FBQUEsa0JBQ0FDLFFBQUEsRUFBVSxJQURWO0FBQUEsaUJBREYsQ0FGRjtBQUFBLGVBREY7QUFBQSxhLFFBQUFDLE07Y0FNTVAsQ0FBQSxHQUFBTyxNO2FBUEQ7QUFBQSxZQVVMVixDQUFBLENBQUVLLEtBQUYsQ0FBUSxJQUFSLEVBQVdmLFNBQVgsRUFWSztBQUFBLFksSUFZTDtBQUFBLGMsT0FDRWdCLE1BQUEsQ0FBT0MsY0FBUCxDQUFzQlAsQ0FBdEIsRUFBeUIsUUFBekIsRUFDRTtBQUFBLGdCQUFBUSxLQUFBLEVBQU9QLElBQVA7QUFBQSxnQkFDQVEsUUFBQSxFQUFVLElBRFY7QUFBQSxlQURGLENBREY7QUFBQSxhLFFBQUFDLE07YUFaSztBQUFBLFdBQVAsQ0FIdUI7QUFBQSxVLE9BcUJ2Qm5CLGdCQUFBLENBQWlCb0IsSUFBakIsQ0FBc0IsSUFBdEIsRUFBeUJkLElBQXpCLEVBQStCSSxJQUEvQixFQUFxQ0YsVUFBckMsQ0FyQnVCO0FBQUEsU0FBekIsQztRQXVCQU4sbUJBQUEsR0FBc0JELEtBQUEsQ0FBTUMsbUJBQTVCLEM7UUFDQUQsS0FBQSxDQUFNQyxtQkFBTixHQUE0QixVQUFDSSxJQUFELEVBQU9DLFFBQVAsRUFBaUJDLFVBQWpCO0FBQUEsVUFDMUIsSUFBQUUsSUFBQSxDQUQwQjtBQUFBLFUsSUFDMUI7QUFBQSxZQUNFQSxJQUFBLEdBQU9ILFFBQUEsQ0FBU2MsTUFEbEI7QUFBQSxXLFFBQUFGLE07V0FEMEI7QUFBQSxVLElBS05ULElBQUEsUTtZQUFwQkEsSUFBQSxHQUFPSCxRO1dBTG1CO0FBQUEsVSxPQU8xQkwsbUJBQUEsQ0FBb0JJLElBQXBCLEVBQTBCSSxJQUExQixFQUFnQ0YsVUFBaEMsQ0FQMEI7QUFBQSxTO09BMUM3QjtBQUFBLE1BbUREYixPQUFBLENBQVEyQixNQUFSLEdBQWlCLFVBQUNDLEtBQUQ7QUFBQSxRQUNmLElBQUFaLEtBQUEsRUFBQWEsTUFBQSxFQUFBQyxDQUFBLEVBQUFDLEdBQUEsRUFBQUMsT0FBQSxDQURlO0FBQUEsUUFDZkgsTUFBQSxHQUFTRCxLQUFBLENBQU1LLEtBQU4sQ0FBWSxHQUFaLENBQVQsQ0FEZTtBQUFBLFFBRWZELE9BQUEsTUFGZTtBQUFBLFEsS0FFZkYsQ0FBQSxNQUFBQyxHQUFBLEdBQUFGLE1BQUEsQ0FBQUssTSxFQUFBSixDQUFBLEdBQUFDLEcsRUFBQUQsQ0FBQSxFLEVBQUE7QUFBQSxVLGtCQUFBO0FBQUEsVSxhQUNFSyxNQUFBLENBQU85QixnQkFBUCxDQUF3QlcsS0FBeEIsRUFBK0I7QUFBQSxZLE9BQzdCaEIsT0FBQSxDQUFRQyxHQUFSLENBQVlrQixLQUFaLENBQWtCbkIsT0FBQSxDQUFRQyxHQUExQixFQUErQkcsU0FBL0IsQ0FENkI7QUFBQSxXQUEvQixDLENBREY7QUFBQSxTQUZlO0FBQUEsUSxjQUFBO0FBQUEsT0FBakIsQ0FuREM7QUFBQSxNLElBMEQwQixPQUFBK0IsTUFBQSxvQkFBQUEsTUFBQSxTO2VBQTNCQSxNQUFBLENBQU9DLE1BQVAsR0FBZ0JwQyxPO09BMURmO0FBQUEsUztJQTRESHFDLE1BQUEsQ0FBT3JDLE9BQVAsR0FBaUJBLE8iLCJzb3VyY2VSb290IjoiL3NyYyJ9
