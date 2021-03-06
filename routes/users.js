const {
  listUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const getUsersopts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
          },
        },
      },
    },
  },
  handler: listUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          age: { type: "integer" },
        },
      },
    },
  },
  handler: getUser,
};

const updateItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "age"],
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: updateUser,
};
const postUserOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "age"],
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          age: { type: "integer" },
        },
      },
    },
  },
  handler: addUser,
};
const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: "string",
      },
    },
  },
  handler: deleteUser,
};

async function routes(fastify, options) {
  fastify.get("/users", getUsersopts);
  fastify.post("/users", postUserOpts);
  fastify.get("/users/:id", getUserOpts);
  fastify.put("/users/:id", updateItemOpts);
  fastify.delete("/users/:id", deleteUserOpts);
}
module.exports = routes;
