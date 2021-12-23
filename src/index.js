const express = require("express");

const app = express();

//test
app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(5000, () => {
  console.log("server started");
});
