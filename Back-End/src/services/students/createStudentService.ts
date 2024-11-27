import { createStudentRepository } from "../../repository/students/createStudentRepository";

export async function createStudentService(data: any) {
  return await createStudentRepository(data);
}
