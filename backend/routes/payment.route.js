import express from "express";
import * as PAYMENTCONTROLLER from "../controllers/payment.controller.js";
import { protectedRoutes } from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post(
  "/create-checkout-session",
  protectedRoutes,
  PAYMENTCONTROLLER.createStripeCheckoutSession
);
router.post(
  "/mark-stripe-payment-success/:billingId/:token",
  PAYMENTCONTROLLER.markStripeBillAsPaid
);

router.post(
  "/create-crypto-payment",
  protectedRoutes,
  PAYMENTCONTROLLER.createCryptoPayment
);
router.post("/crypto-payment-success", PAYMENTCONTROLLER.createCryptoPayment);

export default router;
