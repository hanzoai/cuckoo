assert = require 'assert'
should = require('chai').should()

{getBrowser} = require './util'

describe "Cuckoo (#{process.env.BROWSER})", ->
  client   = getBrowser()
  testPage = "http://localhost:#{process.env.PORT ? 3333}/test.html"

  describe 'Cuckoo can capture uncaptured events', ->
    it 'should capture a click on an element without a handler', (done) ->
      client.url(testPage)
        .click('#somelink')
        .getText('#result', (err, res) ->
          res.should.equal 'clicked: somelink'
        ).call done

    it 'should capture window events like hashchange', (done) ->
      client.url(testPage)
        .click('#linktobookmark')
        .getText('#result', (err, res) ->
          res.should.equal 'hashchangeed: undefined'
        ).call done

    it 'should filter events', (done) ->
      client.url(testPage)
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
      client.url(testPage)
        .click('#clickablediv')
        .getText('#result', (err, res) ->
          res.should.equal 'clicked: clickablediv'
        ).call done

    it 'should capture unpropagated events', (done) ->
      client.url(testPage)
        .click('#dontstopmenow')
        .getText('#result', (err, res) ->
          res.should.equal 'clicked: dontstopmenow'
        ).call done
