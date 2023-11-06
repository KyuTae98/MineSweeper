const entire = document.querySelector(".entire");
let score = 0;
let block = 0;
const buttonLeftClick = (event) => {
  let {
    target: { value },
  } = event;
  if (event.target.innerText === "") {
    if (value === "mine") {
      location.reload();
      alert("GAME OVER");
    } else if (value === "stand" && event.target.innerText === "") {
      checkBFS(event.target.x, event.target.y);
    }
  }
};

const buttonRigthClick = (event) => {
  event.preventDefault();
  if (event.target.innerText === "✔️") {
    event.target.innerText = "";
    if (event.target.value === "mine") score--;
  } else {
    if (event.target.value === "mine") score++;
    event.target.innerText = "✔️";
  }
  if (block === score) {
    location.reload();
    alert(
      "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 그리고 이 편지를 버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 이 편지를 받은 사람은 행운이 깃들것입니다. 힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을 빌면서.."
    );
  }
};

const checkMine = (x, y) => {
  let count = 0;
  if (x - 1 >= 0 && mine[x - 1][y].value === "mine") count++;
  if (y - 1 >= 0 && mine[x][y - 1].value === "mine") count++;
  if (x + 1 < 20 && mine[x + 1][y].value === "mine") count++;
  if (y + 1 < 20 && mine[x][y + 1].value === "mine") count++;

  if (x - 1 >= 0 && y - 1 >= 0 && mine[x - 1][y - 1].value === "mine") count++;
  if (x + 1 < 20 && y - 1 >= 0 && mine[x + 1][y - 1].value === "mine") count++;
  if (x + 1 < 20 && y + 1 < 20 && mine[x + 1][y + 1].value === "mine") count++;
  if (x - 1 >= 0 && y + 1 < 20 && mine[x - 1][y + 1].value === "mine") count++;
  return count;
};

const checkBFS = (x, y) => {
  let count = checkMine(x, y);
  if (count > 0) {
    mine[x][y].innerText = count;
  } else {
    let bfs = [[x, y]];
    while (bfs.length > 0) {
      let [cur_x, cur_y] = bfs.pop();
      mine[cur_x][cur_y].innerText = 0;
      if (
        cur_x + 1 < 20 &&
        mine[cur_x + 1][cur_y].innerText === "" &&
        checkMine(cur_x + 1, cur_y) === 0
      )
        bfs.push([cur_x + 1, cur_y]);
      else if (cur_x + 1 < 20)
        mine[cur_x + 1][cur_y].innerText = checkMine(cur_x + 1, cur_y);

      if (
        cur_y + 1 < 20 &&
        mine[cur_x][cur_y + 1].innerText === "" &&
        checkMine(cur_x, cur_y + 1) === 0
      )
        bfs.push([cur_x, cur_y + 1]);
      else if (cur_y + 1 < 20)
        mine[cur_x][cur_y + 1].innerText = checkMine(cur_x, cur_y + 1);

      if (
        cur_x - 1 > -1 &&
        mine[cur_x - 1][cur_y].innerText === "" &&
        checkMine(cur_x - 1, cur_y) === 0
      )
        bfs.push([cur_x - 1, cur_y]);
      else if (cur_x - 1 > -1)
        mine[cur_x - 1][cur_y].innerText = checkMine(cur_x - 1, cur_y);

      if (
        cur_y - 1 > -1 &&
        mine[cur_x][cur_y - 1].innerText === "" &&
        checkMine(cur_x, cur_y - 1) === 0
      )
        bfs.push([cur_x, cur_y - 1]);
      else if (cur_y - 1 > -1)
        mine[cur_x][cur_y - 1].innerText = checkMine(cur_x, cur_y - 1);

      if (
        cur_y - 1 > -1 &&
        cur_x - 1 > -1 &&
        mine[cur_x - 1][cur_y - 1].innerText === "" &&
        checkMine(cur_x - 1, cur_y - 1) === 0
      )
        bfs.push([cur_x - 1, cur_y - 1]);
      else if (cur_y - 1 > -1 && cur_x - 1 > -1)
        mine[cur_x - 1][cur_y - 1].innerText = checkMine(cur_x - 1, cur_y - 1);

      if (
        cur_y + 1 < 20 &&
        cur_x - 1 > -1 &&
        mine[cur_x - 1][cur_y + 1].innerText === "" &&
        checkMine(cur_x - 1, cur_y + 1) === 0
      )
        bfs.push([cur_x - 1, cur_y + 1]);
      else if (cur_y + 1 < 20 && cur_x - 1 > -1)
        mine[cur_x - 1][cur_y + 1].innerText = checkMine(cur_x - 1, cur_y + 1);

      if (
        cur_x + 1 < 20 &&
        cur_y - 1 > -1 &&
        mine[cur_x + 1][cur_y - 1].innerText === "" &&
        checkMine(cur_x + 1, cur_y - 1) === 0
      )
        bfs.push([cur_x + 1, cur_y - 1]);
      else if (cur_x + 1 < 20 && cur_y - 1 > -1)
        mine[cur_x + 1][cur_y - 1].innerText = checkMine(cur_x + 1, cur_y - 1);

      if (
        cur_x + 1 < 20 &&
        cur_y + 1 < 20 &&
        mine[cur_x + 1][cur_y + 1].innerText === "" &&
        checkMine(cur_x + 1, cur_y + 1) === 0
      )
        bfs.push([cur_x + 1, cur_y + 1]);
      else if (cur_x + 1 < 20 && cur_y + 1 < 20)
        mine[cur_x + 1][cur_y + 1].innerText = checkMine(cur_x + 1, cur_y + 1);
    }
  }
};

const mine = new Array(20).fill().map((v, x) => {
  const random = [
    Math.floor(Math.random() * (19 - 0) + 0),
    Math.floor(Math.random() * (19 - 0) + 0),
  ];
  return new Array(20).fill().map((ele, y) => {
    ele = document.createElement("button");
    ele.addEventListener("contextmenu", buttonRigthClick);
    ele.classList.add("mine");
    if (random.includes(y)) {
      ele.value = "mine";
      block++;
    } else ele.value = "stand";
    ele.x = x;
    ele.y = y;
    ele.onclick = buttonLeftClick;
    entire.appendChild(ele);
    return ele;
  });
});
