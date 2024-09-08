"use strict";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import connectToMongoDB from "./db/db.connect.js";
import userAuthRouter from "./routers/auth.user.route.js";
import adminAuthRouter from "./routers/auth.admin.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Web-Smash Badminton Training Website!");
});

app.use("/api/auth/user", userAuthRouter);
app.use("/api/auth/admin", adminAuthRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${port}`);
});
