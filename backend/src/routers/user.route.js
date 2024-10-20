import express from "express";
import { getUsers, updateUser } from "../controllers/user.controller.js";
import userProtectRoute from "../middleware/user.protected.route.js";
const router = express.Router();

router.get("/profile/getAllUsers", getUsers);
router.put("/profile/update", userProtectRoute, updateUser);

export default router;
