const express = require("express");
const requestProxy = require("express-request-proxy");

const PORT = 3001;

const app = express();

// forward all requests to the main.js root endpoint
app.all(
  "/proxy-route",
  requestProxy({
    url: "http://localhost:3000/",
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
