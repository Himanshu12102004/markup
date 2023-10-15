import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.ACCESS_SECRET_KEY;
  try {
    // console.log("he",token);
    const user = jwt.verify(token, secret);
    req.userId = user.id;
    console.log("hello");
    console.log(user);
    next();
  } catch (err) {
    res.status(401).send({
      message: "failed",
      error: err.message,
    });
    console.log(err);
  }
};
