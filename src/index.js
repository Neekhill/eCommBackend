const express = require("express");
const db = require("./database/db");

const app = express();

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(9000, () => {
  db.connect()
    .then(() => {
      console.log("Connetion Successful");
    })
    .catch((err) => {
      console.log(`Error found! ${err}`);
    });
  console.log("started listening");
});
