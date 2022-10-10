const express = require("express");
const routes = require('./routes')
var mongo = require('mongodb');
const app = express();
  
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
  
app.use("/", routes);

const PORT = process.env.PORT || 8888;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));