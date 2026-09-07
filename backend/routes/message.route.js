import express from "express";
import * as MESSAGECONTROLLER from "../controllers/message.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.get("/users", protectedRoutes, MESSAGECONTROLLER.getUserForSidebar);
router.get("/admins", protectedRoutes, MESSAGECONTROLLER.getAdminAccForSidebar);
router.get("/:id", protectedRoutes, MESSAGECONTROLLER.getMessages);
router.post("/send/:id", protectedRoutes, MESSAGECONTROLLER.sendMessage);

export default router;
