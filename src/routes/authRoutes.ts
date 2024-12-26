import express, { Router, Request, Response } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../Controllers/authController";

const router: Router = express.Router();

//login
router.post("/login", loginUser);

//post
router.post("/register", registerUser);

//logout
router.post("/logout", logoutUser);

export default router;
