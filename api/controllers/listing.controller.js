import Listing from "../models/listing.model.js";
import cloudinary from "../utils/cloudinary.js";

/* ================= CREATE ================= */
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      userRef: req.user.id,
    });

    res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};


/* ================= UPDATE ================= */
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json("Listing not found");

    if (listing.userRef.toString() !== req.user.id) {
      return res.status(403).json("Not allowed");
    }

    const incomingImages = req.body.images || [];

    /* 🔥 DELETE REMOVED IMAGES FROM CLOUDINARY */
    const incomingPublicIds = incomingImages.map(
      (img) => img.public_id
    );

    const removedImages = listing.images.filter(
      (img) => !incomingPublicIds.includes(img.public_id)
    );

    await Promise.all(
      removedImages.map((img) =>
        cloudinary.uploader.destroy(img.public_id)
      )
    );

    /* 🔥 UPDATE LISTING */
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: incomingImages,
        userRef: listing.userRef, // กัน spoof
      },
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (err) {
    next(err);
  }
};


/* ================= GET SINGLE ================= */
// export const getListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) return res.status(404).json("Listing not found");
//     res.json(listing);
//   } catch (err) {
//     next(err);
//   }
// };
// api/controllers/listing.controller.js
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('userRef', 'username email');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};


/* ================= DELETE LISTING ================= */
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json("Listing not found");

    if (listing.userRef.toString() !== req.user.id) {
      return res.status(403).json("Not allowed");
    }

    await Promise.all(
      listing.images.map((img) =>
        cloudinary.uploader.destroy(img.public_id)
      )
    );

    await listing.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};


/* ================= USER LISTING ================= */
export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.user.id });
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

