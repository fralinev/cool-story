import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB, getDB, closeDB } from "../../../../db";
import Post from "../../../../server/models/Post";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const db = getDB();
    const collection = db.collection("posts");
    if (req.method === "DELETE") {
      const { id }: any = req.query;
      const _id = mongoose.Types.ObjectId.createFromHexString(id);
      await Post.deleteOne({ _id });
      res.json({ message: "post deleted" });
    }
  } catch (err) {
    console.error(err);
  }
}
