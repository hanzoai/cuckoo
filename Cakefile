exec = require('executive').interactive
selenium = require 'selenium-standalone'

task 'build', 'Build module and bundled crowdcontrol.js', ->
  exec 'node_modules/.bin/bebop --compile-only'
  # exec 'node_modules/.bin/coffee -bcm -o lib/ src/'

task 'watch', 'watch for changes and recompile', ->
  exec 'node_modules/.bin/bebop'

task 'build-min', 'Build minified crowdcontrol.min.js', ->
  exec 'node_modules/.bin/requisite src/index.coffee -m -o crowdcontrol.min.js'

# task 'example', 'Launch Examples', ->
#   exec 'coffee examples/index.coffee'
#   exec 'cake watch'

task 'test', 'Run tests', ->
  exec [
    'cake build'
    'NODE_ENV=test
    node_modules/.bin/mocha
    --compilers coffee:coffee-script/register
    --reporter spec
    --colors
    --timeout 60000
    test/test.coffee'
    ]

task 'install-selenium', 'installs chromedriver for selenium', ->
  config = require 'selenium-standalone/lib/default-config.js'
  config.logger = console.log

  selenium.install(
    config
    , (err) -> throw err if err?
  )

