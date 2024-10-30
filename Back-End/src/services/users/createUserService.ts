import { createUserRepository } from "../../repository/users/createUserRepository";

export const createUserService = {
  async createUser(data: any) {
    return createUserRepository.createUser(data);
  },
};
