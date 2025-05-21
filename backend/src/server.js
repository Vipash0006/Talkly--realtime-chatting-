import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://talkly-chat.vercel.app", // Vercel frontend
  "https://real-chat-lac.vercel.app", // Alternative Vercel frontend
  process.env.FRONTEND_URL, // Additional frontend URL from env
].filter(Boolean);

console.log("Allowed origins:", allowedOrigins);

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request origin:", origin);
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log("No origin, allowing request");
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        console.log("Origin allowed:", origin);
        callback(null, true);
      } else {
        console.log("Origin not allowed:", origin);
        callback(null, true); // Temporarily allow all origins for debugging
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400 // 24 hours
  })
);

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
