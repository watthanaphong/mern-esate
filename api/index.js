import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
console.log('🔥 index.js is running');

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
  });

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);