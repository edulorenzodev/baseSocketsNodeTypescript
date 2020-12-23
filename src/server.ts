import * as express from "express";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);

// set up socket.io and bind it to our http server
let io = require("socket.io")(http);

// simple '/' endpoint sending a Hello World
// response
app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

// cuando un usuario se ha conectado vía websocket, loguear
// al usuario
 io.on("connection", function(socket: any) {
     console.log("un usuario conectado!");

     socket.on("message", function(message: any) {
       console.log(message);
     });
 });

// start our simple server up on localhost:3000
const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});