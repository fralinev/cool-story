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
      const { post_id, post_title } = req.body;
      if (req.body.value === "Interesting") {
        const already = await User.findOne({
          _id: req.query.id,
          "interest.for": { $elemMatch: { post_id } },
        });

        const contrary = await User.findOne({
          _id: req.query.id,
          "interest.against": { $elemMatch: { post_id } },
        });

        if (already) {
          return res.json({
            status: "already positive",
          });
        }
        if (contrary) {
          await User.findOneAndUpdate(
            { _id: req.query.id },
            {
              $pull: { "interest.against": { post_id } },
              $push: {
                "interest.for": {
                  post_id,
                  post_title,
                },
              },
            }
          );
          const updatedPost = await Post.findOneAndUpdate(
            { _id: post_id },
            { $inc: { "score.good": 1, "score.bad": -1 } }
          );
          return res.json({
            status: "updated contrary case for positive route",
            post: updatedPost,
          });
        }

        await User.findOneAndUpdate(
          { _id: req.query.id },
          {
            $push: {
              "interest.for": {
                post_id,
                post_title,
              },
            },
          }
        );
        const updatedPost = await Post.findOneAndUpdate(
          { _id: post_id },
          { $inc: { "score.good": 1 } }
        );

        return res.json({
          status: "User interest and post score updated for affirmative route",
          post: updatedPost,
        });
      }
      if (req.body.value === "Not Interesting") {
        const already = await User.findOne({
          _id: req.query.id,
          "interest.against": { $elemMatch: { post_id } },
        });

        const contrary = await User.findOne({
          _id: req.query.id,
          "interest.for": { $elemMatch: { post_id } },
        });

        if (already) {
          return res.json({
            message: "already negative",
          });
        }
        if (contrary) {
          await User.findOneAndUpdate(
            { _id: req.query.id },
            {
              $pull: { "interest.for": { post_id } },
              $push: {
                "interest.against": {
                  post_id,
                  post_title,
                },
              },
            }
          );
          const updatedPost = await Post.findOneAndUpdate(
            { _id: post_id },
            { $inc: { "score.good": -1, "score.bad": 1 } }
          );
          return res.json({
            status: "updated contrary case for negative route",
            post: updatedPost,
          });
        }

        await User.findOneAndUpdate(
          { _id: req.query.id },
          {
            $push: {
              "interest.against": {
                post_id,
                post_title,
              },
            },
          }
        );
        const updatedPost = await Post.findOneAndUpdate(
          { _id: post_id },
          { $inc: { "score.bad": 1 } }
        );
        return res.json({
          status: "User interest and post score updated for negative route",
          post: updatedPost,
        });
      }
      return res.json({ status: "All if statements were exhausted..." });
    }
  } catch (err) {
    console.error(err);
  }
}
