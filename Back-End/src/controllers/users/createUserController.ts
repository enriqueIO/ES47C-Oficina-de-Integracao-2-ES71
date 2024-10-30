import { FastifyReply, FastifyRequest } from "fastify";
import { createUserService } from "../../services/users/createUserService";
import { encryptPassword } from "../../lib/encryptPassword";

export const createUserController = {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, userName, password } = request.body as any;

      const protectedPassword = await encryptPassword(password);

      const user = await createUserService.createUser({
        name,
        userName,
        password: protectedPassword,
      });

      reply.code(201).send(user);
    } catch (error: any) {
      console.error("Erro ao criar o usuário: ", error);
      reply.code(500).send({ error: "Erro ao criar usuário" });
    }
  },
};
