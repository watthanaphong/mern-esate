// api/routes/user.route.js
import express from 'express';
import { updateUser} from '../controllers/user.controller.js';
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.put("/:id", verifyToken, (req, res, next) => {
  next();
}, updateUser);


export default router;