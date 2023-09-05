const isEquals = (frist, second) => {
  const [fx, fy] = frist;
  const [sx, sy] = second;
  return fx === sx && fy === sy;
};

function hasDuplicates(array) {
  const checkedItem = [];
  for (const i of array) {
    for (const j of checkedItem) {
      if (isEquals(i, j)) return true;
    }
    checkedItem.push(i);
  }
  return false;
}

function randomSpawn() {
  x = Math.floor(Math.random() * 49);
  y = Math.floor(Math.random() * 49);
  return [x, y];
}

const frsitSpawnSnake = [
  [25, 25],
  [24, 25],
];

class Snake {
  born() {
    this.limit = 50;
    this.direction = "right";
    this.parts = [
      [25, 25],
      [24, 25],
    ];
    this.apple = randomSpawn();
  }

  head() {
    return this.parts[0];
  }
  lastPart() {
    return this.parts[this.length - 1];
  }

  addTail() {
    const [x1, y1] = this.parts[this.parts.length - 1];
    const [x2, y2] = this.parts[this.parts.length - 2];
    const x = x1 + (x1 - x2);
    const y = y1 + (y1 - y2);
    this.parts.push([x, y]);
  }
  spawnApple() {
    let whileCheck = true;
    while (whileCheck) {
      const rs = randomSpawn();
      for (const part of this.parts) {
        if (!isEquals(part, rs)) whileCheck = false;
      }
      this.apple = rs;
    }
  }

  nextMove() {
    let [x, y] = this.head();
    if (this.direction === "up") {
      if (y - 1 < 0) y = 49;
      else y -= 1;
    }
    if (this.direction === "down") {
      if (y + 1 > 49) y = 0;
      else y += 1;
    }
    if (this.direction === "left") {
      if (x - 1 < 0) x = 49;
      else x -= 1;
    }
    if (this.direction === "right") {
      if (x + 1 > 49) x = 0;
      else x += 1;
    }
    return [x, y];
  }

  move() {
    const nextMove = this.nextMove();
    this.parts.unshift(nextMove);
    this.parts.pop();
    if (isEquals(nextMove, this.apple)) this.grow();
  }

  isBiteItSelf() {
    return hasDuplicates(this.parts);
  }
  gameOver() {
    alert("game over");
    this.constructor();
  }

  changeDirection(direction) {
    switch (direction) {
      case "up":
        if (this.direction !== "down") this.direction = "up";
        break;
      case "down":
        if (this.direction !== "up") this.direction = "down";
        break;
      case "left":
        if (this.direction !== "right") this.direction = "left";
        break;
      case "right":
        if (this.direction !== "left") this.direction = "right";
        break;
    }
  }

  grow() {
    this.addTail();
    this.spawnApple();
  }
}

const renderFreame = (parts, apple) => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  ctx.reset();

  ctx.fillStyle = "orange";
  for (const part of parts) {
    ctx.fillRect(part[0], part[1], 1, 1);
  }
  ctx.fillStyle = "red";
  ctx.fillRect(apple[0], apple[1], 1, 1);
};

const SNAKE = new Snake();
SNAKE.born();
let EASY_DEFFICALTY = 100;
let MEDIUM_DEFFICALTY = 60;
let HARD_DEFFICALTY = 30;
let SELECTED_DEFFICALTY = MEDIUM_DEFFICALTY;

document.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowUp":
      SNAKE.changeDirection("up");
      break;
    case "ArrowDown":
      SNAKE.changeDirection("down");
      break;
    case "ArrowRight":
      SNAKE.changeDirection("right");
      break;
    case "ArrowLeft":
      SNAKE.changeDirection("left");
      break;
  }
};

function someLoop() {
  SNAKE.move();
  renderFreame(SNAKE.parts, SNAKE.apple);
  if (SNAKE.isBiteItSelf()) {
    alert("Game Over");
    SNAKE.born();
  }
  setTimeout(someLoop, SELECTED_DEFFICALTY);
}
someLoop();

document.getElementById("easy").onclick = () => {
  SELECTED_DEFFICALTY = EASY_DEFFICALTY;
};
document.getElementById("medium").onclick = () => {
  SELECTED_DEFFICALTY = MEDIUM_DEFFICALTY;
};
document.getElementById("hard").onclick = () => {
  SELECTED_DEFFICALTY = HARD_DEFFICALTY;
};
document.getElementById("reset").onclick = () => {
  SNAKE.born();
};
document.getElementById("up").onclick = () => {
  SNAKE.changeDirection("up");
};
document.getElementById("down").onclick = () => {
  SNAKE.changeDirection("down");
};
document.getElementById("left").onclick = () => {
  SNAKE.changeDirection("left");
};
document.getElementById("right").onclick = () => {
  SNAKE.changeDirection("right");
};
