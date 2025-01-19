import { Student } from "@prisma/client";
import { getAllStudentsRepository } from "../../repository/students/getAllStudentsRepository";

export async function getAllStudentsService(): Promise<Student[]> {
  return await getAllStudentsRepository();
}
