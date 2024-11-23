import { FastifyReply, FastifyRequest } from "fastify";
import { deleteTeacherService } from "../../services/teachers/deleteTeacherService";

export async function deleteTeacherController(
  req: FastifyRequest<{ Body: { id: number } }>,
  res: FastifyReply
) {
  try {
    const { id } = req.body;

    const deletedTeacher = await deleteTeacherService(id);

    return res.status(200).send(deletedTeacher);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ error });
  }
}
