const calendar = document.querySelector(".wrapper"),
  date = document.querySelector(".current-date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "january",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//날짜를 추가하는 함수

function initCalender() {
  //이전 달과 현재 달,일, 다음달을 가져옴
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  //캘린더의 일자를 업데이트
  date.innerHTML = months[month] + " " + year;

  //돔에 날짜를 추가
  let days = "";

  //이전 달 일자
  for (let x = day; x > 0; x--) {
    days += `<li class="day inactive">${prevDays - x + 1}</li>`;
  }

  //이번 달 일자
  for (let i = 1; i <= lastDate; i++) {
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      days += `<li class="day active ">${i}</li>`;
    } else {
      days += `<li class="day">${i}</li>`;
    }
    if (i === 5) {
      days += `<li class="day event">${i}</li>`;
    }
    if (i === 17) {
        days += `<li class="day event">${i}</li>`;
      }
  }

  //다음달 일자
  for (let j = 1; j <= nextDays; j++) {
    days += `<li class="day inactive">${j}</li>`;
  }

  daysContainer.innerHTML = days;
}

initCalender();

//이전 달
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalender();
}

//다음 달
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalender();
}

//이벤트 리스너 이전 달, 다음 달
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

const addEventBtn = document.querySelectorAll(".day"),
  addEventContainer = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close");

for (let i = 0; i < addEventBtn.length; i++) {
  addEventBtn[i].addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
    console.log(addEventContainer);
  });
}

addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
  console.log(addEventContainer);
});
