import { SystemUser } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function createUserRepository(data: Omit<SystemUser, "id">) {
  return await prisma.systemUser.create({ data });
}
