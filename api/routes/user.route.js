// api/routes/user.route.js
import express from 'express';
import { updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.put("/:id", verifyToken, (req, res, next) => {
  next();
}, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);


export default router;