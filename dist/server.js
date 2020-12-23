"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3000);
let http = require("http").Server(app);
// set up socket.io and bind it to our http server
let io = require("socket.io")(http);
// simple '/' endpoint sending a Hello World
// response
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./client/index.html"));
});
// cuando un usuario se ha conectado vía websocket, loguear
// al usuario
io.on("connection", function (socket) {
    console.log("un usuario conectado!");
    socket.on("message", function (message) {
        console.log(message);
    });
});
// start our simple server up on localhost:3000
const server = http.listen(3000, function () {
    console.log("listening on *:3000");
});
//# sourceMappingURL=server.js.map