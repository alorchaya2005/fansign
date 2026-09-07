import { asyncHandler } from "../utils/asyncHandler.js";
import { Service } from "../models/service.model.js";
import { redis } from "../config/redis.js";
import { Category } from "../models/categories.model.js";
import { Review } from "../models/review.model.js";

const getForYouServices = asyncHandler(async (req, res) => {
  try {
    const cachedServices = await redis.get("forYouServices");

    if (cachedServices) {
      return res.status(200).json(JSON.parse(cachedServices));
    }

    const services = await Service.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          images: {
            $cond: {
              if: { $isArray: "$images" },
              then: { $arrayElemAt: ["$images", 0] },
              else: "$images", // fallback in case it's not an array
            },
          },
          name: 1,
          price: 1,
        },
      },
    ]);

    await redis.set("forYouServices", JSON.stringify(services), "EX", 50 * 60);
    res.status(200).json(services);
  } catch (error) {
    console.log("Error in getForYouServices", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await Service.aggregate([
      { $sample: { size: await Service.countDocuments() } },
      {
        $project: {
          images: { $arrayElemAt: ["$images", 0] },
          name: 1,
          price: 1,
          featured: 1,
          deliveryTime: 1,
        },
      },
    ]);

    res.status(200).json(services);
  } catch (error) {
    console.log("Error in getAllServices", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const searchServices = asyncHandler(async (req, res) => {
  try {
    const { category, search } = req.query;

    const matchStage = {};
    const shouldFilter = category || search;

    if (category) {
      matchStage.category = category;
    }

    if (search) {
      matchStage.name = { $regex: search, $options: "i" };
    }

    let services;

    if (!shouldFilter) {
      // No search or category — return shuffled (random)
      const total = await Service.countDocuments();
      services = await Service.aggregate([
        { $sample: { size: total } },
        {
          $project: {
            images: { $arrayElemAt: ["$images", 0] },
            name: 1,
            price: 1,
            featured: 1,
            deliveryTime: 1,
          },
        },
      ]);
    } else {
      // Filtered results
      services = await Service.aggregate([
        { $match: matchStage },
        {
          $project: {
            images: { $arrayElemAt: ["$images", 0] },
            name: 1,
            price: 1,
            featured: 1,
            deliveryTime: 1,
          },
        },
      ]);
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error in searchServices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getServiceReviews = asyncHandler(async (req, res) => {
  try {
    const { serviceId } = req.params;
    const cachedReviews = await redis.get(`reviews:${serviceId}`);

    if (cachedReviews) {
      return res.status(200).json(JSON.parse(cachedReviews));
    }
    const reviews = await Review.find({ serviceId });

    await redis.set(
      `reviews:${serviceId}`,
      JSON.stringify(reviews),
      "EX",
      5 * 60
    );
    res.status(200).json(reviews);
  } catch (error) {
    console.log("Error in getServiceReviews", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getSingleService = asyncHandler(async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);
    res.status(200).json(service);
  } catch (error) {
    console.log("Error in getSingleService", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  getForYouServices,
  getAllServices,
  getServiceReviews,
  getSingleService,
  searchServices,
};
