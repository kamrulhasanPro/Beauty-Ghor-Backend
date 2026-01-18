// define
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 1000;
const app = express();

// middleware
dotenv.config();
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

// mongodb connect
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client
  .connect()
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((error) => {
    console.log("MongoDB connect problem", error);
  });

// database
const db = client.db("BeautyGhor");
const productsCollection = db.collection("products");

// main api
app.listen(port, () => {
  console.log("server is running of", port);
});

// ------------products---------------


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
