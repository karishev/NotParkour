//Initialize the express 'app' object
let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

//Initialize private room namespace
//Allows us to better manage the rooms
let private = io.of("/private");

let rooms = {};
let insiderooms = {};

let users = {};

//Listen for users connecting to main page
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);

  socket.on("checkRoom", (data) => {
    if (socket.id == data.id) {
      console.log(data);
      if (rooms[data.room] != null && rooms[data.room].length < 2) {
        io.to(data.id).emit("checkedRoom", { create: "yes" });
        rooms[data.room].push({ id: data.id });
      } else if (rooms[data.room] != null && rooms[data.room].length >= 2) {
        io.to(data.id).emit("checkedRoom", { create: "full" });
      } else {
        io.to(data.id).emit("checkedRoom", { create: "no" });
      }
    }
  });

  socket.on("creatingRoom", (data) => {
    if (socket.id == data.id) {
      console.log(data);
      if (rooms[data.room] != null) {
        io.to(data.id).emit("createdRoom", { create: "no" });
      } else {
        io.to(data.id).emit("createdRoom", { create: "yes" });
        rooms[data.room] = [{ id: data.id }];
      }
    }
  });

  //Listen for this client to disconnect
  socket.on("disconnect", function () {
    console.log("A client has disconnected: " + socket.id);
  });
});

//Listen for users connecting to private page
private.on("connection", function (socket) {
  console.log("We have a new private client: " + socket.id);

  socket.on("room", function (data) {
    console.log(data);
    let roomName = data.room;
    //Add this socket to the room
    socket.join(roomName);
    //Add a room property to the individual socket
    socket.room = roomName;
    if (insiderooms[socket.room] == null)
      insiderooms[socket.room] = [socket.id];
    else insiderooms[socket.room].push(socket.id);
    //Let everyone in the room know that a new user has joined
    // let joinMsg = "A new user has joined the chat room: " + roomName;
    private.to(socket.id).emit("joined", insiderooms[socket.room].length - 1);
  });

  socket.on("positions1", (data) => {
    //   console.log(data);
    private.to(socket.room).emit("positions1", data);
  });
  socket.on("positions2", (data) => {
    //   console.log(data);
    private.to(socket.room).emit("positions2", data);
  });

  socket.on("blocks", (data) => {
    //   console.log(data);
    private.to(socket.room).emit("blocks", data);
  });
  //Listen for a message named 'msg' from this client
  socket.on("msg", function (data) {
    //Data can be numbers, strings, objects
    console.log("Received a 'msg' event");
    console.log(data);

    let roomName = socket.room;
    //Send a response to all clients, including this one
    private.to(roomName).emit("msg", data);
  });
  socket.on("nextLvl", (data) => {
    private.to(socket.room).emit("nextLvl", data);
  });

  socket.on('restart', () => {
      private.to(socket.room).emit('restart');
  })
  //Listen for this client to disconnect
  socket.on("disconnect", function () {
    delete rooms[socket.room];
    delete insiderooms[socket.room];
    // // if (rooms[socket.room].length - 1 == 0) {
    //   delete rooms[socket.room];
    // }
    // rooms[socket.room] = [rooms[socket.room][0]];
    console.log("A client has disconnected: " + socket.id);
  });
});
