const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

const start_btn = document.getElementById("start_btn");
const stop = document.getElementById("stop_btn");
const reset_btn = document.getElementById("reset_btn");

//타이머의 상태를 저장 (실행전, 실행중, 실행완료)
const disp = document.getElementById("disp");
const numbers = document.querySelector(".number-container");

let interval = null;
let total = 0;

//유저가 입력한 총 시간을 total에 저장
const totalValue = () => {
  total =
    Number(hour.value) * 3600 +
    Number(minute.value) * 60 +
    Number(second.value);
};

//줄어드는 시간을 처리
const timer = () => {
  totalValue();
  total--;

  if (total >= 0) {
    let hr = Math.floor(total / 3600);
    let mn = Math.floor((total % 3600) / 60);
    let sc = total % 60;

    //계산된 시간을 string으로 변경
    hour.value = String(hr).padStart(2, "0");
    minute.value = String(mn).padStart(2, "0");
    second.value = String(sc).padStart(2, "0");
  } else {
    disp.innerText = "Time Over !!";
  }
};

//입력값을 숫자로 제한
numbers.addEventListener("input", (e) => {
  e.target.value = e.target.value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
});

//start 버튼을 누르면 실행
start_btn.addEventListener("click", () => {
  clearInterval(interval);

  //1초마다 timer() 함수를 실행시킨다.
  interval = setInterval(timer, 1000);
  disp.innerText = "Timer started";
});

//stop 버튼을 누르면 실행
stop_btn.addEventListener("click", () => {
  clearInterval(interval);
});

//reset 버튼을 누르면 실행
reset_btn.addEventListener("click", () => {
  clearInterval(interval);
  hour.value = "";
  minute.value = "";
  second.value = "";
  disp.innerText = "Timer";
});
