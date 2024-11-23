import { prisma } from "../../lib/prisma";

export async function deleteTeacherRepository(id: number) {
  return await prisma.teacher.delete({
    where: {
      id,
    },
  });
}
