var express = require("express");
var app = express();

// app.use(express.static(path.join(__dirname, "public")));

// Normal usage
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  path = __dirname + "/views/index.html";
  res.sendFile(path);
});

app.get("/json", (req, res) => {
  console.log(process.env.MESSAGE_STYLE);
  const message =
    process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({ message: message });
});

module.exports = app;
