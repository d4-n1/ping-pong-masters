//////////////////////////////////
// Home variables
//////////////////////////////////
const homeAddPoint = document.querySelector("button.home-add-point")
const homeSubtractPoint = document.querySelector("button.home-subtract-point")
const homePointsOutput = document.querySelector("span.home-points-output")
const homeSetsOutput = document.querySelector("span.home-sets-output")
const homeName = document.querySelector(`input[name="home-name"]`)
const homeBall = document.querySelector("div.ball-home")
let home = {name: homeName.value, points: 0, sets: 0}

//////////////////////////////////
// Visitor variables
//////////////////////////////////
const visitorAddPoint = document.querySelector("button.visitor-add-point")
const visitorSubtractPoint = document.querySelector("button.visitor-subtract-point")
const visitorPointsOutput = document.querySelector("span.visitor-points-output")
const visitorSetsOutput = document.querySelector("span.visitor-sets-output")
const visitorName = document.querySelector(`input[name="visitor-name"]`)
const visitorBall = document.querySelector("div.ball-visitor")
let visitor = {name:visitorName.value, points: 0, sets: 0}

//////////////////////////////////
// Caster
//////////////////////////////////
const casterMessage = document.querySelector("span.caster-message")

//////////////////////////////////
// Game variables
//////////////////////////////////
let playedSets = home.sets + visitor.sets
let matchRules = {setPoints: 11, gameSets: 3, services: 2, tieBreakServices: 1}
let currentService = 0
let servicer = ""
let firstServicer = ""
const newGameButton = document.querySelector("button.new-game")

const homepage = document.querySelector("div.homepage")
const pauseMenu = document.querySelector("div.pause-menu")

// Functions
//////////////////////////////////
// Reset the game
//////////////////////////////////
const resetGame = () => {
  seconds.innerHTML = "00"
  minutes.innerHTML = "00"
  totalSeconds = 0

  home.points = 0
  homePointsOutput.innerHTML = home.points
  home.sets = 0
  homeSetsOutput.innerHTML = home.sets
  homeBall.classList.remove("service")

  visitor.points = 0
  visitorPointsOutput.innerHTML = visitor.points
  visitor.sets = 0
  visitorSetsOutput.innerHTML = visitor.sets
  visitorBall.classList.remove("service")

  setTimer()
}

//////////////////////////////////
// Update scores
//////////////////////////////////
const updateScores = () => {
  homePointsOutput.innerHTML = home.points
  homeSetsOutput.innerHTML = home.sets
  visitorPointsOutput.innerHTML = visitor.points
  visitorSetsOutput.innerHTML = visitor.sets
}

const toggleServicer = (player) => {
  return player === "home" ? "visitor" : "home"
}

const coin = () => {
  let coinWinner
  let resultado = Math.floor(Math.random() * 2)

  coinWinner = resultado === 0 ? "home" : "visitor"
  servicer = coinWinner
  firstServicer = coinWinner

  updateServiceOutput()
  
  return servicer
}

const updateServiceOutput = () => {
  if (servicer == "home") {
    visitorBall.classList.remove("service")
    homeBall.classList.add("service")
  } else if (servicer == "visitor") {
    homeBall.classList.remove("service")
    visitorBall.classList.add("service")
  }
}

//////////////////////////////////
// Count services
//////////////////////////////////
const serviceListener = (serviceNumber) => {
  currentService++

  if(currentService >= serviceNumber) {
    servicer = toggleServicer(servicer)
    currentService = 0
  }
}

//////////////////////////////////
// Change service depending on tiebreak
//////////////////////////////////
const updateService = () => {
  if (home.points >= matchRules.setPoints - 1 && visitor.points >= matchRules.setPoints - 1) {
    serviceListener(1)
    updateServiceOutput()
  } else {
    serviceListener(2)
    updateServiceOutput()
  }
}

//////////////////////////////////
// Add a point
//////////////////////////////////
const addPoint = (player, pointsOutput, setsOutput) => {
  player.points++

  if (home.points >= matchRules.setPoints - 1 && visitor.points >= matchRules.setPoints - 1) {
    if (Math.abs(home.points - visitor.points) == 2) {
      home.points = 0
      visitor.points = 0
      player.sets++
      firstServicer = toggleServicer(firstServicer)
      servicer = firstServicer
      updateServiceOutput()
      currentService = 0
    } 
  } else {
    if (player.points >= matchRules.setPoints) {
      home.points = 0
      visitor.points = 0
      player.sets++

      firstServicer = toggleServicer(firstServicer)
      servicer = firstServicer
      updateServiceOutput()
      currentService = 0
    }
  }
  
  updateScores()
  updateService()
  win()
  return player
}

//////////////////////////////////
// Subtract a point
//////////////////////////////////
const subtractPoint = (player, playerOutput, setsOutput) => {
  if (player.points > 0) {
    player.points--
  } else {
    player.points = matchRules.setPoints -1
    if (player.sets > 0) {
      player.sets--
    } else {
      player.points = 0
      player.sets = 0
    }
  }

  updateScores()
  updateService()
  return player
}

//////////////////////////////////
// Checks if something win the game
//////////////////////////////////
const win = () => {
  if (home.sets >= Math.ceil(matchRules.gameSets / 2) || visitor.sets >= Math.ceil(matchRules.gameSets / 2) || playedSets >= matchRules.gameSets) {
    const winner = home.sets >= 2 ? home.name : visitor.name;
    alert(`${winner} wins the game!`);
    resetGame();
  }
}

homeName.addEventListener("input", function() {
  home.name = this.value
})

visitorName.addEventListener("input", function() {
  visitor.name = this.value
})

newGameButton.addEventListener("click", () => {
  resetGame()
  coin()
  homepage.classList.add("hidden")
})

homeAddPoint.addEventListener("click", () => {
  addPoint(home, homePointsOutput, homeSetsOutput)
})

homeSubtractPoint.addEventListener("click", () => {
  subtractPoint(home, homePointsOutput, homeSetsOutput)
})

visitorAddPoint.addEventListener("click", () => {
  addPoint(visitor, visitorPointsOutput, visitorSetsOutput)
})

visitorSubtractPoint.addEventListener("click", () => {
  subtractPoint(visitor, visitorPointsOutput, visitorSetsOutput)
})

//////////////////////////////////
// Timer
//////////////////////////////////
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

pauseGameButton.addEventListener("click", () => {
  pauseTimer()
  pauseMenu.classList.remove("hidden")
})

//////////////////////////////////
// Pause menu
//////////////////////////////////
const resumeGameButton = document.querySelector("button.resume-game")
const exitGameButton = document.querySelector("button.exit-game")

resumeGameButton.addEventListener("click", () => {
  pauseMenu.classList.add("hidden")
  timer = setInterval(addSecond, 1000)
})

exitGameButton.addEventListener("click", () => {
  pauseMenu.classList.add("hidden")
  homepage.classList.remove("hidden")
  clearInterval(timer)
  timer = null
})