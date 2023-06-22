import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB, getDB, closeDB } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const db = getDB();
  const collection = db.collection("users");

  if (req.method === "POST") {
    const { username, password } = req.body;
    const found = await collection.findOne({ username });
    if (found) {
      console.log(found);
      closeDB();
      return res.json({ message: `user ${username} already exists` });
    }
    const result = await collection.insertOne({ username, password });
    closeDB();
    res.status(200).json({
      message: "object successfully inserted",
      insertedId: result.insertedId,
    });
  }
}
