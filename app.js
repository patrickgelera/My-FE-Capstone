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
  console.log("New client connected");
  socket.on("hello", () => {
      console.log("Hello");
      io.emit('received')
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(8888, () => {
    console.log("Server running")
})