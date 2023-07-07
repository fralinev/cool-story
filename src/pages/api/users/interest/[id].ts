import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../../server/dbConnect";
import User from "../../../../../server/models/User";
import Post from "../../../../../server/models/Post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    if (req.method === "PUT") {
      console.log("query", req.query);
      console.log("body", req.body);

      if (req.body.value === "Yes") {
        const duplicate = await User.findOne({
          _id: req.query.id,
          "interest.for": { $elemMatch: { postid: req.body.postid } },
        });

        const contrary = await User.findOne({
          _id: req.query.id,
          "interest.against": { $elemMatch: { postid: req.body.postid } },
        });

        if (duplicate) {
          return res.json({
            message: "You've already positively evaluated this post.",
            status: "NOK",
          });
        }
        if (contrary) {
          await User.findOneAndUpdate(
            { _id: req.query.id },
            { $pull: { "interest.against": { postid: req.body.postid } } }
          );
        }

        await User.findOneAndUpdate(
          { _id: req.query.id },
          {
            $push: {
              "interest.for": {
                postid: req.body.postid,
                posttitle: req.body.posttitle,
              },
            },
          }
        );
        await Post.findOneAndUpdate(
          { _id: req.body.postid },
          { $inc: { "score.good": 1 } }
        );
        return res.json({ status: "GOK" });
      }
      if (req.body.value === "No") {
        const duplicate = await User.findOne({
          _id: req.query.id,
          "interest.against": { $elemMatch: { postid: req.body.postid } },
        });

        const contrary = await User.findOne({
          _id: req.query.id,
          "interest.for": { $elemMatch: { postid: req.body.postid } },
        });

        if (duplicate) {
          return res.json({
            message: "You've already negatively evaluated this post.",
            status: "NOK",
          });
        }
        if (contrary) {
          await User.findOneAndUpdate(
            { _id: req.query.id },
            { $pull: { "interest.for": { postid: req.body.postid } } }
          );
        }

        await User.findOneAndUpdate(
          { _id: req.query.id },
          {
            $push: {
              "interest.against": {
                postid: req.body.postid,
                posttitle: req.body.posttitle,
              },
            },
          }
        );
        await Post.findOneAndUpdate(
          { _id: req.body.postid },
          { $inc: { "score.bad": 1 } }
        );
        return res.json({ status: "BOK" });
      }
      return res.json({ status: "All if statements were exhausted..." });
    }
  } catch (err) {
    console.error(err);
  }
}
