// define
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productsRouter = require("./routes/products.routes");
const { connectDB } = require("./config/db");

const port = 1000;
const app = express();

// middleware
dotenv.config();
// db connect
connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  }),
);
app.use(express.json());
app.use(async (req, res, next) => {
  console.log(
    `Server is ${req.host} request from ${req.url} at ${new Date().toLocaleTimeString()}`,
  );
  next();
});

// products
app.use("/api/products", productsRouter);

// main api
app.listen(port, () => {
  console.log("server is running of", port);
});

// basic
app.get("/", async (req, res) => {
  res.json({
    message: "Server is running",
    port,
    status: "Success",
  });
});

// not found
app.get(/.*/, async (req, res) => {
  res.json({
    message: "Not declare this page",
    status: "not found page",
  });
});
