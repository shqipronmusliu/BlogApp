import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment");
}

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    isConnected = connection.readyState === 1;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default dbConnect;
