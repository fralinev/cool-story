import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../server/dbConnect";
import Post from "../../../../server/models/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    if (req.method === "GET") {
      if (req.query.instruction === "full") {
        const posts = await Post.find();
        return res.json({ posts });
      }
      const posts = await Post.find().sort({ createdAt: -1 }).limit(7);
      // console.log(posts);
      return res.json({ posts });
    }
    if (req.method === "POST") {
      await Post.create(req.body);
      res.json({ message: "Story added!" });
    }
  } catch (err) {
    console.error(err);
  }
}
