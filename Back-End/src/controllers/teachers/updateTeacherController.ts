import { FastifyReply, FastifyRequest } from "fastify";
import { updateTeacherService } from "../../services/teachers/updateTeacherService";

export async function updateTeacherController(
  req: FastifyRequest<{
    Body: { teacherData: any };
    Params: { teacherId: number };
  }>,
  res: FastifyReply
) {
  try {
    const { teacherId } = req.params;
    const { teacherData } = req.body;

    const updatedTeacher = await updateTeacherService(teacherId, teacherData);

    return res.status(200).send(updatedTeacher);
  } catch (error: any) {
    console.error(error);
    return res.status(500).send({ error });
  }
}
