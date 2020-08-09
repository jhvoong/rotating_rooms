class Square {
  static PARENT_CONTAINER = document.getElementById("game")
  static SQUARES = {}
  static DELAY = 700 // ms to wait for animation to finish

  constructor(i, j) {
    this.container = document.createElement("div")
    this.container.id = `${i}-${j}`

    // add styling
    this.container.classList.add("square")
    this.container.classList.add("incorrect")

    // add rotation functionality
    this.container.addEventListener("click", this.handleClick)

    this.audio = document.createElement("audio")
    this.audio.src = "./sliding_rock.mp3"
    this.audio.playbackRate = 2.0
  }

  checkWin() {
    this.won = !document.querySelector(".incorrect")
    if (this.won) {
      setTimeout(() => {
        document.getElementById("game").classList.add("hidden")
        document.getElementById("win-msg").style.display = "block"
      }, 700)
    }
    return this.won
  }

  handleClick = e => {
    if (this.spinning || this.won) return;
    this.spinning = setTimeout(() => this.spinning = false, Square.DELAY)
    this.audio.play()
    this.rotate(e.currentTarget)
    if (this.isCorrect(e.currentTarget)) {
      e.currentTarget.classList.add("correct")
      e.currentTarget.classList.remove("incorrect")
      e.currentTarget.classList.remove("type0")
      e.currentTarget.classList.remove("type1")
      e.currentTarget.classList.remove("type2")
    } else {
      e.currentTarget.classList.add('incorrect')
      e.currentTarget.classList.add(`type${Math.floor(Math.random() * 3)}`)
      e.currentTarget.classList.remove("correct")
    }
    this.checkWin()
  }
  isCorrect(target) {
    const [coordX, coordY] = target.id.split("-")
    const info = Square.SQUARES[coordX][coordY]
    return info.correctDegrees === info.degrees % 360
  }

  rotate(target) {
    // rotate
    const [coordX, coordY] = target.id.split("-")
    const info = Square.SQUARES[coordX][coordY]
    const nextDeg = info.degrees + 90
    info.square.style.webkitTransform = `rotate(${nextDeg}deg)`;
    info.square.style.transform = `rotate(${nextDeg}deg)`;
    info.square.style.MozTransform = `rotate(${nextDeg}deg)`;
    info.square.style.msTransform = `rotate(${nextDeg}deg)`;
    info.square.style.OTransform = `rotate(${nextDeg}deg)`;
    Square.SQUARES[coordX][coordY].degrees = nextDeg
  }
}

export default Square