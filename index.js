let level = 3
let size = 1 / (level * 2) * 100
let square
let squares = {}
let grid = document.querySelector("#grid")

class Square {
  constructor(i, j) {
    this.content = document.createElement("div")
    this.content.id = `${i}-${j}`

    // add styling
    this.content.classList.add("square")
    // this.content.style.flexBasis = `${size}%`
    this.content.style.width = `${size}vw`
    this.content.style.height = `${size}vw`

    // add rotation functionality
    this.content.addEventListener("click", rotate)
  }
}

function rotate(event) {
  const [coordX, coordY] = this.id.split("-")
  const info = squares[coordX][coordY]
  const nextDeg = info.degrees + 90
  info.square.style.webkitTransform = `rotate(${nextDeg}deg)`;
  info.square.style.transform = `rotate(${nextDeg}deg)`;
  info.square.style.MozTransform = `rotate(${nextDeg}deg)`;
  info.square.style.msTransform = `rotate(${nextDeg}deg)`;
  info.square.style.OTransform = `rotate(${nextDeg}deg)`;
  squares[coordX][coordY].degrees = nextDeg
}

function init() {
  for (let i = 0; i < level; i++) {
    squares[i] = {}
    for (let j = 0; j < level; j++) {
      // create element
      square = new Square(i, j).content
      squares[i][j] =  {
        square: square,
        degrees: 0
      }

      // add to html
      grid.appendChild(square)
    }
  }
}