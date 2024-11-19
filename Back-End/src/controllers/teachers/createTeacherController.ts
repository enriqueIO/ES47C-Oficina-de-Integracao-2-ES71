import { FastifyReply, FastifyRequest } from "fastify";
import { createTeacherService } from "../../services/teachers/createTeacherService";
import { encryptPassword } from "../../lib/encryptPassword";

export async function createTeacherController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, userName, password, phone, email } = request.body as any;

    const protectedPassword = await encryptPassword(password);

    const teacher = await createTeacherService({
      name,
      userName,
      password: protectedPassword,
      phone, 
      email
    });

    reply.code(201).send(teacher);
  } catch (error: any) {
    console.error("Erro ao criar o professor: ", error);
    reply.code(500).send({ error: "Erro ao criar o professor" });
  }
}
