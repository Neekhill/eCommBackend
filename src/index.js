const express = require("express");
const cors = require("cors");
const app = express();
const Db = require("./database/db");

const UserRoute = require("./routes/userRoutes");
const AuthRoute = require("./routes/authRoutes");
const ProductRoute = require("./routes/productRoute");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", UserRoute);
app.use("/auth", AuthRoute);
app.use("/product", ProductRoute);

app.listen(9000, () => {
  Db.connect()
    .then(() => {
      console.log("Connetion Successful");
    })
    .catch((err) => {
      console.log(`Error found! ${err}`);
    });
  console.log("started listening");
});
