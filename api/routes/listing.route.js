import express from "express";
import {
  createListing,
  updateListing,
  getListing,
  deleteListing,
  getUserListings,
} from "../controllers/listing.controller.js";

import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createListing);
router.put("/:id", verifyToken, updateListing);
router.get("/:id", getListing);
router.delete("/:id", verifyToken, deleteListing);
router.get("/user/me", verifyToken, getUserListings);

export default router;
