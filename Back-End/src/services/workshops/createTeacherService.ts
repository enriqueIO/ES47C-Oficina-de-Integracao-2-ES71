import { createWorkshopRepository } from "../../repository/workshops/createTeacherRepository";

export async function createWorkshopService(data: any) {
  return await createWorkshopRepository(data);
}
