const ObjectID = require("mongodb").ObjectID;

async function listUsers(req, reply) {
  const users = this.mongo.db.collection("users");

  const result = await users.find({}).toArray();
  console.log(result);
  reply.send(result);
}

async function addUser(req, reply) {
  const users = this.mongo.db.collection("users");

  const { name, age } = req.body;
  const data = { name, age };
  const result = await users.insertOne(data);
  reply.code(201).send(result.ops[0]);
}
async function getUser(req, reply) {
  const users = this.mongo.db.collection("users");
  const result = await users.findOne({ _id: new ObjectID(req.params.id) });
  if (result) {
    return reply.send(result);
  }
  reply.code(500).send({ message: "Not found" });
}
async function updateUser(req, reply) {
  const users = this.mongo.db.collection("users");

  const { name, age } = req.body;

  const updateDoc = {
    $set: {
      name,
      age,
    },
  };
  const result = await users.updateOne(
    { _id: ObjectID(req.params.id) },
    updateDoc,
    { upsert: true }
  );
  console.log(result);
  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  });
}
async function deleteUser(req, reply) {
  const users = this.mongo.db.collection("users");

  const result = await users.deleteOne({ _id: ObjectID(req.params.id) });
  if (result.deletedCount) return reply.send("Deleted");
  reply.send("Could not delete. ");
}

module.exports = { listUsers, getUser, addUser, updateUser, deleteUser };
