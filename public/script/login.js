const URL = 'http://localhost:3000/auth'

const form = document.querySelector('#login-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = {}

  for (const element of form.elements) {
    if (element.value) {
      formData[element.name] = element.value
    }
  }

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('token', data.token)
      window.location = `${window.origin}/html/chat.html`
    })
    .catch(console.log)
})
