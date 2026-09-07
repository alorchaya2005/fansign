import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { redis } from "../config/redis.js";

export const adminRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, no token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized, token not valid" });
    }

    const chacedUser = await redis.get(`user:${decoded?.userId}`);

    if (chacedUser && !JSON.parse(chacedUser).isAdmin) {
      return res.status(401).json({ error: "You are not the admin" });
    }

    if (chacedUser) {
      req.user = JSON.parse(chacedUser);
      return next();
    }

    const user = await User.findById(decoded?.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ error: "You are not the admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in adminRoutes middleware", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
