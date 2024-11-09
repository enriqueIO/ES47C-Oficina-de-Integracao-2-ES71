import { FastifyReply, FastifyRequest } from "fastify";
import { validateLoginService } from "../../services/users/validateLoginService";

export async function validateLoginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { userName, password } = request.body as any;

    const { token } = await validateLoginService(userName, password);

    reply.code(200).send({ token });
  } catch (error: any) {
    console.error("Erro ao fazer login: ", error);
    reply.code(401).send({ error: "Credenciais inválidas" });
  }
}
