const { Socket } = require('socket.io')

const app = require('express')()

const server = require('http').createServer(app)

const io = require('socket.io')(server, {
    cors : {
        origin : "*"
    }
})


io.on('connection', (socket) =>{                //some event names are by default like ---> connection, disconnect
    console.log('Socket : ', socket);
    console.log('Socket is active to be connected')
    
    socket.on("chat", (payload)=>{
        console.log(payload)

        io.emit('chat', payload);
    })                               // here we have named the event name by ourSelves
})

server.listen(3000,()=>{
    console.log(`Server listening on port 3000, initialized using 'server' not the 'app'...`)
})