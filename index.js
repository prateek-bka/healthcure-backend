const express = require("express");
const { connection } = require("./db");
const { cartRouter } = require("./routes/cart.routes");
const { productRouter } = require("./routes/products.routes");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  res.send({ msg: "Welcome to backend app" });
});
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log({ msg: "Connected to healthDB" });
  } catch (err) {
    console.log({ msg: err.message });
  }
  console.log(`App is running at ${process.env.port}`);
});
