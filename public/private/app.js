let roomNumber;
let user;
let players = [];
let socket = io("/private");
window.addEventListener("load", () => {
  socket.on("connect", function () {
    console.log("Connected");
    roomNumber = sessionStorage.getItem("room");
    console.log(roomNumber);
    socket.emit("room", { room: roomNumber });
    socket.on("joined", (data) => {
      whichplayer = data;
    });
  });
  socket.on("nextLvl", (data) => {
    if (game.counter != data.counter) {
      game.key = true;
      game.doorTouched = 2;
    }
  });
  socket.on("restart", () => {
    game.restart();
  });
});
socket.on("joined", (data) => {
  whichplayer = data;
  console.log(data);
});
function displayInstructions() {
  instructions = document.getElementById("popup__image");
  if (instructions.style.display == "none") {
    instructions.style.display = "block";
    document.getElementById("instructions__btn").style.backgroundColor =
      "var(--darker-pink)";
    document.getElementById("instructions__btn").style.color = "var(--pink)";
  } else if ((instructions.style.display = "block")) {
    instructions.style.display = "none";
    document.getElementById("instructions__btn").style.backgroundColor =
      "var(--pink)";
    document.getElementById("instructions__btn").style.color =
      "var(--darker-pink)";
  }
}
let mapfinal = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
];

let map1 = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
];
let map = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
];

let map2 = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
    3, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
];

let maps = [map, map1, map2, mapfinal];

class Block {
  constructor(xpos, ypos, type, wid, hei) {
    this.x = xpos;
    this.y = ypos;
    this.type = type;
    this.color = type;
    this.w = wid;
    this.h = hei;
    this.vx = 0;
    this.vy = 0;
  }
  collisions() {
    for (let index = 0; index < game.blocks.length; index++) {
      const block = game.blocks[index];
      if (block.type != 0 && block.type != 7) continue;
      if (
        (abs(block.x - this.x - this.w) <= 2 ||
          abs(this.x - this.w - block.x - block.w) <= 2) &&
        this.y + this.h == block.y + block.h
        // this.y < block.y + block.h
      ) {
        this.x =
          abs(block.x - this.x - this.w) <= 2
            ? block.x - 45
            : block.x + block.w + 10;
        console.log(block.x);
        console.log(this.x);
        this.type = 7;
      }
    }
  }
  gravity() {
    if (this.y + this.h >= this.ground) this.vy = 0;
    else {
      this.vy += 0.3;
      if (this.y + this.h + this.vy > this.ground)
        this.vy = this.ground - (this.y + this.h);
    }

    for (let index = 0; index < game.blocks.length; index++) {
      const block = game.blocks[index];
      if (block.type != 0 && block.type != 7) continue;

      if (
        this.y <= block.y &&
        this.x + this.w > block.x &&
        this.x < block.x + block.w
      ) {
        if (this.ground > block.y) {
          this.ground = block.y;
          break;
        }
      } else this.ground = game.g;
    }
  }
  update() {
    this.gravity();
    this.collisions();
    if (
      (game.player.x + game.player.r / 2 == this.x ||
        game.player.x - game.player.r / 2 == this.x + this.w) &&
      game.player.y + game.player.r / 2 > this.y &&
      game.player.y - game.player.r / 2 < this.y + this.h
    ) {
      this.vx = game.player.vx;
    } else this.vx = 0;
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
    rectMode(CORNER);
    if (this.type == 1) {
      this.update();
      image(movable, this.x, this.y, this.w, this.h);
      // fill(255, 123, 22);
    } else if (this.type == 0) {
      fill(154, 196, 73);
      rect(this.x, this.y, this.w, this.h);
    } else if (this.type == 2) {
      fill(233, 233, 9);
      rect(this.x, this.y, this.w, this.h);
    } else if (this.type == 3) {
      image(door, this.x, this.y, this.w, this.h);
    } else if (this.type == 4) {
      image(door_open, this.x, this.y, this.w, this.h);
    } else if (this.type == 5) {
      image(keyImage, this.x, this.y, this.w, this.h);
    } else if ((this.type = 7)) {
      image(movable, this.x, this.y, this.w, this.h);
    }
  }
}

class Player {
  constructor(numberofPlayer) {
    this.number = numberofPlayer;
    this.x = 500;
    this.y = 400;
    this.ground = 420;
    this.vx = 0;
    this.vy = 10;
    this.r = 30;
    this.won = false;
    this.change = 5;
    this.keys = { up: false, left: false, right: false };
    this.activator = false;
    this.key = false;
    this.facing = 0;
  }

