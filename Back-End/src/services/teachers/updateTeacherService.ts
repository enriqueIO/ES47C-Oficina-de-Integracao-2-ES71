import { updateTeacherRepository } from "../../repository/teachers/updateTeacherRepository";

export async function updateTeacherService(teacherId: number, teacherData: any) {
  return await updateTeacherRepository(teacherId, teacherData);
}
