const app=require('express')()
const server=require('http').createServer(app)
const {Server}=require('socket.io')
const cors=require('cors')
app.use(cors())
const io=new Server(server,{cors: {origin: "*"}})

io.on('connection', (socket) => {
    console.log(`a user connected with id :${socket.id}`);
    socket.on('getposition',(data)=>{
        console.log({...data,socketid:socket.id});
        socket.broadcast.emit('sendposition',{...data,socketid:socket.id})
    })
    socket.on('disconnect',()=>{
        console.log(`a user disconnected with id: ${socket.id}`);
    })
  });


server.listen(process.env.PORT || 8080,()=>{
    console.log("Server running");
})