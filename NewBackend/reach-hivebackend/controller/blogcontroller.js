import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import PostModel from "../models/posts.js";
import jwt from "jsonwebtoken";
import posts from "../models/posts.js";
const Post = mongoose.model("Post", PostModel);
//  GET requests for all posts

// export const insertPosts = async (req, res) => {
//   const { photo } = req.body;
//   const newPost = new Post({
//     photo: photo,
//   });
//   try {
//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       message: "Something went wrong",
//       error: e.message,
//     });
//   }
// };
// export const update = async (req, res) => {
//   const { done } = req.body;
//   const id = req.params.id;

//   try {
//     const post = await Post.findById(id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     // Toggle the "done" property
//     post.done = done;

//     // Save the updated post
//     await post.save();

//     res.status(200).json({ message: "Post updated successfully", post });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const updatePostById = async(req,res)=>{
//     const id = req.params.id;
//     const {title, description} = req.body;
//     const newPost = {
//         title: title,
//         description: description,
//     }
//     console.log(newPost);
//     try {
//         const result = await Post.findByIdAndUpdate(id,newPost,{new: true});
//         console.log(result);
//         res.status(200).json(newPost);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//             message: "Something went wrong",
//             error: e.message
//         })
//     }
// }
// export const deletePostById = async(req,res)=>{
//     const id = req.params.id;
//     try {
//         const result = await Post.findByIdAndRemove(id);
//         res.status(201).json({
//             body: result,
//             success: true
//         })
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({message: "Something went wrong"})
//     }

// }
// export const getPosts = async (req, res) => {
//   try {
//     const notes = await Post.find({ userId: req.userId });

//     res.status(201).json({
//       success: true,
//       body: notes,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       message: "Something went wrong.",
//     });
//   }
// };
