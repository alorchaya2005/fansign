import express from "express";
import * as USERCONTROLLER from "../controllers/user.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.get("/order-history", protectedRoutes, USERCONTROLLER.getOrdersHistory);
router.get(
  "/billing-history",
  protectedRoutes,
  USERCONTROLLER.getBillingHistory
);
router.post(
  "/post-review/:serviceId",
  protectedRoutes,
  USERCONTROLLER.postReview
);
router.post("/place-order", protectedRoutes, USERCONTROLLER.placeOrder);

export default router;
