fs   = require 'fs'
path = require 'path'

requisite = 'node_modules/.bin/requisite -g'

files =
  js:
    in:  'src/index.coffee'
    out: 'cuckoo.js'

module.exports =
  port: 4242

  cwd: process.cwd()

  exclude: [
    /css/
    /lib/
    /node_modules/
    /vendor/
  ]

  compilers:
    coffee: (src) ->
      if /^src/.test src
        return "#{requisite} #{files.js.in} -o #{files.js.out}"
