let canvas = document.getElementById('game')
let context = canvas.getContext('2d')

let grid = 16
let count = 0

let movements = []

let gameOver = false
let screenshot = false
var mediumQualityScreenshot = null

let bot = {
  x: 160,
  y: 160,

  // bot velocity
  dx: grid,
  dy: 0,

  // keep track of cells
  cells: [],

  // length of the bot
  maxCells: 1,
}

let objective = {
  x: 320,
  y: 320,
}

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// game loop
function loop() {
  count = 0
  context.clearRect(0, 0, canvas.width, canvas.height)

  // wrap bot position horizontally on edge of screen
  if (bot.x < 0) {
    bot.x = canvas.width - grid
  } else if (bot.x >= canvas.width) {
    bot.x = 0
  }

  // wrap bot position vertically on edge of screen
  if (bot.y < 0) {
    bot.y = canvas.height - grid
  } else if (bot.y >= canvas.height) {
    bot.y = 0
  }

  // draw objective
  context.fillStyle = 'red'
  context.fillRect(objective.x, objective.y, grid - 1, grid - 1)

  // draw bot
  context.fillStyle = 'green'
  context.fillRect(bot.x, bot.y, grid - 1, grid - 1)

  if (!screenshot) {
    mediumQualityScreenshot = canvas.toDataURL('image/jpeg', 0.5)
    screenshot = true
  }

  // bot on objective
  if (bot.x === objective.x && bot.y === objective.y) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.font = '60px system-ui'
    context.fillText('Snake Bot Escaped!', 80, 200, 250)
    gameOver = true
    document.removeEventListener('keydown', keyPressHandeler)
    let viewsolBtn = document.getElementById('viewsol')
    let data = {
      datetime: new Date().toLocaleString(),
      plays: JSON.stringify(movements),
    }
    fetch('/records/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'X-CSRFTOKEN': CSRFToken,
      },
      body: new URLSearchParams({
        dateTime: Math.floor(Date.now() / 1000),
        data: JSON.stringify(movements),
      }),
    }).then(() => {
      console.log('Data Sent')
    })
    viewsolBtn.innerHTML = `
          <div class="col">
                <input id="submitBtn" type="submit" value="Save Record">
            </div>
          `
    return
  }
  requestAnimationFrame(loop)
}

let keyPressHandeler = function (e) {
  // left arrow key
  if (e.which === 37) {
    bot.x -= grid
    if (movements.length == 0) {
      movements.push({ moveType: 'LEFT', steps: 1 })
    }
    let lastMovement = movements.pop()
    if (lastMovement.moveType === 'LEFT') {
      lastMovement.steps += 1
      movements.push(lastMovement)
    } else {
      movements.push(lastMovement)
      movements.push({ moveType: 'LEFT', steps: 1 })
    }
  }
  // up arrow key
  else if (e.which === 38) {
    bot.y -= grid
    if (movements.length == 0) {
      movements.push({ moveType: 'UP', steps: 1 })
    }
    let lastMovement = movements.pop()
    if (lastMovement.moveType === 'UP') {
      lastMovement.steps += 1
      movements.push(lastMovement)
    } else {
      movements.push(lastMovement)
      movements.push({ moveType: 'UP', steps: 1 })
    }
  }
  // right arrow key
  else if (e.which === 39) {
    bot.x += grid
    if (movements.length == 0) {
      movements.push({ moveType: 'RIGHT', steps: 1 })
    }
    let lastMovement = movements.pop()
    if (lastMovement.moveType === 'RIGHT') {
      lastMovement.steps += 1
      movements.push(lastMovement)
    } else {
      movements.push(lastMovement)
      movements.push({ moveType: 'RIGHT', steps: 1 })
    }
  }
  // down arrow key
  else if (e.which === 40) {
    bot.y += grid
    if (movements.length == 0) {
      movements.push({ moveType: 'DOWN', steps: 1 })
    }
    let lastMovement = movements.pop()
    if (lastMovement.moveType === 'DOWN') {
      lastMovement.steps += 1
      movements.push(lastMovement)
    } else {
      movements.push(lastMovement)
      movements.push({ moveType: 'DOWN', steps: 1 })
    }
  }
}

// start the game
requestAnimationFrame(loop)
document.addEventListener('keydown', keyPressHandeler)
