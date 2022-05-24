var stage = document.getElementById("stage");
var ctx = stage.getContext("2d");

var stage2 = document.getElementById("stage2");
var ctx2 = stage2.getContext("2d");

var stage3 = document.getElementById("stage3");
var ctx3 = stage3.getContext("2d");

document.addEventListener("keydown", keyPush);

var tq = 64;
var nqx = 13;
var nqy = 11;

var blocos = [];
var fixos = [];
var powerUps = [];
var conectados = [];

var gameStart = false;

var playerColideup = false;
var playerColideleft = false;
var playerColidedown = false;
var playerColideright = false;

setInterval(colisaoPowerUp, 30);
setInterval(colisaoParedes, 30);
setInterval(update, 30);

function novoJogador() {
  var x1 = (y1 = 0);
  var cor1 = getRandomColor();
  if (conectados.length + 1 == 1) {
    x1 = y1 = 0;
  } else if (conectados.length + 1 == 2) {
    x1 = 12;
    y1 = 0;
  } else if (conectados.length + 1 == 3) {
    x1 = 0;
    y1 = 10;
  } else if (conectados.length + 1 == 4) {
    x1 = 12;
    y1 = 10;
  } else {
    alert("Desculpe, mas o jogo já está cheio");
    return;
  }

  var nickname = prompt("Digite seu nome");

  conectados.push({
    name: nickname,
    vivo: true,
    cor: cor1,
    px: x1,
    py: y1,
    tamanhoBomba: 1,
    quantidadeBombas: 1,
    minhasbombas: [],
    playerColideup: false,
    playerColidedown: false,
    playerColideleft: false,
    playerColideright: false,
  });
}
/*const playerImage = new Image();
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
animate();*/

//Funçoes de colisao
function colisaoParedes() {
  conectados.forEach((player) => {
    var xCresce = (element) =>
      element.x == player.px + 1 && element.y == player.py;
    var xDiminui = (element) =>
      element.x == player.px - 1 && element.y == player.py;
    var yCresce = (element) =>
      element.x == player.px && element.y == player.py + 1;
    var yDiminui = (element) =>
      element.x == player.px && element.y == player.py - 1;
    if (
      fixos.some(xDiminui) ||
      blocos.some(xDiminui) ||
      conectados.some((element) => element.minhasbombas.some(xDiminui)) ||
      conectados.some(
        (player2) =>
          player2.px == player.px - 1 &&
          player2.py == player.py &&
          player.name != player2.name
      ) ||
      player.px - 1 < 0
    ) {
      player.playerColideleft = true;
    } else {
      player.playerColideleft = false;
    }

    if (
      fixos.some(xCresce) ||
      blocos.some(xCresce) ||
      conectados.some((element) => element.minhasbombas.some(xCresce)) ||
      conectados.some(
        (player2) =>
          player2.px == player.px + 1 &&
          player2.py == player.py &&
          player.name != player2.name
      ) ||
      player.px + 2 > nqx
    ) {
      player.playerColideright = true;
    } else {
      player.playerColideright = false;
    }

    if (
      fixos.some(yDiminui) ||
      blocos.some(yDiminui) ||
      conectados.some((element) => element.minhasbombas.some(yDiminui)) ||
      conectados.some(
        (player2) =>
          player2.px == player.px &&
          player2.py == player.py - 1 &&
          player.name != player2.name
      ) ||
      conectados.some(yDiminui) ||
      player.py - 1 < 0
    ) {
      player.playerColideup = true;
    } else {
      player.playerColideup = false;
    }

    if (
      fixos.some(yCresce) ||
      blocos.some(yCresce) ||
      conectados.some((element) => element.minhasbombas.some(yCresce)) ||
      conectados.some(
        (player2) =>
          player2.px == player.px &&
          player2.py == player.py + 1 &&
          player.name != player2.name
      ) ||
      conectados.some(yCresce) ||
      player.py + 2 > nqy
    ) {
      player.playerColidedown = true;
    } else {
      player.playerColidedown = false;
    }
  });
}

