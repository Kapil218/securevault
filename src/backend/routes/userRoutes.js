import express from "express";
import { createUser, getUser } from "../controllers/userController.js";
const router = express.Router();
router.route("/create").post(createUser);
router.route("/get").post(getUser);
export default router;
