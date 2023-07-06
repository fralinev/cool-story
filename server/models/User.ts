import { models, model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    user: {
      type: Boolean,
      default: true,
    },
    editor: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
});

const User = models.User || model("User", UserSchema);

export default User;