  distance(other) {
    return int(sqrt(pow(this.x - other.x, 2) + pow(this.y - other.y, 2)));
  }

  collisions() {
    for (let index = 0; index < game.blocks.length; index++) {
      const block = game.blocks[index];
      if (block.type == 1 && this.number == 1) continue;
      if (
        abs(block.x - this.x - this.r / 2) <= 2 &&
        this.y + this.r / 2 > block.y &&
        this.y - this.r / 2 < block.y + block.h
      ) {
        this.keys["right"] = false;
        if (block.type == 5) {
          game.blocks[index] = new Block(block.x, block.y + 70, 1, 35, 35);
          game.key = true;
        }
        if (block.type == 4 && game.key && !this.won) {
          this.won = true;
          game.doorTouched += 1;
        }
      } else if (
        abs(this.x - this.r / 2 - block.x - block.w) <= 2 &&
        this.y + this.r / 2 > block.y &&
        this.y - this.r / 2 < block.y + block.h
      ) {
        this.keys["left"] = false;
        if (block.type == 5) {
          game.blocks[index] = new Block(block.x, block.y + 70, 1, 35, 35);
          game.key = true;
        }
        if (block.type == 4 && game.key && !this.won) {
          this.won = true;
          game.doorTouched += 1;
        }
      }
      if (
        this.x + this.r / 2 > block.x &&
        this.x - this.r / 2 < block.x + block.w &&
        floor(this.y - this.r / 2) <= block.y + block.h + 4 &&
        floor(this.y - this.r / 2) >= block.y + block.h
      ) {
        this.vy = 0;
      }
    }
  }

  gravity() {
    if (this.y + this.r >= this.ground) this.vy = 0;
    else {
      this.vy += 0.3;
      if (this.y + this.r + this.vy > this.ground)
        this.vy = this.ground - (this.y + this.r);
    }
    for (let index = 0; index < game.blocks.length; index++) {
      const block = game.blocks[index];
      if (
        this.y + this.r / 2 <= block.y &&
        this.x + this.r / 2 > block.x &&
        this.x - this.r / 2 < block.x + block.w
      ) {
        if (this.ground >= block.y + this.r / 2) {
          if (block.type == 2) this.activator = true;

          this.ground = block.y + this.r / 2;
          if (
            block.type == 1 &&
            this.activator &&
            this.y + this.r >= this.ground
          ) {
            this.activator = false;
            this.vy = -15;
          } else if (
            block.type == 0 &&
            this.activator &&
            this.y + this.r >= this.ground
          )
            this.activator = false;
          break;
        }
      } else {
        this.ground = game.g + this.r / 2;
        if (this.activator && this.y + this.r >= this.ground)
          this.activator = false;
      }
    }
    if (this.number == 1) {
      if (
        this.y + this.r / 2 <= game.player2.y - game.player2.r / 2 &&
        this.x + this.r / 2 > game.player2.x - game.player2.r / 2 &&
        this.x - this.r / 2 < game.player2.x + game.player2.r / 2
      ) {
        if (this.ground > game.player2.y) this.ground = game.player2.y;
      }
    } else {
      if (
        this.y + this.r / 2 <= game.player.y - game.player.r / 2 &&
        this.x + this.r / 2 > game.player.x - game.player.r / 2 &&
        this.x - this.r / 2 < game.player.x + game.player.r / 2
      ) {
        if (this.ground > game.player.y) this.ground = game.player.y;
      }
    }
  }

  update() {
    this.collisions();
    this.gravity();
    if (this.keys["right"] && this.x + this.r <= width && !this.won) {
      this.vx = this.change;
      this.facing = 0;
    } else if (this.keys["left"] && this.x - this.r / 2 >= 0 && !this.won) {
      this.vx = -this.change;
      this.facing = 1;
    } else if (!this.keys["right"] && !this.keys["left"]) this.vx = 0;
    else this.vx = 0;
    if (this.keys["up"] && this.y + this.r == this.ground && !this.won) {
      if (this.number == 2) this.vy = -6.5;
      else this.vy = -5.5;
    }
  }

