const express = require("express");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  console.log("Received GET request OK");
  res.json({ message: "OK" });
});

app.post("/", express.json(), (req, res) => {
  console.log("Received POST request OK");
  // console.log("req.body: ", req.body);
  res.json({ message: "OK" });
});

app.listen(PORT, () => {
  console.log(`Main server listening on port ${PORT}`);
});
