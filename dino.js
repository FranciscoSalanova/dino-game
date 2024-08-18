import { setCustomProperty } from "./updateCustomProperty.js"

const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

const dinoElem = document.querySelector("[data-dino]")

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0

  setCustomProperty(dinoElem, "--bottom", 0)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = "imgs/dino-stationary.png"
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }

  currentFrameTime += delta * speedScale
}
