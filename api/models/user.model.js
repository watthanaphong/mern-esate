// api/models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK-5-DUAn8F-Uj_pHNDRyprT6W7FV4WVEBtw&s",
    },
    avatarPublicId: {
      type: String, // 👈 สำคัญมาก
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
