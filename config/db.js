const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

dotenv.config();

// mongodb connect
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ MongoDB successfully connected");
    db = client.db("BeautyGhor");
  } catch (error) {
    console.log("MongoDB connect problem", error);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
