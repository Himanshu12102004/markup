import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
// import PostModel from "../models/posts.js";
import User from "../models/user.js";
import posts from "../models/posts.js";
import comment from "../models/comment.js";

import jwt from "jsonwebtoken";
// const User = mongoose.model("User", UserModel);
// const Post = mongoose.model("Post", PostModel);

// GET request to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: "true",
      result: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST request to create a new user
export const createUser = async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  console.log(password);
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: password,
    });
    await user.save();

    // creating the payload

    const payload = { id: user._id };
    const accessKey = process.env.ACCESS_SECRET_KEY;
    const accessLife = process.env.ACCESS_TOKEN_LIFE;

    const accessToken = jwt.sign(payload, accessKey);

    // res.cookie("jwt", accessToken, { httpOnly: true });
    res.status(201).send({
      success: true,
      token: accessToken,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

// GET request to get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT request to update a user by ID
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE request to delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user log in controller

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        message: "Invalid details. Plz try again!",
      });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(403).send({
        message: "Invalid details",
      });
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.ACCESS_SECRET_KEY
    );

    res.status(201).json({
      message: "success",
      token: token,
      user: existingUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed",
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  console.log("proceed to logout");
  localStorage.clear("token");
  res.status(200).json({
    message: "loggout ",
  });
};
async function pushComment(userIdToFind, postId, newComment) {
  try {
    // Find the user by userId
    const user = await comment
      .findOne({
        "commenter.user.userId": userIdToFind,
      })
      .exec();

    if (!user) {
      comment.findOne(
        { commentTo: postId },
        {
          comments: {
            $push: {
              "user.userId": userIdToFind,
              "user.commentInfo": {
                text: newComment.text,
                coordinate: newComment.coordinate,
              },
            },
          },
        }
      );
      return;
    }

    // Push the new comment into the comments array
    user.commenter[0].user.comments.push({
      commentInfo: {
        text: newComment.text,
        coordinate: newComment.coordinate,
      },
    });

    // Save the updated document
    await user.save();

    console.log(`Comment pushed successfully for userId ${userIdToFind}`);
  } catch (error) {
    console.error("Error pushing comment:", error);
  }
}
async function doesTeamContainId(postFilter, objectId) {
  try {
    const doc = await posts.findOne({ photo: postFilter });

    if (!doc) {
      throw new Error("No such post");
    }

    if (doc.team.includes(objectId)) {
      return { auth: true, postId: doc._id };
    } else return { auth: false, postId: null };
  } catch (err) {
    console.log(err.message);
    return { auth: false, postId: null };
  }
}
export const postComment = async (req, res) => {
  try {
    console.log(req.body);
    const authCheck = await doesTeamContainId(req.body.imageFilter, req.userId);
    if (authCheck.auth) {
      // console.log(!(await comment.findOne({ commentTo: authCheck.postId })));
      if (!(await comment.findOne({ commentTo: authCheck.postId }))) {
        const a = await comment.create({
          commentTo: authCheck.postId,
          commenter: [
            {
              user: {
                userId: req.userId,
                comments: [
                  {
                    commentInfo: {
                      text: req.body.comment.text,
                      coordinate: {
                        x: req.body.comment.x,
                        y: req.body.comment.y,
                        x1: req.body.comment.x1,
                        y1: req.body.comment.y1,
                      },
                    },
                  },
                ],
              },
            },
          ],
        });
        console.log(a);
        return;
      } else {
        try {
          pushComment(req.userId, authCheck.postId, {
            text: req.body.comment.text,
            coordinate: {
              x: req.body.comment.x,
              y: req.body.comment.y,
              x1: req.body.comment.x1,
              y1: req.body.comment.y1,
            },
          });
        } catch (error) {
          console.error("Error finding user in comments:", error);
        }
      }
    } else {
      return res.status(403).json({ message: "not authorized" });
    }
  } catch (err) {}
};
