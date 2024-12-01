import { prisma } from "../../lib/prisma";

export async function validateLoginRepository(userName: string, type: string) {
  if (type === "student") {
    console.log(userName, type);
    return await prisma.student.findUnique({
      where: { userName },
    });
  } else if (type === "teacher") {
    return await prisma.teacher.findUnique({
      where: { userName },
    });
  } else {
    throw new Error("Tipo de usuário inválido");
  }
}