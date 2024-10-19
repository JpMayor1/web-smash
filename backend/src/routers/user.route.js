import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import userProtectRoute from "../middleware/user.protected.route.js";
const router = express.Router();

// Update user profile route
router.put("/profile/update", userProtectRoute, updateUser);

export default router;
