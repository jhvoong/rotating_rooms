class Square {
  static PARENT_CONTAINER = document.getElementById("game")
  static SQUARES = {}

  constructor(i, j) {
    this.container = document.createElement("div")
    this.container.id = `${i}-${j}`

    // add styling
    this.container.classList.add("square")

    // add rotation functionality
    this.container.addEventListener("click", e => {
        this.audio.play()
        this.rotate(e.currentTarget)
    })

    this.audio = document.createElement("audio")
    this.audio.src = "./sliding_rock.mp3"
    this.audio.playbackRate = 2.0
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