import { redis } from "../config/redis.js";
import { Billing } from "../models/billing.model.js";
import { Order } from "../models/order.model.js";
import { Review } from "../models/review.model.js";
import { Service } from "../models/service.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getOrdersHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;

    const chacedOrders = await redis.get(`orders:${userId}`);

    if (chacedOrders) {
      return res.status(200).json(JSON.parse(chacedOrders));
    }

    const orders = await Order.find({ userId })
      .populate("serviceId", "name _id ")
      .sort({ createdAt: -1 });

    await redis.set(`orders:${userId}`, JSON.stringify(orders), "EX", 5 * 60);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const postReview = asyncHandler(async (req, res) => {
  try {
    const { rating, review } = req.body;
    const { serviceId } = req.params;
    const userId = req.user?._id;

    if (!rating || !review || !serviceId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 to 5" });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const ifPreveousReview = await Review.findOne({ userId, serviceId });

    if (ifPreveousReview) {
      return res
        .status(400)
        .json({ error: "You already reviewed this service" });
    }

    const isUserHasBroughtService = await Order.findOne({
      userId,
      serviceId,
      status: true,
    });

    if (!isUserHasBroughtService) {
      return res
        .status(400)
        .json({ error: "You have not brought this service" });
    }

    const newReview = await Review.create({
      userId,
      serviceId,
      rating,
      review,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.log("Error in postReview", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const placeOrder = asyncHandler(async (req, res) => {
  try {
    const { serviceId, amount, username, notes, selection, addOns } = req.body;
    const userId = req.user?._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    user.balance -= amount;
    if (user.role === "user") {
      user.role = "client";
    }
    await user.save();

    await redis.del(`user:${userId}`);

    await Order.create({
      serviceId,
      userId,
      amount,
      username,
      notes,
      selection,
      addOns,
    });

    await redis.del(`orders:${userId}`);

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log("Error in placeOrder", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getBillingHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;

    const chacedBillings = await redis.get(`billings:${userId}`);

    if (chacedBillings) {
      return res.status(200).json(JSON.parse(chacedBillings));
    }

    const billings = await Billing.find({ userId }).sort({ createdAt: -1 });

    await redis.set(
      `billings:${userId}`,
      JSON.stringify(billings),
      "EX",
      5 * 60
    );
    res.status(200).json(billings);
  } catch (error) {
    console.log("Error in getBillingHistory", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { getOrdersHistory, postReview, placeOrder, getBillingHistory };
