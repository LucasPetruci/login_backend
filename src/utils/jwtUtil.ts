import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Use uma variável de ambiente em produção

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET_KEY);
};
