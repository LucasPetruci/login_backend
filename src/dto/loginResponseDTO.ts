import { User } from "../model/userModel";

export interface LoginResponseDTO {
  user: Omit<User, "password">;
  token: string;
}
