var stage = document.getElementById("stage");
var ctx = stage.getContext("2d");

var stage2 = document.getElementById("stage2");
var ctx2 = stage2.getContext("2d");

var stage3 = document.getElementById("stage3");
var ctx3 = stage3.getContext("2d");

document.addEventListener("keydown", keyPush);

var px = py = 0;

var tq = 64;
var nqx = 13;
var nqy = 11;

var blocos = [];
var fixos = [];

var vazio = [];

var minhasbombas = [];
var raioExplosao = []
var powerUps = [];

var tamanhoBomba = 1;
var quantidadeBombas = 1;

var playerColideup = false;
var playerColideleft = false;
var playerColidedown = false;
var playerColideright = false;

setInterval(colisaoPowerUp, 30);
setInterval(colisaoParedes, 30);
setInterval(update, 30);

const playerImage = new Image();
playerImage.src = "sheetfinal.png";
const spriteWidth = 16;
const spriteHeight = 24;
let playerState = 'walkFront'

let gameFrame = 0;
const staggerFrammes = 10;
const spriteAnimations = [];
const animationStates = [
  {
    name: "walkFront",
    frames: 6,
  },
  {
    name: "walkRight",
    frames: 6,
  },
  {
    name: "walkBack",
    frames: 6,
  },
  {
    name: "walkLeft",
    frames: 6
  }
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames
});

function animate() {
  ctx3.clearRect(0, 0, stage3.clientWidth, stage3.clientHeight);
  let position = Math.floor(gameFrame / staggerFrammes) % spriteAnimations[playerState].loc.length;
  let frameY = spriteAnimations[playerState].loc[position].y
  let frameX = spriteWidth * position;
  ctx3.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    px * tq,
    (py * tq) - 32,
    64,
    96,
  );
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();


//Funçoes de colisao
function colisaoParedes() {
  var xCresce = (element) => element.x == px + 1 && element.y == py;
  var xDiminui = (element) => element.x == px - 1 && element.y == py;
  var yCresce = (element) => element.x == px && element.y == py + 1;
  var yDiminui = (element) => element.x == px && element.y == py - 1;
  if (
    fixos.some(xDiminui) ||
    blocos.some(xDiminui) ||
    minhasbombas.some(xDiminui) ||
    px - 1 < 0
  ) {
    playerColideleft = true;
  } else {
    playerColideleft = false;
  }

  if (
    fixos.some(xCresce) ||
    blocos.some(xCresce) ||
    minhasbombas.some(xCresce) ||
    px + 2 > nqx
  ) {
    playerColideright = true;
  } else {
    playerColideright = false;
  }

  if (
    fixos.some(yDiminui) ||
    blocos.some(yDiminui) ||
    minhasbombas.some(yDiminui) ||
    py - 1 < 0
  ) {
    playerColideup = true;
  } else {
    playerColideup = false;
  }

  if (
    fixos.some(yCresce) ||
    blocos.some(yCresce) ||
    minhasbombas.some(yCresce) ||
    py + 2 > nqy
  ) {
    playerColidedown = true;
  } else {
    playerColidedown = false;
  }
}

function colisaoPowerUp() {
  var power = (element) => element.x == px && element.y == py;
  if (powerUps.some(power)) {
    var x1 = powerUps[powerUps.findIndex(power)].x;
    var y1 = powerUps[powerUps.findIndex(power)].y;
    var t = powerUps[powerUps.findIndex(power)].type;

    if (x1 == px && y1 == py) {
      if (t == 1) {
        tamanhoBomba++;
      } else if (t == 2) {
        quantidadeBombas++;
      } else if (t == 3) {
      }
    }
  }
  ctx2.clearRect(x1 * tq, y1 * tq, tq, tq);
  powerUps[powerUps.findIndex(power)] = {};
}
// FIM Funçoes de colisao

//Funçoes geraçao do mapa
function gerarBlocosQuebraveis() {
  for (i2 = 0; i2 < nqy; i2 += 10) {
    for (i = 2; i < nqx - 2; i++) {
      blocos.push({
        x: i,
        y: i2,
      });
    }
  }

  for (i2 = 0; i2 < nqx; i2 += 12) {
    for (i = 3; i < nqy - 3; i++) {
      blocos.push({
        x: i2,
        y: i,
      });
    }
  }

  for (i2 = 2; i2 < nqy - 1; i2 += 2) {
    for (i = 1; i < nqx - 1; i++) {
      if (!blocos.some((element) => element.x == i && element.y == i2)) {
        blocos.push({
          x: i,
          y: i2,
        });
      }
    }
  }

  for (i2 = 2; i2 < nqy; i2 += 2) {
    for (i = 1; i < nqx - 3; i++) {
      if (!blocos.some((element) => element.x == i2 && element.y == i)) {
        blocos.push({
          x: i2,
          y: i,
        });
      }
    }
  }

  blocos.forEach((element) => {
    ctx.fillStyle = "#49C48F";
    ctx.fillRect(element.x * tq, element.y * tq, tq, tq);
  });
}

