const { MongoClient } = require("mongodb");
require("dotenv").config();
const url = process.env.connectionurl;
console.log(url);
const client = new MongoClient(url);

// Database Name
const dbName = "website";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("vinit");
  console.log(await collection.find({}).toArray());
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
