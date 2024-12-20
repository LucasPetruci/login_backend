import { connectToDataBase } from "./dbConfig";

const testConnection = async () => {
  try {
    const pool = await connectToDataBase();
    console.log("Conexão estabelecida com sucesso!");

    const result = await pool.request().query("SELECT 1 AS test");
    console.log("Resultado da consulta:", result.recordset);

    pool.close();
  } catch (error) {
    console.error("Erro na conexão com o banco:", error);
  }
};

testConnection();
