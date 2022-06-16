const app=require('express')()
const server=require('http').createServer(app)
const {Server}=require('server')
const cors=require('cors')
app.use(cors())
const io=new Server(server,{cors: {origin: "*"}})

io.on('connection', (socket) => {
    console.log('a user connected');
    io.on('disconnect',()=>{
        console.log("a user disconnected");
    })
  });


server.listen(process.env.PORT || 8080,()=>{
    console.log("Server running");
})