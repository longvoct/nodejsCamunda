const { Client, logger } = require("camunda-external-task-client-js");
const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(console.log("Connected to MongoDB"))
//   .catch((err) => console.error(err));

const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
  asyncResponseTimeout: 10000,
};

const client = new Client(config);

client.subscribe("save-database", async function ({ task, taskService }) {
  const username = task.variables.get("username");
  const email = task.variables.get("email");
  // const age = task.variables.get('age');

  await taskService.complete(task);
});
