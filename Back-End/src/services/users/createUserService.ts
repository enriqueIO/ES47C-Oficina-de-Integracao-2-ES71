import { createUserRepository } from "../../repository/users/createUserRepository";

export async function createUserService(data: any) {
  return await createUserRepository(data);
}
