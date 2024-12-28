import { Request, Response } from "express";
import * as authService from "../services/authService";
import { User } from "../model/userModel";
import { RegisterUserDTO } from "../dto/registerUserDTO";
import { LoginUserDTO } from "../dto/loginUserDTO";
import { LoginResponseDTO } from "../dto/loginResponseDTO";

//register
const registerUser = async (
  req: Request<{}, {}, RegisterUserDTO>,
  res: Response
): Promise<void> => {
  const { email, password }: RegisterUserDTO = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user: User = await authService.register(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//login
const loginUser = async (
  req: Request<{}, {}, LoginUserDTO>,
  res: Response<LoginResponseDTO | { message: string }>
): Promise<void> => {
  const { email, password }: LoginUserDTO = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const result: LoginResponseDTO = await authService.login(email, password);

    if (!result) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const { user, token } = result;
    res.status(200).json({ user: { id: user.id, email: user.email }, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = (req: Request, res: Response) => {};

export { registerUser, loginUser, logoutUser };
