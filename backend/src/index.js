"use strict";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

import connectToMongoDB from "./db/db.connect.js";
import userAuthRouter from "./routers/auth.user.route.js";
import adminAuthRouter from "./routers/auth.admin.route.js";
import trainingRouter from "./routers/training.route.js";
import conditioningRouter from "./routers/conditioning.route.js";
import userRouter from "./routers/user.route.js";
import chunkRouter from "./routers/videos.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Add "X-Requested-With"
    exposedHeaders: ["Content-Disposition"], // Expose necessary headers if needed (for downloading files, etc.)
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  "/",
  express.static(path.join(process.cwd(), "public"), {
    setHeaders: (res, path) => {
      res.set("Accept-Ranges", "bytes");
    },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Web-Smash Badminton Training Website!");
});

app.use("/api/auth/user", userAuthRouter);
app.use("/api/auth/admin", adminAuthRouter);
app.use("/api/trainings", trainingRouter);
app.use("/api/conditionings", conditioningRouter);
app.use("/api/user", userRouter);
app.use("/api/videos", chunkRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on Port: ${port}`);
});
