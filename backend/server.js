import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import { v2 as cloudinary } from "cloudinary";
import { connDB } from "./config/db.js";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// routes
import authRoutes from "./routes/auth.route.js";
import utilsRoutes from "./routes/utils.route.js";
import userRoutes from "./routes/user.route.js";
import paymentRoutes from "./routes/payment.route.js";
import adminRoutes from "./routes/admin.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./utils/socket.js";

dotenv.config();

let limiter = rateLimit({
  max: 30,
  windowMs: 60 * 1000,
  message: "Too many requests from this IP, please try again after some time",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 4000;

app.use("/api", limiter);
app.use(compression({ level: 6, threshold: 0 }));
app.use(
  express.json({
    limit: "10mb",
    verify: (req, _, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// API Routes
app.get("/api/musk", (req, res) => res.send("Hello from Musk"));
app.use("/api/musk/auth", authRoutes);
app.use("/api/musk/utils", utilsRoutes);
app.use("/api/musk/user", userRoutes);
app.use("/api/musk/payment", paymentRoutes);
app.use("/api/musk/admin", adminRoutes);
app.use("/api/musk/messages", messageRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  app.use((req, res, next) => {
    const indexPath = path.join(frontendPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("index.html not found");
    }
  });
}

server.listen(PORT, () => {
  connDB();
  console.log(`Server running → http://localhost:${PORT}`);
});
