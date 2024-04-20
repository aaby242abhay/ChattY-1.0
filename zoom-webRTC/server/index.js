const express = require('express')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')

const io = new Server()
const app = express()
app.use(bodyParser.json())

io.on('connection', (socket)=>{
    
})

app.listen(8000, 'http server running at 8000');
io.listen(8001, 'web-socket server running at 8001')

