import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../server/dbConnect";

import Post from "../../../../server/models/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    if (req.method === "DELETE") {
      const { id }: any = req.query;
      // const _id = mongoose.Types.ObjectId.createFromHexString(id);
      await Post.deleteOne({ _id: id });
      res.json({ message: "post deleted" });
    }

    if (req.method === "PUT") {
      const { id }: any = req.query;
      // const _id = mongoose.Types.ObjectId.createFromHexString(id);

      if (req.body.good) {
        await Post.findOneAndUpdate({ _id: id }, { $inc: { "score.good": 1 } });
      }
      if (req.body.bad) {
        await Post.findOneAndUpdate({ _id: id }, { $inc: { "score.bad": 1 } });
      }

      res.json({ message: "success?" });
    }
  } catch (err) {
    console.error(err);
  }
}
