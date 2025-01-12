const grid = document.getElementById("game-grid");
let game = [];
let life = 3;
let size = 5;
const width = "30px";
const debug = false;
let selectType = 1;

function checkEmpty() {
  game.forEach((e, x) => {
    let has = false;
    for (let y = 0; y < size; y++) {
      if (game[x][y] == 1) has = true;
    }
    if (!has) {
      for (let y = 0; y < size; y++) {
        if (game[x][y] == 0) game[x][y] = "x";
      }
    }
  });
  game.forEach((e, y) => {
    let has = false;
    for (let x = 0; x < size; x++) {
      if (game[x][y] == 1) has = true;
    }
    if (!has) {
      for (let x = 0; x < size; x++) {
        if (game[x][y] == 0) game[x][y] = "x";
      }
    }
  });
}

const goodCase = [1, "v", "_"];
function countCol(x) {
  const list = [0];
  [...Array(size)].forEach((_, i) => {
    if (goodCase.includes(game[i][x])) {
      list[list.length - 1]++;
    } else {
      if (list[list.length - 1] > 0) {
        list.push(0);
      }
    }
  });
  return list.filter((e) => e !== 0);
}
function countRow(x) {
  const list = [0];
  [...Array(size)].forEach((_, i) => {
    if (goodCase.includes(game[x][i])) {
      list[list.length - 1]++;
    } else {
      if (list[list.length - 1] > 0) {
        list.push(0);
      }
    }
  });
  return list.filter((e) => e !== 0);
}

function updateFront() {
  // numéros
  const left = document.getElementById("left");
  left.innerHTML = "";
  const top = document.getElementById("top");
  top.innerHTML = "";
  [...Array(size)].forEach((_, i) => {
    const elL = document.createElement("p");
    elL.className = "number";
    elL.innerHTML = countRow(i).join(" ");
    left.appendChild(elL);
    const elT = document.createElement("p");
    elT.innerHTML = countCol(i).join(" ");
    elT.className = "number";
    top.appendChild(elT);
  });

  // vies
  const lifeContainer = document.getElementById("life");
  lifeContainer.innerHTML = "";
  [...Array(life)].forEach((e) => {
    const heart = document.createElement("span");
    heart.innerHTML = "<3";
    lifeContainer.appendChild(heart);
  });

  // grid
  grid.innerHTML = "";
  game.forEach((e, x) => {
    const line = document.createElement("div");
    line.className = "line";
    e.forEach((v, y) => {
      const square = document.createElement("span");
      square.className = "square ";
      switch (game[x][y]) {
        case 0:
          square.className += "empty";
          square.onclick = () => check(x, y);
          break;
        case 1:
          square.className += "empty";
          square.onclick = () => check(x, y);
          break;
        case "x":
          square.className += "cross";
          break;
        case "_":
          square.className += "wrongFull";
          break;
        case "w0":
          square.className += "wrongEmty";
          break;
        case "v":
          square.className += "valid";
          break;
      }
      line.appendChild(square);
    });
    grid.appendChild(line);
  });

  // checkbox
  document.getElementById("0").checked = selectType == 0;
  document.getElementById("1").checked = selectType == 1;

  if (debug) {
    const prev = document.querySelector("prev");
    prev.innerHTML = "";
    game.forEach((e) => {
      const v = document.createElement("div");
      v.innerHTML = e;
      prev.appendChild(v);
    });
  }
}

function changeType() {
  selectType = selectType == 1 ? 0 : 1;
  document.querySelector("body").className = selectType == 0 ? "" : "check";
  updateFront();
}

function checkWin() {
  if (
    !game
      .map((e) => e.join())
      .join()
      .includes("1")
  ) {
    alert("WIN !!");
  }
}
function check(x, y) {
  if (game[x][y] != selectType) {
    life--;

    game[x][y] = selectType ? "w0" : "_";
  } else {
    game[x][y] = selectType == 1 ? "v" : "x";
  }
  if (life < 1) {
    alert("looser");
    refresh();
  }
  checkEmpty();
  updateFront();
  checkWin();
}

function refresh() {
  size = +document.getElementById("size").value;
  life = 3;
  game = [];
  [...Array(size)].forEach((_, x) => {
    game.push(
      [...Array(size)].map((_, y) => {
        return 0;
      })
    );
  });

  const min = Math.round(size * size * 0.6);
  const max = Math.round(size * size * 0.95);
  const nb = size * size - max;

  [...Array(Math.round(Math.random() * nb) + min)].forEach(checkRandom);

  updateFront();
}
function checkRandom() {
  const x = Math.round(Math.random() * (size - 1));
  const y = Math.round(Math.random() * (size - 1));
  if (game[x][y] == 1) {
    checkRandom();
  } else {
    game[x][y] = 1;
  }
}

refresh();

document.addEventListener("keypress", (e) => {
  switch (e.code) {
    case "Space":
      changeType();
      e.preventDefault();
      break;
  }
});
