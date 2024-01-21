let timer
let totalSeconds = 0
const pauseGameButton = document.querySelector("button.pause-game")
const minutes = document.querySelector("span.minutes")
const seconds = document.querySelector("span.seconds")

function pad(number) {
  let string = Math.floor(number).toString();
  if(string.length < 2) {
    return "0" + string;
  } else {
    return string;
  }}

function addSecond() {
  totalSeconds++
  seconds.innerHTML = pad(totalSeconds % 60)
  minutes.innerHTML = pad(totalSeconds / 60)
}

function setTimer() {
  timer = setInterval(addSecond, 1000)
}

function pauseTimer() {
  clearInterval(timer)
  timer = null
}