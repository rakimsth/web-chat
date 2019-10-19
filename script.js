const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//Prompt User Name
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

//Attach user message to chatboard
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

//Message User Connection on Chatboard
socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

//Message User Disconnection on chatboard
socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

//Handling message from form to chat board
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

//Append message to the div
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}