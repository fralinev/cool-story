import { models, model, Schema } from "mongoose";

const PostSchema: Schema = new Schema({
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
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
