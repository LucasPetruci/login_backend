import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtil";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token); // Verifica e decodifica o token
    //req.user = decoded; // Adiciona o payload do token ao objeto req
    next(); // Continua para o próximo middleware ou rota
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
