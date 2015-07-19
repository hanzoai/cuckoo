exports =
  Egg: ->
    console.log('Egg called with ', arguments)

do ->
  if EventTarget?
    proto = EventTarget.prototype
  else if Node?
    proto = Node.prototype
  else
    console?.log?('EventTarget and Node are missing')
    return

  if proto
    if !proto.dispatchEvent?
      console?.log?('dispatchEvent is missing')
      return

  dispatchEvent = proto.dispatchEvent
  proto.dispatchEvent = ()->
    exports.Egg.apply @, arguments

  exports.Target = (types) ->
    events = types.split(' ')
    for event in events
      window.addEventListener event, ->
        exports.Egg.apply exports.Egg, arguments

  window.cuckoo = exports if window?

module.exports = exports
