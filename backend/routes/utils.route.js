import express from "express";
import * as UTILSCONTROLLER from "../controllers/utils.controller.js";

const router = express.Router();

router.get("/for-you", UTILSCONTROLLER.getForYouServices);
router.get("/all-services", UTILSCONTROLLER.getAllServices);
router.get("/service/:serviceId", UTILSCONTROLLER.getSingleService);
router.get("/search-services", UTILSCONTROLLER.searchServices);

router.get("/service-review/:serviceId", UTILSCONTROLLER.getServiceReviews);

export default router;
