import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function updateTeacherRepository(
  teacherId: number,
  teacherData: Prisma.TeacherUncheckedUpdateInput
) {
  const { id, ...cleanedTeacherData } = teacherData;

  return await prisma.teacher.update({
    where: {
      id: teacherId,
    },
    data: cleanedTeacherData,
  });
}