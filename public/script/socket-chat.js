const socket = io()

const params = new URLSearchParams(window.location.search)

if (!params.has('name')) {
  window.location = `${window.origin}/index.html`
  throw new Error('El nombre es necesario')
}

socket.on('connect', () => {
  console.log('Connected to server')

  const payload = {
    name: params.get('name'),
  }

  socket.emit('userConnected', payload, (resp) => {
    console.log('userConnected', resp)
  })
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('left-user', (payload) => {
  console.log(payload)
})

socket.on('list-user', (payload) => {
  console.log(payload)
})

socket.on('message-private', (payload) => {
  console.log(payload)
})

socket.on('message-public', (payload) => {
  console.log(payload)
})
