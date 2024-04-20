
import React from 'react'
import { useEffect, useState, useMemo} from 'react';
import {io} from 'socket.io-client'

import  { Container, Button, TextField, Typography, Stack } from '@mui/material'

const App = () => {

  const socket = useMemo(()=> (io('http://localhost:3000')), []);           
  //Here useMemo is used because whenever submit is being pressed the setMessage('') gets changed in the handle event and the component gets rerendered 
  //Therefore the connection is established again
  //backend's url
  //if we do not pass the url as an argument it will check the connection on the frontEnd's URL


  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('');
  const [socketId, setSocketID] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [roomName, setRoomName] = useState('')


  const handleEvent = (e)=>{
    e.preventDefault()          //So that page does not refreshes on the submit of the button
    socket.emit('message', {message, room});
    setMessage('')

  }

  const joinRoomHander = (e)=>{
    e.preventDefault()
    socket.emit('group', roomName);
    setRoomName('')
  }


  useEffect(()=>{
    
    socket.on('connect', ()=>{
      console.log("This user connected is ---> ", socket.id);
      setSocketID(socket.id);
    })
  },[])

  socket.on('event', (data)=>{
    setMsgs([...msgs, data]);
  })

  console.log(msgs)
  

  return <Container maxWidth = 'sm'>
    <Typography variant='h6' component='div' gutterBottom>
     Socket.id = {socketId}
    </Typography>
    <form onSubmit={joinRoomHander}>
      <h5></h5>
      <TextField value = {roomName} 
      onChange={(e)=> setRoomName(e.target.value)}
      id = 'outlined-basic' label = 'Room Name' variant='outlined'></TextField>

      <Button  type = 'submit' variant='contained' color='primary' > Join  </Button>

    </form>
    <form onSubmit = {handleEvent}>
      <TextField value = {message} 
      onChange={(e)=> setMessage(e.target.value)}
      id = 'outlined-basic' label = 'Message' variant='outlined'></TextField>
      <TextField value = {room} 
      onChange={(e)=> setRoom(e.target.value)}
      id = 'outlined-basic' label = 'Room' variant='outlined'></TextField>
      <Button  type = 'submit' variant='contained' color='primary' > Send  </Button>
    </form>
    {/* <Stack>
     {msgs.map( (m,i)=>{
      <Typography key = {i} variant='h6' component='div' gutterBottom>
        {m}
      </Typography>
     })}


    </Stack> */}
    <div>
      {msgs.map( (msg)=>{
        return(
          <div>
            {msg}
          </div>
        )
      })}
    </div>
  </Container>
}

export default App
