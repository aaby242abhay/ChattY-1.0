import express from 'express'
import {Server} from 'socket.io'
import {createServer} from 'http'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'


const app = express()
const jwtKey = "jasbfjsdfjsdnfds"

app.get('/login', (req, res)=>{
    const token = jwt.sign({__id: "random_payload"}, jwtKey)
    res.cookie("token", token,{
        httpOnly : false,
        secure : true,
        sameSite : 'none'
    })
    .json({
        msg : 'login successful'
    })
})


const server = createServer(app)
const io = new Server(server, {
    cors : {                            //This does not require any package from anywhere, this is the cors headers I was studying today
        origin : "http://localhost:5173",
        methods : ['GET','POST'],
        credentials : true
    }
})
app.use(cors())
const port = 3000


//midddleWares with the help of socket.io

// io.use((socket, next) =>{
//     next()
//     cookieParser()(socket.request, socket.request.res, (err) =>{          /************************************* */
//         next()
//         if(err) return next(err);
//         next()
//         const token = socket.request.cookies.token;                     //*********************************** */
//         if(!token) return next(new Error("Auth error!!!"));
//         const decoded = jwt.verify(token, jwtKey);
//         next();
//     })

// })
io.on('connection', (socket)=>{
    console.log("userConnected id :", socket.id);

    socket.on('message', (data)=>{
        console.log(data)
        socket.to(data.room).emit('event', data.message);
    })
    socket.on('group', (room)=>{
        socket.join(room)
        console.log(`${socket.id} joined room ${room}`)
    })

})



server.listen(port,()=>{
    console.log("Server is listening on port "+ port);
})