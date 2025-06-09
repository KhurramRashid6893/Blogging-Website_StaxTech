const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("blogdb");
    console.log("✅ Connected to MongoDB (Compass)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

const getDB = () => db;

module.exports = {
  connectDB,
  getDB,
};
