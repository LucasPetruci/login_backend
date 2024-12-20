import { connectToDataBase } from "../db/dbConfig";
import { User } from "../model/userModel";

export const findByEmail = async (email: string): Promise<User | null> => {
  const pool = await connectToDataBase();
  try {
    const result = await pool
      .request()
      .input("email", email)
      .query(`SELECT * FROM Users WHERE email = @email`);

    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0] as User;
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw error;
  } finally {
    pool.close();
  }
};

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const pool = await connectToDataBase();
  try {
    const result = await pool
      .request()
      .input("email", email)
      .input("password", password)
      .query(
        `INSERT INTO Users (email, password) OUTPUT INSERTED.* VALUES (@email, @password)`
      );

    return result.recordset[0] as User;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  } finally {
    pool.close();
  }
};
