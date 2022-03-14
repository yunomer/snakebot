let canvas = document.getElementById('game')
let context = canvas.getContext('2d')

// What each grid step is (Make it look game like)
let grid = 16
// Array to record all moves/steps
let movements = []

// Bot positioning on canvas
let bot = {
  x: 160,
  y: 160,
  // keep track of cells
  cells: [],
}

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// canvas is 400x400 which is 25x25 grids
let objective = {
  x: getRandomInt(0, 25) * grid,
  y: getRandomInt(0, 25) * grid,
}

// game loop
function loop() {
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

  // bot on objective
  if (bot.x === objective.x && bot.y === objective.y) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.font = '60px system-ui'
    context.fillText('Snake Bot Escaped!', 80, 200, 250)
    document.removeEventListener('keydown', keyPressHandeler)
    let viewsolBtn = document.getElementById('viewsol')
    // Post data to database
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
    // Update UI and add button to tell user to check records
    viewsolBtn.innerHTML = `
          <div class="col">
                <a href="/records/" class="btn btn-outline-light" role="button">View Result</a>
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
    } else {
      let lastMovement = movements.pop()
      if (lastMovement.moveType === 'LEFT') {
        lastMovement.steps += 1
        movements.push(lastMovement)
      } else {
        movements.push(lastMovement)
        movements.push({ moveType: 'LEFT', steps: 1 })
      }
    }
  }
  // up arrow key
  else if (e.which === 38) {
    bot.y -= grid
    if (movements.length == 0) {
      movements.push({ moveType: 'UP', steps: 1 })
    } else {
      let lastMovement = movements.pop()
      if (lastMovement.moveType === 'UP') {
        lastMovement.steps += 1
        movements.push(lastMovement)
      } else {
        movements.push(lastMovement)
        movements.push({ moveType: 'UP', steps: 1 })
      }
    }
  }
  // right arrow key
  else if (e.which === 39) {
    bot.x += grid
    if (movements.length == 0) {
      movements.push({ moveType: 'RIGHT', steps: 1 })
    } else {
      let lastMovement = movements.pop()
      if (lastMovement.moveType === 'RIGHT') {
        lastMovement.steps += 1
        movements.push(lastMovement)
      } else {
        movements.push(lastMovement)
        movements.push({ moveType: 'RIGHT', steps: 1 })
      }
    }
  }
  // down arrow key
  else if (e.which === 40) {
    bot.y += grid
    if (movements.length == 0) {
      movements.push({ moveType: 'DOWN', steps: 1 })
    } else {
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
}

// start the game
requestAnimationFrame(loop)
document.addEventListener('keydown', keyPressHandeler)
