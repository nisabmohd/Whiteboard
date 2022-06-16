const app=require('express')()
const server=require('http').createServer(app)
const {Server}=require('socket.io')
const cors=require('cors')
app.use(cors())
const io=new Server(server,{cors: {origin: "*"}})

io.on('connection', (socket) => {
    console.log(`a user connected with id :${socket.id}`);
    io.on('disconnect',()=>{
        console.log("a user disconnected");
    })
  });

io.on('getposition',(data)=>{
    io.broadcat.emit('sendposition',data)
})

server.listen(process.env.PORT || 8080,()=>{
    console.log("Server running");
})