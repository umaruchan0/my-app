const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("welcome");
  }
  if (req.url === "/home") {
    res.end("you are a bitch ");
  } else {
    res.end(`
        <h1>fuck you</h1>
        `);
  }
});

server.listen(port);
