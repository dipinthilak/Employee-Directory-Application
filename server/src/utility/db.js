import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log("connected to db");
  }
  return db;
};
 