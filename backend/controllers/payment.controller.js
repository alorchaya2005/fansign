import axios from "axios";
import { Billing } from "../models/billing.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import crypto from "crypto";
import { redis } from "../config/redis.js";
const cryptomusUrl = "https://api.cryptomus.com/v1";

const createStripeCheckoutSession = asyncHandler(async (req, res) => {
  try {
    const { name, amount } = req.body;
    const userId = req.user?._id;

    if (!name || !amount || !userId) {
      return res.status(400).json({ error: "Please select credit amout" });
    }

    // Delete deposit that are more than 10 days old and has payment status pending
    const fifteenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    await Billing.deleteMany({
      status: "pending",
      createdAt: { $lte: fifteenDaysAgo },
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const billing = await Billing.create({
      userId,
      credits: amount,
      paymentMethod: "stripe",
    });
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success/${billing?._id}/${token}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.status(200).json({
      url: session?.url,
      id: session?.id,
    });
  } catch (error) {
    console.log("Error in createStripeCheckoutSession", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const markStripeBillAsPaid = asyncHandler(async (req, res) => {
  try {
    const { billingId, token } = req.params;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized, No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized, invalid token" });
    }

    const userId = decoded?.userId;

    const billing = await Billing.findById(billingId);
    if (!billing) {
      return res.status(404).json({ error: "Billing not found" });
    }

    if (billing.userId.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (billing.status === "completed") {
      return res.status(400).json({ error: "Billing already marked as paid" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await redis.del(`user:${userId}`);

    const amountToCredit = parseFloat(billing.credits);
    if (isNaN(amountToCredit) || amountToCredit <= 0) {
      return res.status(400).json({ error: "Invalid order amount" });
    }

    user.balance += billing.credits;
    await user.save();

    billing.status = "completed";
    await billing.save();
    res.status(200).json({ message: "Billing marked as paid" });
  } catch (error) {
    console.log("Error in markStripeBillAsPaid", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const createCryptoPayment = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user?._id;

    // Delete deposit that are more than 10 days old and has payment status pending
    const fifteenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    await Billing.deleteMany({
      status: "pending",
      createdAt: { $lte: fifteenDaysAgo },
    });

    if (!amount || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const billing = await Billing.create({ userId, credits: amount });

    const payload = {
      amount,
      currency: "USD",
      order_id: billing._id,
      url_callback:
        "http://localhost:4000/api/musk/payment/crypto-payment-success",
    };

    const bufferData = Buffer.from(JSON.stringify(payload))
      .toString("base64")
      .concat(process.env.CRYPTOMUS_API_KEY);

    const sign = crypto.createHash("md5").update(bufferData).digest("hex");

    const { data } = await axios.post(`${cryptomusUrl}/payment`, payload, {
      headers: {
        merchant: process.env.CRYPTOMUS_MARCHANT,
        sign,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json({ paymentLink: data?.result?.url });
  } catch (error) {
    console.log("Error in createCryptoPayment", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const markCryptoBillAsPaid = asyncHandler(async (req, res) => {
  try {
    const { sign, order_id } = req.body;
    if (!sign) {
      return res.status(400).json({ error: "Invalid payment request" });
    }

    // Verify payment signature
    const data = JSON.parse(req.rawBody);
    delete data.sign;
    const bufferData = Buffer.from(JSON.stringify(data))
      .toString("base64")
      .concat(process.env.CRYPTOMUS_API_KEY);

    const hash = crypto.createHash("md5").update(bufferData).digest("hex");
    if (hash !== sign) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const billing = await Billing.findById(order_id);

    if (!billing) {
      return res.status(404).json({ error: "Billing not found" });
    }

    if (billing.status === "completed") {
      return res.status(400).json({ error: "Billing already marked as paid" });
    }

    const userId = billing.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const amountToCredit = parseFloat(billing.credits);
    if (isNaN(amountToCredit) || amountToCredit <= 0) {
      return res.status(400).json({ error: "Invalid order amount" });
    }

    user.balance += billing.credits;
    await user.save();

    billing.status = "completed";
    await billing.save();

    res.status(200).json({ message: "Billing marked as paid" });
  } catch (error) {
    console.log("Error in markCryptoBillAsPaid", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  createStripeCheckoutSession,
  markStripeBillAsPaid,
  createCryptoPayment,
  markCryptoBillAsPaid,
};
