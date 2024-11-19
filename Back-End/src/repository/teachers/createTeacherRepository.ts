import { Teacher } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function createTeacherRepository(data: Omit<Teacher, "id">) {
  return await prisma.teacher.create({ data });
}
