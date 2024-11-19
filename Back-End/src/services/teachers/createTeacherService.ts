import { createTeacherRepository } from "../../repository/teachers/createTeacherRepository";

export async function createTeacherService(data: any) {
  return await createTeacherRepository(data);
}
