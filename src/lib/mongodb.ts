import mongoose from "mongoose";

const MONGODB_URI = process.env["MONGODB_URI"] || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Using existing database connection");
      return;
    }
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env['MONGODB_URI'];

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/
