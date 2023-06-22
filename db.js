import { MongoClient } from "mongodb";
require("dotenv").config();

const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://fralinev:${password}@cluster1.2iciml8.mongodb.net/cool?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let db;

async function connectDB() {
  client = await MongoClient.connect(uri, options);
  db = client.db();
}

function getDB() {
  return db;
}

function closeDB() {
  client.close();
}

export { connectDB, getDB, closeDB };
