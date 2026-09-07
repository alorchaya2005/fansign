import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import { redis } from "../config/redis.js";
dotenv.config();

export const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized, invalid token" });
    }

    const chacedUser = await redis.get(`user:${decoded?.userId}`);

    if (chacedUser) {
      req.user = JSON.parse(chacedUser);
      return next();
    }

    const user = await User.findById(decoded?.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    await redis.set(
      `user:${decoded?.userId}`,
      JSON.stringify(user),
      "EX",
      10 * 60
    );
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protected middleware", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
