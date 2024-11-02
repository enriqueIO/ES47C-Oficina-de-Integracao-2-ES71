import fastify from "fastify";
import { routes } from "./routes/routes";

const app = fastify();
const port = 3333;

app.addHook("onSend", (request, reply, payload, done) => {
  reply.headers({
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  done();
});

app.options("/*", (request, reply) => {
  reply
    .header("Access-Control-Allow-Origin", "http://localhost:3000")
    .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    .send();
});

app.register(routes);

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
