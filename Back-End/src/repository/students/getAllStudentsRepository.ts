import { prisma } from "../../lib/prisma";
import { Student } from "@prisma/client";

export async function getAllStudentsRepository(): Promise<Student[]> {
  return await prisma.student.findMany();
}
