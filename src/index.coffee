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

    nestId = 0
    nests = {}

    addEventListener = proto.addEventListener
    proto.addEventListener = (type, listener, useCapture)->
      l = listener

      nest = (event)->
        try
          exports.Egg.apply @, arguments
        catch e
          # do a thing

        l.apply @, arguments

      id = l.__nestId
      if !id?
        id = nestId++

        Object.defineProperty l, '__nestId',
          value: id
          writable: true

        nests[id] =
          nest: nest,
          count: 0

      nests[id].count++

      addEventListener.call @, type, nest, useCapture

    removeEventListener = proto.removeEventListener
    proto.removeEventListener = (type, listener, useCapture)->
      id = listener.id
      if !id?
        nest = listener
      else
        nestRecord = nests[id]
        nest = nestRecord.nest
        nestRecord.count--
        if nestRecord.count == 0
          delete[nests.id]

      removeEventListener type, nest, useCapture

  exports.Target = (types)->
    events = types.split(' ')
    for event in events
      window.addEventListener(event, ()->
        exports.Egg.apply exports.Egg, arguments
      )

  window.cuckoo = exports if window?

module.exports = exports
