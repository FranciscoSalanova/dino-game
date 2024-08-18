import { setupDino, updateDino } from "./dino.js"
import { setupGround, updateGround } from "./ground.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const startScreenElem = document.querySelector("[data-start-screen]")
const scoreElem = document.querySelector("[data-score]")

let lastTime
let speedScale
let score

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)

    return
  }

  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  lastTime = time
  window.requestAnimationFrame(update)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0

  setupGround()
  setupDino()

  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

/** Updates the speed of the game according to the progression of time (measured by the time's delta). */
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

/** Updates the score according to the progression of time (measured by the time's delta). */
function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

function setPixelToWorldScale() {
  let worldPixelToScale

  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldPixelToScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldPixelToScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldPixelToScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldPixelToScale}px`
}
