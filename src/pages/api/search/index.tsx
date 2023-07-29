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
      if (
        typeof req.query.term === "string" &&
        typeof req.query.option === "string"
      ) {
        console.log(req.query);
        const result = await Post.find({
          [req.query.option]: { $regex: new RegExp(req.query.term, "i") },
        });
        return res.json(result);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
