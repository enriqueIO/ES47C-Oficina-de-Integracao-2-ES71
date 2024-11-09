import { prisma } from "../../lib/prisma";

export async function validateLoginRepository(userName: string) {
  return await prisma.systemUser.findUnique({
    where: { userName },
  });
}
