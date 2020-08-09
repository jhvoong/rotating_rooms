import Maze from "./Maze.js"
import Square from "./Square.js"

let level = 3 // for future use, would multiply the number of squares on the screen
let size = 1 / (level * 2) * 100
let square
let game = document.querySelector("#game")


function init() {
  for (let i = 0; i < level; i++) {
    Square.SQUARES[i] = {}
    for (let j = 0; j < level; j++) {
      // create element
      square = new Maze(i, j).container
      Square.SQUARES[i][j] =  {
        square: square,
        degrees: 0
      }

      // add to html
      game.appendChild(square)
    }
  }
}

document.addEventListener("DOMContentLoaded", init)