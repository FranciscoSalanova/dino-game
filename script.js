import { setupGround, updateGround } from "./ground"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const startScreenElem = document.querySelector("[data-start-screen]")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }

  const delta = time - lastTime

  updateGround(delta, speedScale)

  lastTime = time

  window.requestAnimationFrame(update)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0

  setupGround()

  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
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
