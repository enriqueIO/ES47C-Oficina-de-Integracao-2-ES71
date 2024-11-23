import { deleteTeacherRepository } from "../../repository/teachers/deleteTeacherRepository";

export async function deleteTeacherService(id: number) {
  return await deleteTeacherRepository(id);
}
