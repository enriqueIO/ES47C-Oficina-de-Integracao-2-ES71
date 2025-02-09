import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllWorkshopsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const workshops = await prisma.workshop.findMany();
    reply.send(workshops);
  } catch (error) {
    console.error("Erro ao buscar workshops: ", error);
    reply.code(500).send({ error: "Erro ao buscar workshops" });
  }
}
