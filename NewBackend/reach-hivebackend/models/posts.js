import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  team: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
});

const post = mongoose.model("post", PostSchema);

export default post;
