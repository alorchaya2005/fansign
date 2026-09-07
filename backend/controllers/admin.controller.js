import { Service } from "../models/service.model.js";
import { v2 as cloudinary } from "cloudinary";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/categories.model.js";
import { redis } from "../config/redis.js";
import sharp from "sharp";
import { createCanvas } from "canvas";
import streamifier from "streamifier";
import { Order } from "../models/order.model.js";

const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      details,
      price,
      deliveryTime,
      revisions,
      category,
      images,
      customFields,
      selection,
    } = req.body;

    if (!name || !price || !deliveryTime || !revisions || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    // Upload to Cloudinary with text watermark transformation
    const uploadToCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            format: "webp", // or gif, depending on source type
            transformation: [
              {
                overlay: {
                  font_family: "Arial",
                  font_size: 60,
                  font_weight: "bold",
                  text: "Sign",
                },
                gravity: "center",
                angle: 20,
                color: "#D130AF",
                opacity: 40,
              },
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    };

    const uploadedImages = [];

    for (const base64Img of images) {
      const buffer = Buffer.from(base64Img.split(",")[1], "base64");
      const secureUrl = await uploadToCloudinary(buffer);
      uploadedImages.push(secureUrl);
    }

    await Service.create({
      name,
      description,
      details,
      price,
      deliveryTime,
      revisions,
      category,
      images: uploadedImages,
      selection,
      customFields,
    });

    res.status(201).json({ message: "Service created" });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const cachedCategories = await redis.get("categories");

    if (cachedCategories) {
      return res.status(200).json(JSON.parse(cachedCategories));
    }
    const categories = await Category.find().sort({ createdAt: -1 });
    await redis.set("categories", JSON.stringify(categories), "EX", 10 * 60);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const editCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      {
        new: true,
      }
    );
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByIdAndDelete(categoryId);
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("serviceId", "name _id")
      .populate("userId", "username _id role")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getAllOrders", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const markOrderComplete = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: true },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log("Error in markOrderComplete", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  createService,
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
  getAllOrders,
  markOrderComplete,
};
