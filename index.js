import Maze from "./Maze.js"
import Square from "./Square.js"

let level = 3 // for future use, would multiply the number of squares on the screen
let size = 1 / (level * 2) * 100
let square
let game = document.querySelector("#game")
let possibleDegrees = [90, 180, 270]

function init() {
  for (let i = 0; i < level; i++) {
    Square.SQUARES[i] = {}
    for (let j = 0; j < level; j++) {
      // create element
      square = new Maze(i, j).container
      Square.SQUARES[i][j] =  {
        square: square,
        degrees: 0,
        correctDegrees: possibleDegrees[Math.floor(Math.random() * 3)]
      }

      // add to html
      game.appendChild(square)
    }
  }
}

document.getElementById("start").addEventListener("click", function(e) {
  this.parentNode.innerText = ""
  document.getElementById("game").style.display = "flex"
  init()
})