function gerarFixos() {
  for (i2 = 1; i2 < nqy; i2 += 2) {
    for (i = 1; i < nqx; i += 2) {
      fixos.push({
        x: i,
        y: i2,
      });
    }
  }

  fixos.forEach((element) => {
    ctx.fillStyle = "brown";
    ctx.fillRect(element.x * tq, element.y * tq, tq, tq);
  });
}

function gerarPowerUps(num) {
  for (i = 0; i < num; i++) {
    var cayo = getRandomInt(0, 10);
    while (
      powerUps.some((element) => element.x == x1 && element.y == y1) ||
      fixos.some((element) => element.x == x1 && element.y == y1)
    ) {
      var x1 = getRandomInt(0, 13);
    var y1 = getRandomInt(0, 11);
    }
    if (cayo < 4) {
      var t = 1;
    } else if (cayo > 5) {
      var t = 2;
    } else {
      var t = 3;
    } 

    powerUps.push({
      x: x1,
      y: y1,
      type: t,
    });

    if (powerUps[i].type == 1) {
      draw(x1, y1, "imgsPowerUps/fireSprite.webp");
    } else if (powerUps[i].type == 2) {
      draw(x1, y1, "imgsPowerUps/BombaSprite.webp");
    } else if (powerUps[i].type == 3) {
      draw(x1, y1, "imgsPowerUps/Patinssprite.webp");
    }
  }
}

function quebrarAleatorios(num) {
  for (i = 0; i < num; i++) {
    var r = getRandomInt(0, 97);
    var x = blocos[r].x;
    var y = blocos[r].y;
    blocos[r] = {};
    ctx.clearRect(x * tq, y * tq, tq, tq);
  }
}

function generateLevel() {
  stage.style.border = "10px solid brown";
  stage2.style.border = "10px solid brown";
  stage3.style.border = "10px solid brown";

  gerarBlocosQuebraveis();
  gerarFixos();
  quebrarAleatorios(10);
  gerarPowerUps(50);
}
// FIM Funçoes geraçao do mapa

//Funçoes bombasticas
async function colocarBomba() {
  if (quantidadeBombas > 0) {
    quantidadeBombas--;
    minhasbombas.push({
      x: px,
      y: py,
      tamanho: tamanhoBomba,
    });
    var bombaN = minhasbombas[minhasbombas.length - 1];
    ctx2.fillRect(bombaN.x * tq, bombaN.y * tq, tq, tq)
    await sleep(3000)
    explosaoBomba(bombaN);
    minhasbombas = []
    quantidadeBombas++;
  }
}

