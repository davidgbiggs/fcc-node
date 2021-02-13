var express = require("express");
var app = express();
var dotenv = require("dotenv");
dotenv.config();

// app.use(express.static(path.join(__dirname, "public")));

// Normal usage
app.use(express.static(__dirname + "/"));

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

// app
//   .route("/name")
//   .get("/name", (req, res) => {
//     var name = req.query.firstname + " " + req.query.lastname;
//     res.json({ name: name });
//   });
//   .post(() => {});
app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

module.exports = app;
