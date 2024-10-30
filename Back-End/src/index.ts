import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { routes } from "./routes/routes";

const app = fastify();
const port = 3333;

app.register(routes);

app.listen({ port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${port}`);
});
