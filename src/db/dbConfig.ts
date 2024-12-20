import sql from "mssql";
import dotenv from "dotenv";
import path from "path";

// Garante que o caminho do .env seja absoluto
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
console.log("DB_SERVER:", process.env.DB_SERVER);

const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER!,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const connectToDataBase = async (): Promise<sql.ConnectionPool> => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Conectado ao banco de dados");
    console.log(pool);
    return pool;
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error);
    throw error;
  }
};