function colisaoPowerUp() {
  conectados.forEach((player) => {
    var power = (element) => element.x == player.px && element.y == player.py;
    if (powerUps.some(power)) {
      var x1 = powerUps[powerUps.findIndex(power)].x;
      var y1 = powerUps[powerUps.findIndex(power)].y;
      var t = powerUps[powerUps.findIndex(power)].type;

      if (x1 == player.px && y1 == player.py) {
        if (t == 1) {
          player.tamanhoBomba++;
        } else if (t == 2) {
          player.quantidadeBombas++;
        } else if (t == 3) {
        }
      }
    }
    ctx2.clearRect(x1 * tq, y1 * tq, tq, tq);
    powerUps[powerUps.findIndex(power)] = {};
  });
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
  quebrarAleatorios(10);
  gerarFixos();
  gerarPowerUps(50);
}
// FIM Funçoes geraçao do mapa

//Funçoes bombasticas

async function colocarBomba(player) {
  if (player.quantidadeBombas > 0) {
    player.quantidadeBombas--;
    player.minhasbombas.push({
      raioExplosao: new Array(),
      x: player.px,
      y: player.py,
      tamanho: player.tamanhoBomba,
    });
    var bombaN = player.minhasbombas[player.minhasbombas.length - 1];
    ctx2.fillRect(bombaN.x * tq, bombaN.y * tq, tq, tq);
    await sleep(3000);
    await explosaoBomba(bombaN, player);
    player.quantidadeBombas++;
  }
}

