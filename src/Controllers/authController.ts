import { Request, Response } from "express";
import * as authService from "../services/authService";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await authService.register(email, password);
    res.status(200).json(token);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const authenticateUser = (req: Request, res: Response) => {};
const logoutUser = (req: Request, res: Response) => {};

export { registerUser, authenticateUser, logoutUser };
