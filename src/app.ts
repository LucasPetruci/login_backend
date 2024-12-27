import express, { Application } from "express";
import loginRouter from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use("/", loginRouter);

export default app;
