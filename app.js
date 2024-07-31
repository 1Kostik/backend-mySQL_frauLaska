require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const productsRouter = require("./routes/api/products");
const categoriesRouter = require("./routes/api/categories");
const ordersRouter = require("./routes/api/orders");
const authRouter = require("./routes/api/auth");

app.use(cors());
app.use(express.json());

app.use("/api", productsRouter);
app.use("/api", categoriesRouter);
app.use("/api", ordersRouter);
app.use("/api", authRouter);
module.exports = app;

//   res.json(err);
//   res.json(processedData);
//   res.status(404).json({ message: "Not found page!" });
//   res.status(status).json({ message });
