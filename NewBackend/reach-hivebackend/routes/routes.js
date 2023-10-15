import * as controller from "../controller/controller.js";
import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/auth.js";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
// import * as blog from "../controller/blogcontroller.js";
import { v2 as cloudinary } from "cloudinary";
import post from "../models/posts.js";
// const Post = mongoose.model("Post", PostModel);
const router = express.Router();
import User from "../models/user.js";
import Post from "../models/posts.js";
import Comment from "../models/comment.js";

//comments post
router.get("/get/:post/all", async (req, res) => {
  try {
    const comments = await Comment.find({ commentTo: req.params.post });
    res.json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/add/", jsonParser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.commenter });
    if (!user) {
      return res.status(403).json("User not found");
    }

    const post = await Post.findOne({ _id: req.body.post });
    if (!post) {
      return res.status(403).json("Post not found");
    }

    const comment = new Comment({
      commenter: req.body.commenter,
      commentTo: req.body.post,
      comment: req.body.comment,
    });

    await comment.save();
    res.json({ message: "Comment added", info: comment });
  } catch (err) {
    res.status(400).json(err);
  }
});

cloudinary.config({
  cloud_name: "dwyvexxqz",
  api_key: "583897919862512",
  api_secret: "0PZBA6dxLkeJk3EMtoURVXB-A1I",
  secure: true,
});
// Routes for posts
router.post("/upload", authMiddleware, async (req, res) => {
  const file = req.files.photo;
  const result = await cloudinary.uploader.upload(file.tempFilePath);
  const newPost = new post({
    photo: result.url,
    userId: req.userId,
  });
  console.log("testing", newPost);
  await newPost.save();

  res.status(200).json("image saved");
});

router.get("/posts", authMiddleware, async (req, res) => {
  try {
    const images = await post.find({ userId: req.userId });
    console.log(images);
    res.status(201).json({
      success: true,
      body: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});
// router
//   .route("/posts")
//   .get(authMiddleware, blog.getPosts)
//   .post(authMiddleware, blog.insertPosts);

// router
//   .route("/posts/:id")
//   .delete(authMiddleware, blog.deletePostById)
//   .put(authMiddleware, blog.updatePostById)
//   .patch(authMiddleware, blog.update);

// Routes for users
router.route("/users").get(controller.getUsers).post(controller.createUser);

router.route("/users/logIn").post(controller.logIn);
router.route("/users/logout", authMiddleware, controller.logout);
router.post("/images/postcomment", authMiddleware, controller.postComment);
// router
//   .route("/users/:id")
//   .get(authMiddleware, controller.getUserById)
//   .patch(authMiddleware, controller.updateUserById)
//   .delete(controller.deleteUserById);

export default router;
