import { prisma } from "../../lib/prisma";

export async function getTeachersRepository() {
  return await prisma.teacher.findMany();
}
