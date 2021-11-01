const path = require("path");
require("dotenv").config({
  path: path.resolve(".env.local")
})
const MongoClient = require("mongodb").MongoClient;

async function mongo() {
  const client = await MongoClient.connect(process.env.MONGODB_URI)

  const mastDB = client.db(process.env.MONGODB_DB)
  await mastDB.createCollection("users");

  await mastDB.collection("users").createIndex(
    { destructionDate: 1 },
    {
      expireAfterSeconds: 0,
    }
  );

  await mastDB.collection("users").createIndex(
    { username: 1 },
    {
      unique: true,
      collation: {
        locale: "en",
        strength: 1,
      },
    }
  );

  await mastDB.createCollection("email_proxy");

  await mastDB.collection("email_proxy").createIndex(
    { destructionDate: 1 },
    {
      expireAfterSeconds: 0,
    }
  );

  await mastDB.collection("email_proxy").createIndex(
    { email: 1 },
    {
      unique: true,
      collation: {
        locale: "en",
        strength: 1,
      },
    }
  );

  client.close();
}

async function setup() {
  await mongo()
  console.log("Setup completed.")
  process.exit();
}

setup();