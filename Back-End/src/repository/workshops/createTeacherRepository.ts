import { Workshop } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function createWorkshopRepository(data: Omit<Workshop, "id">) {
  return await prisma.workshop.create({ data });
}