async function explosaoBomba(bombaN) {
  var yCresce = (element) =>
    element.x == bombaN.x && element.y == bombaN.y + i2;
  var yDiminui = (element) =>
    element.x == bombaN.x && element.y == bombaN.y - i2;
  var xCresce = (element) => element.x == bombaN.x + i && element.y == bombaN.y;
  var xDiminui = (element) =>
    element.x == bombaN.x - i && element.y == bombaN.y;
  raioExplosao.push({
    x: bombaN.x,
    y: bombaN.y,
  });

  for (i2 = 1; i2 <= bombaN.tamanho; i2++) {
    if (fixos.some(yCresce)) {
      break;
    } else if (blocos.some(yCresce)) {
      raioExplosao.push({
        x: bombaN.x,
        y: bombaN.y + i2,
      });

      blocos[blocos.findIndex(yCresce)] = {};
      break;
    } else if (powerUps.some(yCresce)) {
      ctx2.clearRect(powerUps[powerUps.findIndex(yCresce)].x * tq, powerUps[powerUps.findIndex(yCresce)].y * tq, tq, tq)
      powerUps[powerUps.findIndex(yCresce)] = {};
    }

    raioExplosao.push({
      x: bombaN.x,
      y: bombaN.y + i2,
    });
  }

  for (i2 = 1; i2 <= bombaN.tamanho; i2++) {
    if (fixos.some(yDiminui)) {
      break;
    } else if (blocos.some(yDiminui)) {
      raioExplosao.push({
        x: bombaN.x,
        y: bombaN.y - i2,
      });
      blocos[blocos.findIndex(yDiminui)] = {};
      break;
    } else if (powerUps.some(yDiminui)) {
      ctx2.clearRect(powerUps[powerUps.findIndex(yDiminui)].x * tq, powerUps[powerUps.findIndex(yDiminui)].y * tq, tq, tq)
      powerUps[powerUps.findIndex(yDiminui)] = {};
    }

    raioExplosao.push({
      x: bombaN.x,
      y: bombaN.y - i2,
    });
  }
  for (i = 1; i <= bombaN.tamanho; i++) {
    if (fixos.some(xCresce)) {
      break;
    } else if (blocos.some(xCresce)) {
      raioExplosao.push({
        x: bombaN.x + i,
        y: bombaN.y,
      });
      blocos[blocos.findIndex(xCresce)] = {};
      break;
    } else if (powerUps.some(xCresce)) {
      ctx2.clearRect(powerUps[powerUps.findIndex(xCresce)].x * tq, powerUps[powerUps.findIndex(xCresce)].y * tq, tq, tq)
      powerUps[powerUps.findIndex(xCresce)] = {};
    }
    raioExplosao.push({
      x: bombaN.x + i,
      y: bombaN.y,
    });
  }
  for (i = 1; i <= bombaN.tamanho; i++) {
    if (fixos.some(xDiminui)) {
      break;
    } else if (blocos.some(xDiminui)) {
      raioExplosao.push({
        x: bombaN.x - i,
        y: bombaN.y,
      });
      blocos[blocos.findIndex(xDiminui)] = {};
      break;
    } else if (powerUps.some(xDiminui)) {
      ctx2.clearRect(powerUps[powerUps.findIndex(xDiminui)].x * tq, powerUps[powerUps.findIndex(xDiminui)].y * tq, tq, tq)
      powerUps[powerUps.findIndex(xDiminui)] = {};
    }
    raioExplosao.push({
      x: bombaN.x - i,
      y: bombaN.y,
    });
  }
  raioExplosao.forEach((element) => {
    ctx.fillStyle = "red";
    ctx.fillRect(element.x * tq, element.y * tq, tq, tq);
  });

  await sleep(1000);

  raioExplosao.forEach((element) => {
    ctx.clearRect(element.x * tq, element.y * tq, tq, tq);
  });

  ctx2.clearRect(bombaN.x * tq, bombaN.y * tq, tq, tq)
  raioExplosao = [];
}
// FIM Funçoes bombasticas

//Funçoes auxiliares
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function draw(x1, y1, local) {
  var img = new Image();
  img.onload = function () {
    ctx2.drawImage(img, x1 * tq, y1 * tq, tq, tq);
  };
  img.src = local;
}
// FIM Funçoes auxiliares

function keyPush(event) {
  switch (event.keyCode) {
    case 37: //left
      if (!playerColideleft) {
        ctx.clearRect(px * tq, py * tq, tq, tq);
        playerState = "walkLeft"
        px--;
      }
      break;
    case 38: //up
      if (!playerColideup) {
        ctx.clearRect(px * tq, py * tq, tq, tq);
        playerState = "walkBack"
        py--;
      }
      break;
    case 39: //right
      if (!playerColideright) {
        ctx.clearRect(px * tq, py * tq, tq, tq);
        playerState = "walkRight"
        px++;
      }
      break;
    case 40: //down
      if (!playerColidedown) {
        ctx.clearRect(px * tq, py * tq, tq, tq);
        playerState = "walkFront"
        py++;
      }
      break;

    case 88: // colocar bomba
      colocarBomba();
    default:
      break;
  }
}

async function update() {
  ctx.fillStyle = "transparent";
  ctx.fillRect(px * tq, py * tq, tq, tq);

  if (raioExplosao.some((element) => px == element.x && py == element.y)) {
    alert("GAME OVER");
    px = py = 0;
    fixos = [];
    blocos = [];
    powerUps = [];
    tamanhoBomba = 1;
    ctx2.clearRect(0, 0, 650, 550);
    await sleep(100);
    ctx.clearRect(0, 0, 650, 550)
    generateLevel();
  }
}

generateLevel();
