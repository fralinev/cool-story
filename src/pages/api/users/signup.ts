import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB, getDB, closeDB } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const db = getDB();
    const collection = db.collection("users");

    if (req.method === "POST") {
      const { username, password } = req.body;
      const found = await collection.findOne({ username });
      if (found) {
        closeDB();
        return res.json({ message: `user ${username} already exists` });
      }
      await collection.insertOne({ username, password });
      closeDB();
      res.status(200).json({
        message: "OK",
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    closeDB();
  }
}