  display() {
    this.update();
    this.x += this.vx;
    this.y += this.vy;
    if (this.number == 1) fill(0);
    else fill(232);
    rectMode(CENTER);
    if (this.number == 1) {
      if (this.facing == 0)
        image(
          character1right,
          this.x - this.r / 2,
          this.y - this.r / 2,
          this.r,
          this.r
        );
      else
        image(
          character1left,
          this.x - this.r / 2,
          this.y - this.r / 2,
          this.r,
          this.r
        );
    } else {
      if (this.facing == 0)
        image(
          character2right,
          this.x - this.r / 2,
          this.y - this.r / 2,
          this.r,
          this.r
        );
      else
        image(
          character2left,
          this.x - this.r / 2,
          this.y - this.r / 2,
          this.r,
          this.r
        );
    }
  }
}

class Game {
  constructor() {
    this.g = 520;
    this.player = new Player(1);
    this.player2 = new Player(2);
    this.counter = 0;
    this.blocks = this.addBlocks(maps[this.counter]);
    this.blocks.sort(function (a, b) {
      return a.y - b.y;
    });
    this.key = false;
    this.doorTouched = 0;
  }
  addBlocks(mapScheme) {
    let blocks = [];
    for (let i = 0; i < mapScheme.length; i++) {
      for (let j = 0; j < mapScheme[i].length; j++) {
        if (mapScheme[i][j] == 1)
          blocks.push(new Block(j * 40, i * 40, 0, 40, 40));
        else if (mapScheme[i][j] == 2)
          blocks.push(new Block(j * 40, i * 40, 1, 35, 35));
        else if (mapScheme[i][j] == 3)
          blocks.push(new Block(j * 40, i * 40, 2, 40, 40));
        else if (mapScheme[i][j] == 4)
          blocks.push(new Block(j * 40, i * 40, 3, 40, 80));
        else if (mapScheme[i][j] == 6)
          blocks.push(new Block(j * 40, i * 40, 5, 40, 40));
      }
    }
    return blocks;
  }
  restart() {
    this.g = 520;
    this.player = new Player(1);
    this.player2 = new Player(2);
    this.blocks = this.addBlocks(maps[this.counter]);
    this.key = false;
    this.doorTouched = 0;
  }
  update() {
    this.blocks.sort(function (a, b) {
      return a.y - b.y;
    });
    if (this.key && this.doorTouched == 2) {
      this.counter++;
      if (this.counter == 4) {
        alert("YOU WON!");
        this.key = false;
        return;
      }
      socket.emit("nextLvl", { counter: this.counter });
      this.key = false;
      this.doorTouched = 0;
      this.blocks = this.addBlocks(maps[this.counter]);
      game.player.x = 500;
      game.player.y = 400;
      game.player2.x = 500;
      game.player2.y = 400;
      game.player.won = false;
      game.player2.won = false;
    }
  }
  display() {
    this.update();
    this.player.display();
    this.player2.display();
    this.blocks.forEach((element) => {
      if (element.type == 3 && this.key) element.type = 4;
      element.display();
    });
    rectMode(CORNER);
    fill(154, 196, 73);
    rect(0, this.g, width, height - this.g);
    image(restart, width - 50, 20, 30, 30);
    image(instruct, width - 100, 20, 40, 40);
  }
}

let game;

let keyImage;
let character1left;
let character1right;
let character2left;
let character2right;

let door;
let movable;
let door_open;

let restart;
let instruct;

function preload() {
  keyImage = loadImage("key.png");
  character1left = loadImage("character1.png");
  character1right = loadImage("character1right.png");
  character2left = loadImage("character2.png");
  character2right = loadImage("character2right.png");

  door = loadImage("door.png");
  door_open = loadImage("door_open.png");

  movable = loadImage("movable.png");

  restart = loadImage("restart.png");
  instruct = loadImage("instruct.png");
}

let whichplayer;
let secondplayer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();

  socket.on("connect", function () {
    console.log("Connected");
    roomNumber = sessionStorage.getItem("room");
    console.log(roomNumber);
    socket.emit("room", { room: roomNumber });
    socket.on("joined", (data) => {
      whichplayer = socket.id == data.msg[0] ? 0 : 1;
      secondplayer = socket.id == data.msg[0] ? 1 : 0;
    });
  });
  socket.on("nextLvl", (data) => {
    if (game.counter != data.counter) {
      this.key = true;
      this.doorTouched = 2;
    }
  });
  socket.on("restart", () => {
    game.restart();
  });
}

function draw() {
  background(255, 255, 251);
  for (let i = 0; i < width / 40; i++) {
    for (let j = 0; j < height / 40; j++) {
      fill(255);
      strokeWeight(0);
      rect(i * 40, j * 40, 40, 40);
    }
  }

  game.display();
}

