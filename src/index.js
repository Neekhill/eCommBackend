const express = require("express");
const cors = require("cors");
const app = express();
//const Db = require("./database/db");

const UserRoute = require("./routes/userRoutes");
const AuthRoute = require("./routes/authRoutes");
const ProductRoute = require("./routes/productRoute");
const CartRoute = require("./routes/cartRoute");
const OrderRoute = require("./routes/orderRoute");
const RazorpayRoute = require("./routes/razorpayRoute");

app.use(cors());
app.use((req, res, error, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "PATCH",
      "POST",
      "DELETE",
      "GET"
    );
    return res.status(200).json({});
  }
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", UserRoute);
app.use("/auth", AuthRoute);
app.use("/products", ProductRoute);
app.use("/carts", CartRoute);
app.use("/orders", OrderRoute);
app.use("/checkout", RazorpayRoute);

app.get("/", (req, res) => {
  res.send("hello World");
});

/* app.listen(9000, () => {
  Db.connect()
    .then(() => {
      console.log("Connetion Successful");
    })
    .catch((err) => {
      console.log(`Error found! ${err}`);
    });
  console.log("started listening");
}); */

module.exports = app;
