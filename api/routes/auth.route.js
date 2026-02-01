import express from 'express';
import { loginLimiter } from "../utils/rateLimit.js";
import { signup, signin, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin',loginLimiter, signin);
router.post('/google', google);

export default router;