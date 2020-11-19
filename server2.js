const express = require("express");
const redis = require("redis");

const publisher = redis.createClient();

const app = express();

app.get("/", (req, res) => {
  const user = {
    id: "123456",
    name: "Davis",
  };

  publisher.publish("user-notify", JSON.stringify(user));
  res.send("Publishing an Event using Redis");
});

app.listen(3005, () => {
  console.log(`server is listening on PORT 3005`);
});
