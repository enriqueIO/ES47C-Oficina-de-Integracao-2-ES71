import { FastifyReply, FastifyRequest } from "fastify";
import { validateLoginService } from "../../services/users/validateLoginService";

export async function validateLoginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { userName, password, type } = request.body as any;

    const { token } = await validateLoginService(userName, password, type);

    reply.code(200).send({ token });
  } catch (error: any) {
    console.error("Erro ao fazer login: ", error);
    reply.code(401).send({ error: "Credenciais inválidas" });
  }
}
