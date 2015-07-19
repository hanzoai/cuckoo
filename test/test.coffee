selenium = require('selenium-standalone')
webdriver = require('webdriverio')
assert = require('assert')
nodeStatic = require('node-static')
http = require('http')
should = require('chai').should()

currentPort = 9000
port = currentPort + Math.floor(Math.random() * (1000-1+1)+1)

sleep = (seconds)->
  e = new Date().getTime() + (seconds * 1000)
  while (new Date().getTime() <= e)
    1

server = null
client = null

run = (seleniumParams) ->
  before (done)->
    @timeout 0

    staticServer = new nodeStatic.Server('./test')
    server = http.createServer((req, res)->
      req.addListener('end', ()->
        staticServer.serve(req, res)
      ).resume()
    ).listen(port)

    if Boolean(process.env.CI) and Boolean(process.env.TRAVIS)
      client = webdriver.remote(seleniumParams).init ()->
      done()
    else
      selenium.start (err, child)->
        throw err if err
        selenium.proc = child
        client = webdriver.remote(seleniumParams).init ()->
          done()

  after (done) ->
    client.end ->
      server.close()
      if !Boolean(process.env.CI) || !Boolean(process.env.TRAVIS)
        selenium.proc.kill()
      done()

  describe 'Cuckoo Tests for ['+ seleniumParams.desiredCapabilities.browserName + ']', () ->
    describe 'Cuckoo can capture uncaptured events', ->
      it 'should capture a click on an element without a handler', (done) ->
        client.url("http://localhost:#{port}/test.html")
          .click('#somelink')
          .getText('#result', (err, res) ->
            res.should.equal 'clicked: somelink'
          ).call done
      it 'should capture window events like hashchange', (done) ->
        client.url("http://localhost:#{port}/test.html")
          .click('#linktobookmark')
          .getText('#result', (err, res) ->
            res.should.equal 'hashchangeed: undefined'
          ).call done
      it 'should filter events', (done) ->
        client.url("http://localhost:#{port}/test.html")
          .setValue('#changeinput', "somethingelse")
          .getValue('#changeinput', (err, res)->
            res.should.equal('somethingelse')
          )
          .getText('#rejected', (err, res) ->
            res.should.equal 'changeed: changeinput'
          )
          .getText('#result', (err, res) ->
            res.should.equal ''
          ).call done

    describe 'Cuckoo can capture captured events', ->
      it 'should capture propagated events', (done) ->
        client.url("http://localhost:#{port}/test.html")
          .click('#clickablediv')
          .getText('#result', (err, res) ->
            res.should.equal 'clicked: clickablediv'
          ).call done

      it 'should capture unpropagated events', (done) ->
        client.url("http://localhost:#{port}/test.html")
          .click('#dontstopmenow')
          .getText('#result', (err, res) ->
            res.should.equal 'clicked: dontstopmenow'
          ).call done

if Boolean(process.env.CI) and Boolean(process.env.TRAVIS)
  browsers = [
    'firefox'
    'chrome'
    # 'iphone'
  ]
  browsers.forEach (browser) ->
    run
      desiredCapabilities:
        browserName: browser
        name: process.env.TRAVIS_COMMIT
        tags: [
          process.env.TRAVIS_PULL_REQUEST
          process.env.TRAVIS_BRANCH
          process.env.TRAVIS_BUILD_NUMBER
        ]
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
      host: 'ondemand.saucelabs.com'
      port: 80
      user: process.env.SAUCE_USERNAME
      key: process.env.SAUCE_ACCESS_KEY
      logLevel: 'silent'
    return
else
  run
    desiredCapabilities:
      browserName: 'phantomjs'
      'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
