var express = require("express");
var app = express();

// app.use(express.static(path.join(__dirname, "public")));

// Normal usage
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  path = __dirname + "/views/index.html";
  res.sendFile(path);
});

module.exports = app;
