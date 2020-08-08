let level = 3
let size = 1 / (level * 2) * 100
let square
let squares = {}
let game = document.querySelector("#game")
let audio = document.getElementsByTagName("audio")[0]
audio.playbackRate = 2.0

class Square {
  constructor(i, j) {
    this.content = document.createElement("div")
    this.content.id = `${i}-${j}`

    // add styling
    this.content.classList.add("square")
    this.content.style.width = `${size}vw`
    this.content.style.height = `${size}vw`

    // add rotation functionality
    this.content.addEventListener("click", rotate)
  }
}

function rotate(clickEvent) {
  // play sound
  audio.play()
  
  // rotate
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
      game.appendChild(square)
    }
  }
}




let ctx,
  wid,
  hei,
  maze,
  start = {x:-1, y:-1}, // cell coordinate of the start of maze
  end = {x:-1, y:-1}, // cell coordinate of the end of maze
  stack = [];
const COLUMNS = 21, // number of cells in a row of the maze (must be odd)
  ROWS = 21, // number of cells in a column of the maze (must be odd)
  CELL_WIDTH = 10,
  PATH = 0,
  WALL = 1;

function drawMaze() {
    for( let i = 0; i < COLUMNS; i++ ) {
        for( let j = 0; j < ROWS; j++ ) {
            switch(maze[i][j]) {
                case PATH: ctx.fillStyle = "white"; break;
                case WALL: ctx.fillStyle = "black"; break;
            }
            ctx.fillRect( CELL_WIDTH * i, CELL_WIDTH * j, CELL_WIDTH, CELL_WIDTH  );
        }
    }
}

/* returns array of neighbors to provided coordinates
 * a cell is considered a neighbor if it is within 2 cells away from the origin cell
 * and is either above, below, left, or right of the origin cell
*/
function getNeighbors( x, y) {
    const n = [];
    
    // check left
    if (x - 1 > 0 && maze[x - 1][y] && x - 2 > 0 && maze[x - 2][y]) {
        n.push( { x:x - 1, y } );
        n.push( { x:x - 2, y } );
    }

    // check right
    if (x + 1 < COLUMNS - 1 && maze[x + 1][y] && x + 2 < COLUMNS - 1 && maze[x + 2][y]) {
        n.push( { x:x + 1, y } );
        n.push( { x:x + 2, y } );
    }

    // check above
    if (y - 1 > 0 && maze[x][y - 1] && y - 2 > 0 && maze[x][y - 2]) {
        n.push( { x, y:y - 1 } );
        n.push( { x, y:y - 2 } );
    }
    
    // check below
    if (y + 1 < ROWS - 1 && maze[x][y + 1] && y + 2 < ROWS - 1 && maze[x][y + 2]) {
        n.push( { x, y:y + 1 } );
        n.push( { x, y:y + 2 } );
    }
    return n;
}

// creates a 2D array given the dimensions
function createArray(ROWS, COLUMNS) {
    const arr = new Array(ROWS);
    for(let i = 0; i < ROWS; i++) {
        arr[i] = new Array(COLUMNS);
        for(let j = 0; j < COLUMNS; j++ ) {
            arr[i][j] = WALL;
        }
    }
    return arr;
}

// uses dfs with backtracing to generate maze
function createMaze() {
    const neighbors = getNeighbors(start.x, start.y);
    let n;

    if (neighbors.length < 1) {
        if (stack.length < 1) {
            drawMaze();
            stack = [];
            // start.x = start.y = -1;
            return;
        }
        start = stack.pop();
    } else {
        // get even numbered neighbor and next
        const i = 2 * Math.floor(Math.random() * (neighbors.length / 2))
        n = neighbors[i];
        maze[n.x][n.y] = PATH;
        n = neighbors[i + 1];
        maze[n.x][n.y] = PATH;
        start = n
        stack.push(start)
    }
    drawMaze();
    requestAnimationFrame(createMaze); // recursion to update next frame
}
function createCanvas( w, h ) {
    const canvas = document.createElement( "canvas" );
    canvas.width = w;
    canvas.height = h;
    canvas.id = "canvas";
    ctx = canvas.getContext("2d");
    // ctx.fillStyle = "red";
    // ctx.fillRect(0, 0, w, h);
    document.body.appendChild(canvas); 
}
function initMaze() {
    createCanvas(CELL_WIDTH * COLUMNS, CELL_WIDTH * ROWS);
    maze = createArray(ROWS, COLUMNS);

    // pick an odd-valued start/end somewhere on left/right half of screen
    // start.x = Math.floor( Math.random() * ( COLUMNS / 2 ) );
    // start.y = Math.floor( Math.random() * ( ROWS / 2 ) );
    start.x = 0;
    start.y = 6;
    end.x = COLUMNS - 1
    end.y = 4
    if( !( start.x & 1 ) ) start.x++; if( !( start.y & 1 ) ) start.y++;
    maze[start.x][start.y] = 0;
    createMaze();
}
 