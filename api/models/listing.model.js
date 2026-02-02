import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 70,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["rent", "sale"],
      required: true,
    },

    parking: {
      type: Boolean,
      default: false,
    },

    furnished: {
      type: Boolean,
      default: false,
    },

    offer: {
      type: Boolean,
      default: false,
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    regularPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          if (!this.offer) return true;
          return value < this.regularPrice;
        },
        message: "Discount price must be lower than regular price",
      },
    },

    images: {
      type: [imageSchema],
      validate: [
        (val) => val.length > 0 && val.length <= 6,
        "Please upload between 1 and 6 images",
      ],
      required: true,
    },

    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
