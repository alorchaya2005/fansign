import express from "express";
import * as ADMINCONTROLLER from "../controllers/admin.controller.js";
import { adminRoutes } from "../middleware/adminRoutes.js";

const router = express.Router();

router.post("/create-service", adminRoutes, ADMINCONTROLLER.createService);
router.get("/get-categories", ADMINCONTROLLER.getAllCategories);
router.get("/get-all-orders", adminRoutes, ADMINCONTROLLER.getAllOrders);
router.post("/create-category", adminRoutes, ADMINCONTROLLER.createCategory);
router.post(
  "/mark-order/:orderId",
  adminRoutes,
  ADMINCONTROLLER.markOrderComplete
);
router.delete(
  "/delete-category/:categoryId",
  adminRoutes,
  ADMINCONTROLLER.deleteCategory
);
router.post(
  "/edit-category/:categoryId",
  adminRoutes,
  ADMINCONTROLLER.editCategory
);

export default router;
