import { getTeachersRepository } from "../../repository/teachers/getTeachersRepository";

export async function getTeachersService() {
  return await getTeachersRepository();
}