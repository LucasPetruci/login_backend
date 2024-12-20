import express, { Router, Request, Response } from "express";
import {
  registerUser,
  authenticateUser,
  logoutUser,
} from "../Controllers/authController";

const router: Router = express.Router();

//login
router.post("/login", authenticateUser);

//post
router.post("/register", registerUser);

//logout
router.post("/logout", logoutUser);

export default router;
