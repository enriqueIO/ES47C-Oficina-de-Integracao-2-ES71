import { SystemUser } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const createUserRepository = {
  async createUser(data: Omit<SystemUser, "id">) {
    return prisma.systemUser.create({ data });
  },
};
