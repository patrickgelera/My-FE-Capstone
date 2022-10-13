const express = require("express");
const routes = require('./routes')
var mongo = require('mongodb');
const http = require("http");
const app = express();
const {Server} = require("socket.io");
const cors = require('cors');


app.use("/", routes);
app.use(cors());
const server = http.createServer(app);

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
const chatbox = []
var canvas
let id = 0
let login = 0
const PORT = process.env.PORT || 8888;
const io = new Server(server, {
  cors: {
      origin:'http://localhost:3000', 
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200,
      methods:["GET","POST"]
  }
})

io.on("connection", (socket) => {
    socket.on("sendMessage", (data) => {
        id++
        chatbox.push({id:id,name:data.name, message:data.message})
        io.emit('received', { name:data.name,message:data.message, id:id })
    })
    socket.on("login", () => {
        login = 1
        socket.emit("loggedin", login)
    })
    socket.on("clearCanvas", () => {
        io.emit("clearCanvas")
        canvas = "";
    })
    socket.on("canvasData", (data) => {
        canvas = data
        socket.broadcast.emit("canvasData",data)
    })
    socket.on("getCanvas", () => {
        socket.emit("canvasData",canvas)
    })
    socket.on("disconnect", () => {
    });
});

server.listen(8888, () => {
    console.log("Server running")
})