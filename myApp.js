var express = require("express");
var app = express();
var dotenv = require("dotenv");
dotenv.config();
var bodyParser = require("body-parser");

// app.use(express.static(path.join(__dirname, "public")));

// Normal usage
app.use(express.static(__dirname + "/"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  path = __dirname + "/views/index.html";
  res.sendFile(path);
});

app.get("/json", (req, res) => {
  const message =
    process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({ message: message });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app
  .route("/name")
  .get((req, res) => {
    var name = req.query.first + " " + req.query.last;
    res.json({ name: name });
  })
  .post((req, res) => {
    var { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });

module.exports = app;
