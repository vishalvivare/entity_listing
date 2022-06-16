const express = require("express");
const mongoose = require("mongoose");
const connect = require("./src/db/db");
const indexController = require("./src/controllers/index.controller");
const userController = require("./src/controllers/user.controller");
const addressController = require("./src/controllers/address.controller");
const brandController = require("./src/controllers/brands.controller");
const categoryController = require("./src/controllers/category.controller");
const orderController = require("./src/controllers/order.controller");
const productController = require("./src/controllers/products.controller");
const reviewController = require("./src/controllers/reviews.controller");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.use("/products", indexController);
app.use("/users", userController);
app.use("/address", addressController);
app.use("/category", categoryController);
app.use("/brands", brandController);
app.use("/reviews", reviewController);
app.use("/orders", orderController);
app.use("/products", productController);

app.listen(8080, async function () {
  try {
    await connect();
    console.log("Listening to port 8080");
  } catch (err) {
    console.log(err.message);
  }
});
