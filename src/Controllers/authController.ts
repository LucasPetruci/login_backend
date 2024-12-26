import { Request, Response } from "express";
import * as authService from "../services/authService";
import { User } from "../model/userModel";

//register
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: User = await authService.register(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//login
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);

    if (!result) {
      res.status(401).json({ message: "Invalid email or password" });
    }
    const { user, token } = result;
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = (req: Request, res: Response) => {};

export { registerUser, loginUser, logoutUser };
