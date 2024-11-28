import { FastifyReply, FastifyRequest } from "fastify";
import { createWorkshopService } from "../../services/workshops/createTeacherService";

export async function createWorkshopController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { title, description, professor, workshopDate, hour } = request.body as any;

    const workshop = await createWorkshopService({
      title,
      description,
      professor,
      workshopDate,
      hour,
    });

    reply.code(201).send(workshop);
  } catch (error: any) {
    console.error("Erro ao criar o workshop: ", error);
    reply.code(500).send({ error: "Erro ao criar o workshop" });
  }
}
