import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {});
client.connect();

const mastDB = client.db(process.env.MONGODB_DB);

export { mastDB };
