import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import Img from "./models/posts.js"; // Import the Img model (assuming you have one)
import fileUpload from "express-fileupload";
import { authMiddleware } from "./middleware/auth.js";
import { postComment } from "./controller/controller.js";
dotenv.config();
const uri = process.env.DB_URI;
const app = express();
const port = 8000;
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.log(e);
  });

// Use CORS middleware
app.use(cors());

// Use routes
app.use(express.json());
app.use("/api", routes);
// Add authMiddleware to protect routes
// app.post("/api/images/postcomment", authMiddleware, postComment);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
