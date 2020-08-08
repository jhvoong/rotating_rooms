let level = 10
let size = 1 / level * 100
let square;
let grid = document.querySelector("#grid")

function init() {
  for (let i = 0; i < level ** 2; i++) {
    square = document.createElement("div")
    square.classList.add("square")
    square.style.flexBasis = `${size}%`
    grid.appendChild(square)
  }
}