import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes.js";
import * as AUTHCONTROLLER from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", protectedRoutes, AUTHCONTROLLER.getMe);
router.post("/register", AUTHCONTROLLER.register);
router.post("/login", AUTHCONTROLLER.login);
router.post("/logout", AUTHCONTROLLER.logout);
router.post("/forgot-password", AUTHCONTROLLER.forgotPassword);
router.post("/reset-password/:token", AUTHCONTROLLER.resetPassword);
router.post("/change-password", protectedRoutes, AUTHCONTROLLER.changePassword);

export default router;
