import { Student } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function createStudentRepository(data: Omit<Student, "id">) {
  return await prisma.student.create({ data });
}
