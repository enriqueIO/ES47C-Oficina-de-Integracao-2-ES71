import { validateLoginRepository } from "../../repository/users/validateLoginRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function validateLoginService(userName: string, password: string) {
  const user = await validateLoginRepository(userName);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign(
    { userId: user.id, userName: user.name },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1h",
    }
  );

  return { token };
}
