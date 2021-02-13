var express = require("express");
var app = express();

app.get("/", (req, res) => {
  path = __dirname + "/views/index.html";
  res.sendFile(path);
});

module.exports = app;
