import Square from "./Square.js"

class Maze extends Square {
  static COLUMNS = 15 // number of cells in a row of the maze (must be odd)
  static ROWS = 15 // number of cells in a column of the maze (must be odd)
  static CELL_WIDTH = Math.floor(Square.PARENT_CONTAINER.clientWidth / 3 / Maze.COLUMNS) // size of each cell
  static PATH = 0
  static WALL = 1
  static OPENING = 2 // opening for entry, there is only 1 per maze next to the start along the border
  constructor(squarePosX, squarePosY) {
      super(squarePosX, squarePosY)
      this.ctx;
      this.maze;
      this.start = {x:-1, y:-1} // cell coordinate of the start of maze
      this.end = {x:-1, y:-1} // cell coordinate of the end of maze
      this.stack = []

      this.initMaze()
  }

  // determine the openings next to the starting and ending cells
  assignOpenings(start, end) {
      if (start.y === 0) {
          // start is at top of maze
          this.maze[start.x][0] = Maze.OPENING
      } else if (start.y === Maze.ROWS) {
          // start is at bottom of maze
          this.maze[start.x][Maze.ROWS - 1] = Maze.OPENING
      } else if (start.x === 0) {
          // start is at left of maze
          this.maze[0][start.y] = Maze.OPENING
      } else {
          console.error("Invalid starting cell")
      }
  }
  
  // creates a 2D array given the dimensions
  createArray = (rows, cols) => {
      const arr = new Array(rows);
      for(let i = 0; i < rows; i++) {
          arr[i] = new Array(cols);
          for(let j = 0; j < cols; j++ ) {
              arr[i][j] = Maze.WALL;
          }
      }
      return arr;
  }

  createCanvas = ( w, h ) => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      this.ctx = canvas.getContext("2d");
      this.container.appendChild(canvas)
  }

  // uses dfs with backtracing to generate maze
  createMaze = () => {
      const neighbors = this.getNeighbors(this.start.x, this.start.y);
      let n;

      if (neighbors.length < 1) {
          if (this.stack.length < 1) {
              this.drawMaze();
              this.stack = [];
              this.start.x = this.start.y = -1;
              return;
          }
          this.start = this.stack.pop();
      } else {
          // get an even numbered neighbor
          const i = 2 * Math.floor(Math.random() * (neighbors.length / 2))
          n = neighbors[i];
          this.maze[n.x][n.y] = Maze.PATH;

          // get next neighbor over in array
          n = neighbors[i + 1];
          this.maze[n.x][n.y] = Maze.PATH;
          this.start = n
          this.stack.push(this.start)
      }
      this.drawMaze();
      requestAnimationFrame(this.createMaze); // recursion to update next frame
  }

  drawMaze = () => {
      for( let i = 0; i < Maze.COLUMNS; i++) {
          for( let j = 0; j < Maze.ROWS; j++) {
              switch(this.maze[i][j]) {
                  case Maze.PATH:   this.ctx.fillStyle  = "#ccaa73"; break;
                  case Maze.WALL:   this.ctx.fillStyle  = "#888c8d"; break;
                  case Maze.OPENING:this.ctx.fillStyle  = "green"; break;
              }
              this.ctx.fillRect( Maze.CELL_WIDTH * i, Maze.CELL_WIDTH * j, Maze.CELL_WIDTH, Maze.CELL_WIDTH);
          }
      }
  }

  /* returns array of neighbors to provided coordinates
  * a cell is considered a neighbor if it is within 2 cells away from the origin cell
  * and is either above, below, left, or right of the origin cell
  */
  getNeighbors = (x, y) => {
      const n = [];
      
      // check left
      if (x - 1 > 0 && this.maze[x - 1][y] && x - 2 > 0 && this.maze[x - 2][y]) {
          n.push( { x:x - 1, y } );
          n.push( { x:x - 2, y } );
      }

      // check right
      if (x + 1 < Maze.COLUMNS - 1 && this.maze[x + 1][y] && x + 2 < Maze.COLUMNS - 1 && this.maze[x + 2][y]) {
          n.push( { x:x + 1, y } );
          n.push( { x:x + 2, y } );
      }

      // check above
      if (y - 1 > 0 && this.maze[x][y - 1] && y - 2 > 0 && this.maze[x][y - 2]) {
          n.push( { x, y:y - 1 } );
          n.push( { x, y:y - 2 } );
      }
      
      // check below
      if (y + 1 < Maze.ROWS - 1 && this.maze[x][y + 1] && y + 2 < Maze.ROWS - 1 && this.maze[x][y + 2]) {
          n.push( { x, y:y + 1 } );
          n.push( { x, y:y + 2 } );
      }
      return n;
  }

  initMaze = () => {
      this.createCanvas(Maze.CELL_WIDTH * Maze.COLUMNS, Maze.CELL_WIDTH * Maze.ROWS);
      this.maze = this.createArray(Maze.ROWS, Maze.COLUMNS);

      // pick an odd-valued start/end somewhere on left/right half of screen
      this.start.x = Math.floor(Math.random() * (Maze.COLUMNS / 2));
      if (this.start.x === 0) {
          this.start.y = Math.floor(Math.random() * (Maze.ROWS));
      } else {
          this.start.y = 0;
      }

      this.assignOpenings(this.start, this.end)
      if( !( this.start.x & 1 ) ) this.start.x++; if( !( this.start.y & 1 ) ) this.start.y++;
      // this.maze[this.start.x][this.start.y] = 0;
      this.createMaze();
  }
}

export default Maze