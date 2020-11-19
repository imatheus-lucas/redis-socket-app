const express = require("express");
const redis = require("redis");
const socketio = require("socket.io");
const http = require("http");
const app = express();

const server = http.Server(app);

const client = redis.createClient();
const io = socketio(server);

io.on("connection", (socket) => {
  client.on("message", (channel, message) => {
    io.emit(message);
    console.log(message);
  });
  client.subscribe("user-notify");
});

app.use(express.json());

client.on("error", function (error) {
  console.error(error);
});

app.post("/", async (req, res) => {
  client.set("teste", "banco de dados com redis", (err, reply) => {
    console.log(reply);
  });
});

app.get("/", async (req, res) => {
  client.get("teste", (err, reply) => {
    return res.json(reply);
  });
});

server.listen(3434, () => console.log("server startted"));
