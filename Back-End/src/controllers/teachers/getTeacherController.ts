import { FastifyRequest, FastifyReply } from "fastify";
import { getTeachersService } from "../../services/teachers/getTeachersService";

export async function getTeacherController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const teachers = await getTeachersService();

    return res.status(200).send(teachers);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ error });
  }
}
