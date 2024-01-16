/*
MVP

Edición básica de jugadores:
✔️ Poder asignar un nombre a cada jugador
- Pantalla de form de nombre de jugadores

Marcador de puntos y sets: 
✔️ Al mejor de 3 sets de 11 puntos.
✔️ Los sets se juegan a 11 puntos.
✔️ Si se llega a 10 iguales, se juega a diferencia de dos puntos.
✔️ Al llegar a 2 sets, se gana la partida.
- Sistema de Undo para que el botón (-) funcione correctamente.
- Pantalla de victoria

Marcador de bola de saque:
✔️ Botón "Comenzar partida"
✔️ Cada jugador saca dos veces seguidas.
- Si llegan a 10 iguales, cada jugador solo saca una vez.
✔️ Randomizador de jugador inicial

*/

// Player 1 variables
const homeAddPoint = document.querySelector("button.home-add-point")
const homeSubtractPoint = document.querySelector("button.home-subtract-point")
const homePointsOutput = document.querySelector("span.home-points-output")
const homeSetsOutput = document.querySelector("span.home-sets-output")
const homeName = document.querySelector(`input[name="home-name"]`)
const homeBall = document.querySelector("div.ball-home")
let home = {name: homeName.value, points: 0, sets: 0}

// Player 2 variables
const visitorAddPoint = document.querySelector("button.visitor-add-point")
const visitorSubtractPoint = document.querySelector("button.visitor-subtract-point")
const visitorPointsOutput = document.querySelector("span.visitor-points-output")
const visitorSetsOutput = document.querySelector("span.visitor-sets-output")
const visitorName = document.querySelector(`input[name="visitor-name"]`)
const visitorBall = document.querySelector("div.ball-visitor")
let visitor = {name:visitorName.value, points: 0, sets: 0}

// Caster
const casterMessage = document.querySelector("span.caster-message")

// Game variables
let playedSets = home.sets + visitor.sets
let matchRules = {setPoints: 11, gameSets: 3, services: 2, tieBreakServices: 1}
let currentServices = 0
const newGameButton = document.querySelector("button.new-game")

const homepage = document.querySelector("div.homepage")
const pauseMenu = document.querySelector("div.pause-menu")

// Functions
// Reset the game
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

// Update scores
const updateScores = () => {
  homePointsOutput.innerHTML = home.points
  homeSetsOutput.innerHTML = home.sets
  visitorPointsOutput.innerHTML = visitor.points
  visitorSetsOutput.innerHTML = visitor.sets
}

// Choose who serves first
const firstService = () => {
  let x = Math.floor(Math.random() * 2)
  if (x === 0) {
    casterMessage.innerHTML = `¡${home.name} comienza el servicio!`
    homeBall.classList.add("service")
  } else {
    casterMessage.innerHTML = `¡${visitor.name} comienza el servicio!`
    visitorBall.classList.add("service")
  }

  setTimeout(() => {
    casterMessage.innerHTML = "Ping Pong Masters"
    }, 3000);
}

// Update the service
const service = () => {
  currentServices++
  console.log(currentServices)

  // Tie break service
  if (home.points >= matchRules.setPoints - 1 && visitor.points >= matchRules.setPoints - 1) {
    if (currentServices >= matchRules.tieBreakServices) {
      homeBall.classList.toggle("service")
      visitorBall.classList.toggle("service")
      currentServices = 0
    }
  }
  
  // Default service
  if (currentServices == matchRules.services) {
    homeBall.classList.toggle("service")
    visitorBall.classList.toggle("service")
    currentServices = 0
  }
}

// Add a point
const addPoint = (player, pointsOutput, setsOutput) => {
  if (home.points >= matchRules.setPoints - 1 && visitor.points >= matchRules.setPoints - 1) {
    player.points++
    if (Math.abs(home.points - visitor.points) == 2) {
      home.points = 0
      visitor.points = 0
      player.sets++
    } 
  } else {
    player.points++
    if (player.points >= matchRules.setPoints) {
      home.points = 0
      visitor.points = 0
      player.sets++
    }
  }
  
  updateScores()
  service()
  win()
  return player
}

// Subtract a point
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
  service()
  return player
}

// Checks if something win the game
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
  firstService()
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

// Clock
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

// Pause menu
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