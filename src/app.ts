import express, { Application } from "express";
import loginRouter from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/", loginRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
