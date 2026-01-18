// define
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

// get all products
app.get("/products", async (req, res) => {
  try {
    const result = await productsCollection.find().toArray();
    res.json(result);
  } catch (error) {
    console.log("Products find problem", error);
    res.status(500).json({
      message: "products find problem",
    });
  }
});

// get a specific product
app.get("/product/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await productsCollection.findOne(query);
    res.json(result);
  } catch (error) {
    console.log("Specific products find problem", error);
    res.status(500).json({
      message: "Specific product find problem",
    });
  }
});

// post product
app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    const result = await productsCollection.insertOne(product);
    res.json(result);
  } catch (error) {
    console.log("Product post problem", error);
    res.status(500).json({
      message: "Product post problem",
    });
  }
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
