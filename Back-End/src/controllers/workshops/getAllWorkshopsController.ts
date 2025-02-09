import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function getAllWorkshopsController(req: FastifyRequest, res: FastifyReply) {
  try {
    const workshops = await prisma.workshop.findMany();
    return res.send(workshops);
  } catch (error) {
    console.error("Erro ao buscar workshops:", error);
    return res.status(500).send({ error: "Erro ao buscar workshops" });
  }
}
