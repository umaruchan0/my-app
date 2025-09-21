const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const { prodacts } = require("./data");

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.get("/api", (req, res) => {
  res.send('<h1>klick this</h1><a href="/api/prodact">here</a>');
});

app.get("/api/prodact", (req, res) => {
  res.json(prodacts);
});

// app.get("/json", (req, res) => {
//   res.json(prodacts);
// });

app.use((req, res, next) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");// fuck u
});

app.listen(port, () => {
  console.log(`we are at ${port} port`);
});
