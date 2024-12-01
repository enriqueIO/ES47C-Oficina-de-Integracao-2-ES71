import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateLoginRepository } from "../../repository/users/validateLoginRepository";

export async function validateLoginService(userName: string, password: string, type: string) {
  const user = await validateLoginRepository(userName, type);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  let isPasswordValid = false;

  if (user.password.startsWith("$2b$") || user.password.startsWith("$2a$")) {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } else {
    isPasswordValid = password === user.password;
  }

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
