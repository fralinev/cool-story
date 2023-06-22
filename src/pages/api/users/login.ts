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
    console.log(req.body);
    const result = await collection.insertOne({ username, password });
    closeDB();
    res.status(200).json({
      message: "object successfully inserted",
      insertedId: result.insertedId,
    });
  }
}
