exports =
  Egg: ()->
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
    if !proto.addEventListener?
      console?.log?('addEventListener is missing')
      return
    if !proto.removeEventListener?
      console?.log?('removeEventListener is missing')
      return

    addEventListener = proto.addEventListener
    proto.addEventListener = (type, listener, useCapture)->
      l = listener

      nest = (event)->
        try
          if !event.__reported
            exports.Egg.apply @, arguments
            Object.defineProperty event, '__reported',
              value: true
              writable: true
        catch e
          # do a thing

        l.apply @, arguments

        try
          Object.defineProperty l, '__nest',
            value: nest
            writable: true
        catch

      addEventListener.call @, type, nest, useCapture

    removeEventListener = proto.removeEventListener
    proto.removeEventListener = (type, listener, useCapture)->
      try
        nest = listener.__nest
      catch

      nest = listener if !nest?

      removeEventListener type, nest, useCapture

  exports.Target = (types)->
    events = types.split(' ')
    for event in events
      window.addEventListener(event, ()->
        exports.Egg.apply exports.Egg, arguments
      )

  window.cuckoo = exports if window?

module.exports = exports
