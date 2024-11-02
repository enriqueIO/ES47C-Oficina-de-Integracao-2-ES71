import { prisma } from "../../lib/prisma";

export const validateLoginRepository = {
  async validateUser(userName: string) {
    return prisma.systemUser.findUnique({
      where: { userName },
    });
  },
};
