const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");

dotenv.config();

fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  url: process.env.CONNECT_DB,
});
fastify.register(require("./routes/users"));

fastify.get("/", function (req, reply) {
  reply.send({ message: "Hello! Go to /users instead" });
});

fastify.listen(8080, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
