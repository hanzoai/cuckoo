'use strict';

use('sake-version');

use('sake-publish');

use('sake-bundle');

use('sake-outdated');

option('-b', '--browser [browserName]', 'browser to test with');

task('build', 'Build module and bundled crowdcontrol.js', function () {
  return exec('node_modules/.bin/requisite src/index.coffee -o cuckoo.js');
});

task('build:min', 'Build minified cuckoo.min.js', function () {
  return exec('node_modules/.bin/requisite src/index.coffee -m -o cuckoo.min.js');
});

task('watch', 'watch for changes and recompile', function () {
  return exec('node_modules/.bin/bebop');
});

task('server', 'Run static server for tests', function () {
  var connect, ref, server;
  connect = require('connect');
  server = connect();
  server.use(require('serve-static')('./test'));
  return server.listen((ref = process.env.PORT) != null ? ref : 3333);
});

task('selenium:install', 'Install selenium standalone', function () {
  return exec('node_modules/.bin/selenium-standalone install');
});

task('test', 'Run tests', function (options) {
  var browserName, ref, selenium;
  browserName = (ref = options.browser) != null ? ref : 'phantomjs';
  invoke('server');
  selenium = require('selenium-standalone');
  return selenium.start(function (err, child) {
    if (err != null) {
      throw err;
    }
    return exec("NODE_ENV=test BROWSER=" + browserName + " node_modules/.bin/mocha --compilers coffee:coffee-script/register --reporter spec --colors --timeout 60000 test/test.coffee", function (err) {
      child.kill();
      if (err != null) {
        process.exit(1);
      }
      return process.exit(0);
    });
  });
});

task('test:ci', 'Run tests on CI server', function () {
  var browserName, browsers, deviceName, deviceOrientation, platform, tests, version;
  invoke('server');
  browsers = require('./test/ci-config');
  tests = function () {
    var i, len, ref, results;
    results = [];
    for (i = 0, len = browsers.length; i < len; i++) {
      ref = browsers[i], browserName = ref.browserName, platform = ref.platform, version = ref.version, deviceName = ref.deviceName, deviceOrientation = ref.deviceOrientation;
      results.push("NODE_ENV=test BROWSER=\"" + browserName + "\" PLATFORM=\"" + platform + "\" VERSION=\"" + version + "\" DEVICE_NAME=\"" + (deviceName != null ? deviceName : '') + "\" DEVICE_ORIENTATION=\"" + (deviceOrientation != null ? deviceOrientation : '') + "\" node_modules/.bin/mocha --compilers coffee:coffee-script/register --reporter spec --colors --timeout 60000 test/test.coffee");
    }
    return results;
  }();
  return exec(tests, function (err) {
    if (err != null) {
      process.exit(1);
    }
    return process.exit(0);
  });
});