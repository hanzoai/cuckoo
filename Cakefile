exec = require('shortcake').exec.interactive

task 'build', 'Build module and bundled crowdcontrol.js', ->
  exec 'node_modules/.bin/bebop --compile-only'

task 'build-min', 'Build minified cuckoo.min.js', ->
  exec 'node_modules/.bin/requisite src/index.coffee -m -o cuckoo.min.js'

task 'watch', 'watch for changes and recompile', ->
  exec 'node_modules/.bin/bebop'

task 'static-server', 'Run static server for tests', ->
  connect = require 'connect'
  server = connect()
  server.use (require 'serve-static') './test'
  server.listen process.env.PORT ? 3333

task 'selenium-install', 'Install selenium standalone', ->
  exec 'node_modules/.bin/selenium-standalone install'

task 'test', 'Run tests', ->
  invoke 'static-server'

  selenium = require 'selenium-standalone'
  selenium.start (err, child) ->
    throw err if err?

    exec 'NODE_ENV=test
          BROWSER=phantomjs
          node_modules/.bin/mocha
          --compilers coffee:coffee-script/register
          --reporter spec
          --colors
          --timeout 60000
          test/test.coffee', -> child.kill() and process.exit 0

task 'test-ci', 'Run tests on CI server', ->
  invoke 'static-server'

  tests = for name in ['chrome', 'firefox']
    "NODE_ENV=test
     BROWSER=#{name}
     node_modules/.bin/mocha
     --compilers coffee:coffee-script/register
     --reporter spec
     --colors
     --timeout 60000
     test/test.coffee"

  exec tests, -> process.exit 0
