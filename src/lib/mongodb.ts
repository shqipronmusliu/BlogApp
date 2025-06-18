import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

const clientPromise =
  global._mongoClientPromise ?? (global._mongoClientPromise = client.connect());

export default clientPromise;
