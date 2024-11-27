import { FastifyReply, FastifyRequest } from "fastify";
import { createStudentService } from "../../services/students/createStudentService";
import { encryptPassword } from "../../lib/encryptPassword";

export async function createStudentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, userName, password, phone, email } = request.body as any;

    const protectedPassword = await encryptPassword(password);

    const student = await createStudentService({
      name,
      userName,
      password: protectedPassword,
      phone,
      email,
    });

    reply.code(201).send(student);
  } catch (error: any) {
    console.error("Erro ao criar o aluno: ", error);
    reply.code(500).send({ error: "Erro ao criar o aluno" });
  }
}
