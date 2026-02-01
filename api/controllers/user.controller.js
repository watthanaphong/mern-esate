// api/controllers/user.controller.js
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const updateUser = async (req, res, next) => {

  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const {
      username,
      email,
      password,
      avatar,
      avatarPublicId,
    } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // =========================
    // 🔥 ลบรูปเก่าบน Cloudinary
    // =========================
    if (
      avatarPublicId &&
      user.avatarPublicId &&
      avatarPublicId !== user.avatarPublicId
    ) {
      await cloudinary.uploader.destroy(user.avatarPublicId);
    }

    // =========================
    // 📝 เตรียม data สำหรับ update
    // =========================
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (avatar) updateData.avatar = avatar;
    if (avatarPublicId) updateData.avatarPublicId = avatarPublicId;

    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    const { password: pw, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);
    next(err);
  }
};
