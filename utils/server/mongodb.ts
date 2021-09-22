import { MongoClient } from "mongodb";

const { MONGODB_URI } = process.env;
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!MONGODB_URI) {
  throw new Error("Add MongoDB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In dev mode, use global var so that value
  // is preserved across modules reloads caused by
  // HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Don't use global var in production
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

export default clientPromise;