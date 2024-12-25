const socket = new io()

socket.on('connect', () => {
  console.log('Connected to server')
})
