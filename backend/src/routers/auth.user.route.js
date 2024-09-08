import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/auth.user.controller.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.post("/logout", userLogout);

export default router;
