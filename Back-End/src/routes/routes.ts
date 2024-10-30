import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/users/createUserController";

export async function routes(fastify: FastifyInstance) {
  fastify.post("/createUser", createUserController.createUser);
}