function callEverything() {
  if (whichplayer == 0) {
    socket.emit("positions1", {
      player1: {
        keys: game.player.keys,
        facing: game.player.facing,
        x: game.player.x,
        y: game.player.y,
      },
    });
    socket.on("positions2", (data) => {
      game.player2.keys = data.player2.keys;
      game.player2.facing = data.player2.facing;
      if (game.player2.x != data.player2.x) game.player2.x = data.player2.x;
      if (game.player2.y != data.player2.y) game.player2.y = data.player2.y;
    });
  } else {
    socket.emit("positions2", {
      player2: {
        keys: game.player2.keys,
        facing: game.player2.facing,
        x: game.player2.x,
        y: game.player2.y,
      },
    });
    socket.on("positions1", (data) => {
      game.player.keys = data.player1.keys;
      game.player.facing = data.player1.facing;
      if (game.player.x != data.player1.x) game.player.x = data.player1.x;
      if (game.player.y != data.player1.y) game.player.y = data.player1.y;
    });
  }
}

function keyPressed() {
  if (whichplayer == 0 && (key == "W" || key == "w" || keyCode === UP_ARROW)) {
    game.player.keys["up"] = true;
    callEverything();
  }
  if (whichplayer == 0 && keyCode == 32) {
    game.player.keys["up"] = true;
    callEverything();
  }
  if (whichplayer == 0 && (key == "A" || key == "a" || keyCode === LEFT_ARROW)) {
    game.player.keys["left"] = true;
    callEverything();
  }
  if (whichplayer == 0 && (key == "D" || key == "d" || keyCode === RIGHT_ARROW)) {
    game.player.keys["right"] = true;
    callEverything();
  }
  if (whichplayer == 1 && (key == "W" || key == "w" || keyCode === UP_ARROW)) {
    game.player2.keys["up"] = true;
    callEverything();
  }
  if (whichplayer == 1 && keyCode == 32) {
    game.player2.keys["up"] = true;
    callEverything();
  }
  if (whichplayer == 1 && (key == "A" || key == "a" || keyCode === LEFT_ARROW)) {
    game.player2.keys["left"] = true;
    callEverything();
  }
  if (whichplayer == 1 && (key == "D" || key == "d" || keyCode === RIGHT_ARROW)) {
    game.player2.keys["right"] = true;
    callEverything();
  }
  // // if (key == "X" || key == "x") {
  // //   game.player.vy = -20;
  // // }
  // if (key == "I" || key == "i") {
  //   game.player2.keys["up"] = true;
  // }
  // if (key == "J" || key == "j") {
  //   game.player2.keys["left"] = true;
  // }
  // if (key == "L" || key == "l") {
  //   game.player2.keys["right"] = true;
  // }
}

function keyReleased() {
  if (whichplayer == 0 && (key == "W" || key == "w" || keyCode === UP_ARROW)) {
    game.player.keys["up"] = false;
    callEverything();
  }
  if (whichplayer == 0 && keyCode == 32) {
    game.player.keys["up"] = false;
    callEverything();
  }
  if (whichplayer == 0 && (key == "A" || key == "a" || keyCode === LEFT_ARROW)) {
    game.player.keys["left"] = false;
    callEverything();
  }
  if (whichplayer == 0 && (key == "D" || key == "d" || keyCode === RIGHT_ARROW)) {
    game.player.keys["right"] = false;
    callEverything();
  }
  if (whichplayer == 1 && (key == "W" || key == "w" || keyCode === UP_ARROW)) {
    game.player2.keys["up"] = false;
    callEverything();
  }
  if (whichplayer == 1 && keyCode == 32) {
    game.player2.keys["up"] = false;
    callEverything();
  }
  if (whichplayer == 1 && (key == "A" || key == "a" || keyCode === LEFT_ARROW)) {
    game.player2.keys["left"] = false;
    callEverything();
  }
  if (whichplayer == 1 && (key == "D" || key == "d" || keyCode === RIGHT_ARROW)) {
    game.player2.keys["right"] = false;
    callEverything();
  }
}

function mouseClicked() {
  if (
    mouseX >= width - 50 &&
    mouseX <= width - 20 &&
    mouseY >= 20 &&
    mouseY <= 50
  ) {
    // game.restart();c
    socket.emit("restart");
  }
  if (
    mouseX >= width - 100 &&
    mouseX <= width - 60 &&
    mouseY >= 20 &&
    mouseY <= 60
  ) {
    displayInstructions();
  }
}

// image(restart, width-50,20, 30, 30);
// image(instruct, width - 100, 20, 40, 40);
