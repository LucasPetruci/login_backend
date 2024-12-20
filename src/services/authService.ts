import bcrypt from "bcrypt";
import * as userRepository from "../Repositories/userRepo";

export const register = async (email: string, password: string) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("Usuário já existe");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(email, encryptedPassword);
};

export const login = async () => {};
