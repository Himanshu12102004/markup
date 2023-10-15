import User from "./user.js";
import Post from "./posts.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    commenter: [
      {
        user: {
          userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
          comments: [
            {
              commentInfo: {
                text: { type: String, required: true, maxlength: 2500 },
                coordinate: {
                  x: {
                    type: Number,
                  },
                  y: {
                    type: Number,
                  },
                  x1: {
                    type: Number,
                  },
                  y1: {
                    type: Number,
                  },
                },
              },
            },
          ],
        },
      },
    ],

    commentTo: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
