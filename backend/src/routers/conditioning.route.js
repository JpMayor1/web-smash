import express from "express";
import {
  createConditioning,
  getAllConditionings,
  updateConditioning,
  deleteConditioning,
} from "../controllers/conditioning.controller.js";

const router = express.Router();

router.get("/get", getAllConditionings);

router.post("/create", createConditioning);

router.put("/update/:id", updateConditioning);

router.delete("/delete/:id", deleteConditioning);

export default router;
