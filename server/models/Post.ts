import { models, model, Schema } from "mongoose";

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    score: {
      good: {
        type: Number,
      },
      bad: {
        type: Number,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
