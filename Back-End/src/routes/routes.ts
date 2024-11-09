import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/users/createUserController";
import { validateLoginController } from "../controllers/users/validateLoginController";

export async function routes(fastify: FastifyInstance) {
  fastify.post("/createUser", createUserController);
  fastify.post("/validateLogin", validateLoginController);
}
