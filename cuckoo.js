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
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6WyJleHBvcnRzIiwiRWdnIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm90byIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJFdmVudFRhcmdldCIsInByb3RvdHlwZSIsIk5vZGUiLCJ0eXBlIiwibGlzdGVuZXIiLCJ1c2VDYXB0dXJlIiwibCIsIm5lc3QiLCJldmVudCIsImUiLCJfX3JlcG9ydGVkIiwiYXBwbHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJfZXJyb3IiLCJjYWxsIiwiX19uZXN0IiwiVGFyZ2V0IiwidHlwZXMiLCJldmVudHMiLCJpIiwibGVuIiwicmVzdWx0cyIsInNwbGl0IiwibGVuZ3RoIiwid2luZG93IiwiY3Vja29vIiwibW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLElBQUFBLE9BQUEsQztJQUFBQSxPO01BQ0VDLEdBQUEsRUFBSztBQUFBLFEsT0FDSEMsT0FBQSxDQUFRQyxHQUFSLENBQVksa0JBQVosRUFBZ0NDLFNBQWhDLENBREc7QUFBQSxPOztJQUdKO0FBQUEsTUFDRCxJQUFBQyxnQkFBQSxFQUFBQyxLQUFBLEVBQUFDLG1CQUFBLENBREM7QUFBQSxNLElBQ0UsT0FBQUMsV0FBQSxvQkFBQUEsV0FBQSxTLEVBQUg7QUFBQSxRQUNFRixLQUFBLEdBQVFFLFdBQUEsQ0FBWUMsU0FEdEI7QUFBQSxPLFVBRVEsT0FBQUMsSUFBQSxvQkFBQUEsSUFBQSxTLEVBQUg7QUFBQSxRQUNISixLQUFBLEdBQVFJLElBQUEsQ0FBS0QsU0FEVjtBQUFBLE87OztZQUdIUCxPQUFBLENBQVNDLEdBQVQsQ0FBYyxrQ0FBZCxDOzs7UUFDQSxNO09BUEQ7QUFBQSxNLElBU0VHLEs7WUFDR0EsS0FBQSxDQUFBRCxnQkFBQSxROzs7Y0FDRkgsT0FBQSxDQUFTQyxHQUFULENBQWMsNkJBQWQsQzs7O1VBQ0EsTTs7WUFDRUcsS0FBQSxDQUFBQyxtQkFBQSxROzs7Y0FDRkwsT0FBQSxDQUFTQyxHQUFULENBQWMsZ0NBQWQsQzs7O1VBQ0EsTTs7UUFFRkUsZ0JBQUEsR0FBbUJDLEtBQUEsQ0FBTUQsZ0JBQXpCLEM7UUFDQUMsS0FBQSxDQUFNRCxnQkFBTixHQUF5QixVQUFDTSxJQUFELEVBQU9DLFFBQVAsRUFBaUJDLFVBQWpCO0FBQUEsVUFDdkIsSUFBQUMsQ0FBQSxFQUFBQyxJQUFBLENBRHVCO0FBQUEsVUFDdkJELENBQUEsR0FBSUYsUUFBSixDQUR1QjtBQUFBLFVBR3ZCRyxJQUFBLEdBQU8sVUFBQ0MsS0FBRDtBQUFBLFlBQ0wsSUFBQUMsQ0FBQSxDQURLO0FBQUEsWSxJQUNMO0FBQUEsY0FDRSxJQUFHLENBQUNELEtBQUEsQ0FBTUUsVUFBVjtBQUFBLGdCQUNFbEIsT0FBQSxDQUFRQyxHQUFSLENBQVlrQixLQUFaLENBQWtCLElBQWxCLEVBQXFCZixTQUFyQixFQURGO0FBQUEsZ0JBRUVnQixNQUFBLENBQU9DLGNBQVAsQ0FBc0JMLEtBQXRCLEVBQTZCLFlBQTdCLEVBQ0U7QUFBQSxrQkFBQU0sS0FBQSxFQUFPLElBQVA7QUFBQSxrQkFDQUMsUUFBQSxFQUFVLElBRFY7QUFBQSxpQkFERixDQUZGO0FBQUEsZUFERjtBQUFBLGEsUUFBQUMsTTtjQU1NUCxDQUFBLEdBQUFPLE07YUFQRDtBQUFBLFlBVUxWLENBQUEsQ0FBRUssS0FBRixDQUFRLElBQVIsRUFBV2YsU0FBWCxFQVZLO0FBQUEsWSxJQVlMO0FBQUEsYyxPQUNFZ0IsTUFBQSxDQUFPQyxjQUFQLENBQXNCUCxDQUF0QixFQUF5QixRQUF6QixFQUNFO0FBQUEsZ0JBQUFRLEtBQUEsRUFBT1AsSUFBUDtBQUFBLGdCQUNBUSxRQUFBLEVBQVUsSUFEVjtBQUFBLGVBREYsQ0FERjtBQUFBLGEsUUFBQUMsTTthQVpLO0FBQUEsV0FBUCxDQUh1QjtBQUFBLFUsT0FxQnZCbkIsZ0JBQUEsQ0FBaUJvQixJQUFqQixDQUFzQixJQUF0QixFQUF5QmQsSUFBekIsRUFBK0JJLElBQS9CLEVBQXFDRixVQUFyQyxDQXJCdUI7QUFBQSxTQUF6QixDO1FBdUJBTixtQkFBQSxHQUFzQkQsS0FBQSxDQUFNQyxtQkFBNUIsQztRQUNBRCxLQUFBLENBQU1DLG1CQUFOLEdBQTRCLFVBQUNJLElBQUQsRUFBT0MsUUFBUCxFQUFpQkMsVUFBakI7QUFBQSxVQUMxQixJQUFBRSxJQUFBLENBRDBCO0FBQUEsVSxJQUMxQjtBQUFBLFlBQ0VBLElBQUEsR0FBT0gsUUFBQSxDQUFTYyxNQURsQjtBQUFBLFcsUUFBQUYsTTtXQUQwQjtBQUFBLFUsSUFLTlQsSUFBQSxRO1lBQXBCQSxJQUFBLEdBQU9ILFE7V0FMbUI7QUFBQSxVLE9BTzFCTCxtQkFBQSxDQUFvQkksSUFBcEIsRUFBMEJJLElBQTFCLEVBQWdDRixVQUFoQyxDQVAwQjtBQUFBLFM7T0ExQzdCO0FBQUEsTUFtRERiLE9BQUEsQ0FBUTJCLE1BQVIsR0FBaUIsVUFBQ0MsS0FBRDtBQUFBLFFBQ2YsSUFBQVosS0FBQSxFQUFBYSxNQUFBLEVBQUFDLENBQUEsRUFBQUMsR0FBQSxFQUFBQyxPQUFBLENBRGU7QUFBQSxRQUNmSCxNQUFBLEdBQVNELEtBQUEsQ0FBTUssS0FBTixDQUFZLEdBQVosQ0FBVCxDQURlO0FBQUEsUUFFZkQsT0FBQSxNQUZlO0FBQUEsUSxLQUVmRixDQUFBLE1BQUFDLEdBQUEsR0FBQUYsTUFBQSxDQUFBSyxNLEVBQUFKLENBQUEsR0FBQUMsRyxFQUFBRCxDQUFBLEUsRUFBQTtBQUFBLFUsa0JBQUE7QUFBQSxVLGFBQ0VLLE1BQUEsQ0FBTzlCLGdCQUFQLENBQXdCVyxLQUF4QixFQUErQjtBQUFBLFksT0FDN0JoQixPQUFBLENBQVFDLEdBQVIsQ0FBWWtCLEtBQVosQ0FBa0JuQixPQUFBLENBQVFDLEdBQTFCLEVBQStCRyxTQUEvQixDQUQ2QjtBQUFBLFdBQS9CLEMsQ0FERjtBQUFBLFNBRmU7QUFBQSxRLGNBQUE7QUFBQSxPQUFqQixDQW5EQztBQUFBLE0sSUEwRDBCLE9BQUErQixNQUFBLG9CQUFBQSxNQUFBLFM7ZUFBM0JBLE1BQUEsQ0FBT0MsTUFBUCxHQUFnQnBDLE87T0ExRGY7QUFBQSxTO0lBNERIcUMsTUFBQSxDQUFPckMsT0FBUCxHQUFpQkEsTyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=