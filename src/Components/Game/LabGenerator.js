export class LabGenerator {
    constructor(width, height) {
        this.rows = height * 2 + 1;
        this.cols = width * 2 + 1;

        this.grid = Array.from({ length: this.rows }, () =>
            Array(this.cols).fill(1)
        );
    }

    generateMaze() {
        this.#carvePath(1, 1);

        this.grid[1][0] = 0;
        this.grid[this.rows - 2][this.cols - 1] = 0; 
    }

    #carvePath(x, y) {
        this.grid[y][x] = 0;

        const directions = this.#shuffle([
            [0, -2], 
            [2, 0],  
            [0, 2],  
            [-2, 0], 
        ]);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (this.#isInBounds(nx, ny) && this.grid[ny][nx] === 1) {
                this.grid[y + dy / 2][x + dx / 2] = 0;
                this.#carvePath(nx, ny);
            }
        }
    }

    #isInBounds(x, y) {
        return x > 0 && x < this.cols - 1 && y > 0 && y < this.rows - 1;
    }

    #shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    render() {
        console.log(this.grid)
    }
}
