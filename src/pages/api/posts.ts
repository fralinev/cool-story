import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB, getDB, closeDB } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const db = getDB();
    const collection = db.collection("posts");
    if (req.method === "GET") {
      const posts = await collection.find().toArray();
      res.json({ posts });
    }
    if (req.method === "POST") {
      await collection.insertOne(req.body);
      res.json({ message: "Story added!" });
    }
  } catch (err) {
    console.error(err);
  } finally {
    closeDB();
  }
}
