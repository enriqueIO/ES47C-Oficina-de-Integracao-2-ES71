import { FastifyRequest, FastifyReply } from "fastify";
import { getAllStudentsService } from "../../services/students/getAllStudentsService";

export async function getAllStudentsController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const students = await getAllStudentsService();

    return res.status(200).send(students);
  } catch (error: any) {
    console.error(error);

    return res.status(500).send({
      error,
    });
  }
}
