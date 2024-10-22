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

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on Port: ${port}`);
});
