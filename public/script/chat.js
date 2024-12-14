const URL_TOKEN = `${window.origin}/auth/renovate`

let USER_DATA = null
let SOCKET = null

const btnLogout = document.querySelector('.logout')
const listUser = document.querySelector('.list-user')

const inputTextMensaje = document.querySelector('#txtMensaje')
const inputTextId = document.querySelector('#textId')

const renderMessage = document.querySelector('.renderMessage')

inputTextMensaje.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && e.keyCode === 13) {
    const payload = {
      users: [USER_DATA.uuid, inputTextId.value],
      message: [
        {
          text: inputTextMensaje.value,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          deleted: false,
          seen: false,
          seenAt: null,
          property: USER_DATA.uuid,
        },
      ],
    }

    SOCKET.emit('message-send', payload)
  }
})

btnLogout.addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = `${window.origin}/index.html`
})

async function verifyToken() {
  const token = localStorage.getItem('token')

  if (!token) {
    window.location = `${window.origin}/index.html`
  }

  const response = await fetch(URL_TOKEN, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const {
    token: tokenResponse,
    user: userResponse,
    error,
  } = await response.json()

  if (error) {
    window.location = `${window.origin}/index.html`
  }
  localStorage.setItem('token', tokenResponse)
  USER_DATA = userResponse
  document.title = USER_DATA?.email

  SOCKET = io({
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  })

  SOCKET.on('connect', () => {
    console.log('Connected to server')
  })

  SOCKET.on('disconnect', () => {
    console.log('Disconnected from server')
  })

  SOCKET.on('list-user', (payload) => {
    listUser.innerHTML = ''
    payload?.forEach((user) => {
      if (user.email !== USER_DATA.email) {
        const li = document.createElement('li')
        const p = document.createElement('p')
        const h5 = document.createElement('h5')
        const span = document.createElement('span')
        h5.textContent = user.email
        h5.classList.add('text-success')
        span.textContent = user.uuid
        span.classList.add('text-muted')
        p.appendChild(h5)
        p.appendChild(span)
        li.appendChild(p)
        listUser.appendChild(li)
      }
    })
  })

  SOCKET.on('message-receive', (payload) => {
    renderMessage.innerHTML = ''
    if (
      payload.users.filter((user) => user.uuid !== USER_DATA.uuid).length > 0
    ) {
      payload.message.forEach((message) => {
        console.log(message)
        const div = document.createElement('div')
        const spanName = document.createElement('span')
        const spanMsg = document.createElement('span')
        spanMsg.textContent = message.text
        if (message.property.uuid === USER_DATA.uuid) {
          spanName.textContent = 'Yo: '
          div.classList.add('text-end', 'text-success')
        } else {
          spanName.textContent = message.property.email + ': '
          div.classList.add('text-start', 'text-muted')
        }

        div.appendChild(spanName)
        div.appendChild(spanMsg)
        renderMessage.appendChild(div)
      })
    }
  })

  SOCKET.on('message-private', (payload) => {
    console.log(payload)
  })
}

const main = async () => {
  await verifyToken()
}

main()