async function explosaoBomba(bombaN, player) {
  var yCresce = (element) =>
    element.x == bombaN.x && element.y == bombaN.y + i2;
  var yDiminui = (element) =>
    element.x == bombaN.x && element.y == bombaN.y - i2;
  var xCresce = (element) => element.x == bombaN.x + i && element.y == bombaN.y;
  var xDiminui = (element) =>
    element.x == bombaN.x - i && element.y == bombaN.y;
  bombaN.raioExplosao.push({
    x: bombaN.x,
    y: bombaN.y,
  });

  for (i2 = 1; i2 <= bombaN.tamanho; i2++) {
    if (fixos.some(yCresce)) {
      break;
    } else if (blocos.some(yCresce)) {
      bombaN.raioExplosao.push({
        x: bombaN.x,
        y: bombaN.y + i2,
      });

      blocos[blocos.findIndex(yCresce)] = {};
      break;
    } else if (powerUps.some(yCresce)) {
      ctx2.clearRect(
        powerUps[powerUps.findIndex(yCresce)].x * tq,
        powerUps[powerUps.findIndex(yCresce)].y * tq,
        tq,
        tq
      );
      powerUps[powerUps.findIndex(yCresce)] = {};
    }

    bombaN.raioExplosao.push({
      x: bombaN.x,
      y: bombaN.y + i2,
    });
  }

  for (i2 = 1; i2 <= bombaN.tamanho; i2++) {
    if (fixos.some(yDiminui)) {
      break;
    } else if (blocos.some(yDiminui)) {
      bombaN.raioExplosao.push({
        x: bombaN.x,
        y: bombaN.y - i2,
      });
      blocos[blocos.findIndex(yDiminui)] = {};
      break;
    } else if (powerUps.some(yDiminui)) {
      ctx2.clearRect(
        powerUps[powerUps.findIndex(yDiminui)].x * tq,
        powerUps[powerUps.findIndex(yDiminui)].y * tq,
        tq,
        tq
      );
      powerUps[powerUps.findIndex(yDiminui)] = {};
    }

    bombaN.raioExplosao.push({
      x: bombaN.x,
      y: bombaN.y - i2,
    });
  }
  for (i = 1; i <= bombaN.tamanho; i++) {
    if (fixos.some(xCresce)) {
      break;
    } else if (blocos.some(xCresce)) {
      bombaN.raioExplosao.push({
        x: bombaN.x + i,
        y: bombaN.y,
      });
      blocos[blocos.findIndex(xCresce)] = {};
      break;
    } else if (powerUps.some(xCresce)) {
      ctx2.clearRect(
        powerUps[powerUps.findIndex(xCresce)].x * tq,
        powerUps[powerUps.findIndex(xCresce)].y * tq,
        tq,
        tq
      );
      powerUps[powerUps.findIndex(xCresce)] = {};
    }
    bombaN.raioExplosao.push({
      x: bombaN.x + i,
      y: bombaN.y,
    });
  }
  for (i = 1; i <= bombaN.tamanho; i++) {
    if (fixos.some(xDiminui)) {
      break;
    } else if (blocos.some(xDiminui)) {
      bombaN.raioExplosao.push({
        x: bombaN.x - i,
        y: bombaN.y,
      });
      blocos[blocos.findIndex(xDiminui)] = {};
      break;
    } else if (powerUps.some(xDiminui)) {
      ctx2.clearRect(
        powerUps[powerUps.findIndex(xDiminui)].x * tq,
        powerUps[powerUps.findIndex(xDiminui)].y * tq,
        tq,
        tq
      );
      powerUps[powerUps.findIndex(xDiminui)] = {};
    }
    bombaN.raioExplosao.push({
      x: bombaN.x - i,
      y: bombaN.y,
    });
  }
  bombaN.raioExplosao.forEach((element) => {
    ctx.fillStyle = "red";
    ctx.fillRect(element.x * tq, element.y * tq, tq, tq);
  });

  await sleep(1000);

  bombaN.raioExplosao.forEach((element) => {
    ctx.clearRect(element.x * tq, element.y * tq, tq, tq);
  });

  ctx2.clearRect(bombaN.x * tq, bombaN.y * tq, tq, tq);

  bombaN.x = bombaN.y = bombaN.tamanho = {};
  bombaN.raioExplosao = new Array()
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

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// FIM Funçoes auxiliares

function keyPush(event) {
  if (gameStart) {
    var p1 = conectados[0];
    var p2 = conectados[1];
    var p3 = conectados[2];
    var p4 = conectados[3];

    if (p1 != undefined && p1.vivo) {
      switch (event.keyCode) {
        case 37: //left
          if (!p1.playerColideleft) {
            ctx.clearRect(p1.px * tq, p1.py * tq, tq, tq);
            playerState = "walkLeft";
            p1.px--;
          }
          break;
        case 38: //up
          if (!p1.playerColideup) {
            ctx.clearRect(p1.px * tq, p1.py * tq, tq, tq);
            playerState = "walkBack";
            p1.py--;
          }
          break;
        case 39: //right
          if (!p1.playerColideright) {
            ctx.clearRect(p1.px * tq, p1.py * tq, tq, tq);
            playerState = "walkRight";
            p1.px++;
          }
          break;
        case 40: //down
          if (!p1.playerColidedown) {
            ctx.clearRect(p1.px * tq, p1.py * tq, tq, tq);
            playerState = "walkFront";
            p1.py++;
          }
          break;
        case 88: // colocar bomba
          colocarBomba(conectados[0]);
          break;
      }
    }

    if (p2 != undefined && p2.vivo) {
      switch (event.keyCode) {
        case 65: //left
          if (!p2.playerColideleft) {
            ctx.clearRect(p2.px * tq, p2.py * tq, tq, tq);
            playerState = "walkLeft";
            p2.px--;
          }
          break;
        case 87: //up
          if (!p2.playerColideup) {
            ctx.clearRect(p2.px * tq, p2.py * tq, tq, tq);
            playerState = "walkBack";
            p2.py--;
          }
          break;
        case 68: //right
          if (!p2.playerColideright) {
            ctx.clearRect(p2.px * tq, p2.py * tq, tq, tq);
            playerState = "walkRight";
            p2.px++;
          }
          break;
        case 83: //down
          if (!p2.playerColidedown) {
            ctx.clearRect(p2.px * tq, p2.py * tq, tq, tq);
            playerState = "walkFront";
            p2.py++;
          }
          break;
        case 90:
          colocarBomba(conectados[1]);
          break;
      }
    }
  }
}

async function update() {
  conectados.forEach((element) => {
    ctx.fillStyle = element.cor;
    ctx.fillRect(element.px * tq, element.py * tq, tq, tq);
    ctx.fillStyle = "black";
    ctx.font = "20px roboto";
    ctx.fillText(element.name, element.px * tq + 1, element.py * tq + tq / 4);
  });

  if (
    conectados.some((conectado) =>
      conectado.minhasbombas.some((minhabom) =>
        minhabom.raioExplosao.some((element) =>
          conectados.some(
            (player) => element.x == player.px && element.y == player.py
          )
        )
      )
    )
  ) {
    
    /*alert(conectados.findIndex((player1) =>
      player1.minhasbombas.raioExplosao.some((element) =>
        conectados.some(
        player2 => element.x == player2.px && element.y == player2.py
        )
      )
    ))*/

    var morto = conectados.findIndex((element) =>
      conectados.some((player) =>
        player.minhasbombas.some(bombaN => bombaN.raioExplosao.some(
          (explodido) => explodido.x == element.px && explodido.y == element.py
        )
      ))
    );

    alert("Player " + conectados[morto].name + " morreu");
    //conectados.splice(morto, 1)
    delete conectados[morto]
  }
}

function teste() {
  gameStart = true;
}

generateLevel();
