// api/utils/verifyToken.js
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token || typeof token !== "string") {
    return next(errorHandler(401, "Not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(errorHandler(403, "Token is invalid or expired"));
    }

    req.user = Object.freeze(decoded); // 🔒 ป้องกันแก้ไข
    next();
  });
};
