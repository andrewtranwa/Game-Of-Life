class Automata {
    constructor(game) {
        Object.assign(this, { game });
        this.automata = [];
        this.height = 100;
        this.width = 100;
        this.tickCount = 0;
        this.ticks = 0;
        this.speed = 60; 

        this.automata = Array.from({length: this.width}, () => 
        Array.from({length: this.height}, () => 0));

        this.randomize();
        //this.loadAutomata();
    }

    //randomly assign living/dead cells for main array (automata)4.
    randomize() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = Math.floor(Math.random() * 2);
            }
        }
    };

    // count the number of living neighbors around a given cell
    count(col, row) {
        let count = 0;
        const rows = this.automata.length;
        const cols = this.automata[0].length; 
    
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) { //skip the cell itself 
                    continue;
                }
                const neighborCol = col + i;
                const neighborRow = row + j;
                if (neighborCol >= 0 && neighborCol < cols && neighborRow >= 0 && neighborRow < rows) { //check if in bounds
                    count += this.automata[neighborCol][neighborRow];
                }
            }
        }
        return count;
    }

    update() {
        this.speed = parseInt(document.getElementById("speed").value);
    
        let speedAdjustment = 120 - this.speed;
    
        if (this.tickCount++ >= speedAdjustment) {
            this.tickCount = 0;
            this.ticks++;
            
            let next = Array.from({ length: this.width }, () =>
                Array.from({ length: this.height }, () => 0)
            );

            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    const liveNeighbors = this.count(i, j);
                    next[i][j] = 0; 
                    if (this.automata[i][j] == 1 && (liveNeighbors === 2 || liveNeighbors === 3)) {
                        next[i][j] = 1;
                    } 
                    else if (this.automata[i][j] == 0 && liveNeighbors === 3) {
                        next[i][j] = 1;
                    }
                }
            }
            this.automata = next;
        }
        document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;
    }
    
    draw(ctx) {
        let cellSize = 8; 
        let gap = 1; 
    
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                if (this.automata[col][row] === 1) {
                    ctx.fillStyle = 'black';
                } else {
                    continue; 
                }
                ctx.fillRect(col * cellSize + gap, row * cellSize + gap, cellSize - 2 * gap, cellSize - 2 * gap);
            }
        }
    }
    







    //load unique automatas from solution
    addBlock(col, row) {
        this.automata[col][row] = 1;
        this.automata[col + 1][row] = 1;
        this.automata[col][row + 1] = 1;
        this.automata[col + 1][row + 1] = 1;
    };

    addHive(col, row, vert) {
        if (vert) {
            this.automata[col][row] = 1;
            this.automata[col + 1][row + 1] = 1;
            this.automata[col - 1][row + 1] = 1;
            this.automata[col + 1][row + 2] = 1;
            this.automata[col - 1][row + 2] = 1;
            this.automata[col][row + 3] = 1;
        } else {
            this.automata[col][row] = 1;
            this.automata[col + 1][row + 1] = 1;
            this.automata[col + 1][row - 1] = 1;
            this.automata[col + 2][row + 1] = 1;
            this.automata[col + 2][row - 1] = 1;
            this.automata[col + 3][row] = 1;
        }
    };

    addLoaf(col, row) {
        this.automata[col][row] = 1;
        this.automata[col + 1][row + 1] = 1;
        this.automata[col + 1][row - 1] = 1;
        this.automata[col + 2][row + 2] = 1;
        this.automata[col + 2][row - 1] = 1;
        this.automata[col + 3][row] = 1;
        this.automata[col + 3][row + 1] = 1;
    };

    addBoat(col, row) {
        this.automata[col][row] = 1;
        this.automata[col][row + 1] = 1;
        this.automata[col + 1][row] = 1;
        this.automata[col + 1][row + 2] = 1;
        this.automata[col + 2][row + 1] = 1;
    };


    addTub(col, row) {
        this.automata[col][row] = 1;
        this.automata[col + 1][row + 1] = 1;
        this.automata[col + 1][row - 1] = 1;
        this.automata[col + 2][row] = 1;
    };

    addBlinker(col, row, vert) {
        if (vert) {
            this.automata[col][row] = 1;
            this.automata[col][row + 1] = 1;
            this.automata[col][row + 2] = 1;
        } else {
            this.automata[col][row] = 1;
            this.automata[col + 1][row] = 1;
            this.automata[col + 2][row] = 1;
        }
    };

    addToad(col, row) {
        this.addBlinker(col, row);
        this.addBlinker(col + 1, row + 1);
    };

    addBeacon(col, row) {
        this.addBlock(col, row);
        this.addBlock(col + 2, row + 2);
    };

    addPulsar(col, row) {
        this.addBlinker(col, row, true);
        this.addBlinker(col + 5, row, true);
        this.addBlinker(col + 7, row, true);
        this.addBlinker(col + 12, row, true);
        this.addBlinker(col, row + 6, true);
        this.addBlinker(col + 5, row + 6, true);
        this.addBlinker(col + 7, row + 6, true);
        this.addBlinker(col + 12, row + 6, true);
        this.addBlinker(col + 2, row - 2, false);
        this.addBlinker(col + 2, row + 3, false);
        this.addBlinker(col + 2, row + 5, false);
        this.addBlinker(col + 2, row + 10, false);
        this.addBlinker(col + 8, row - 2, false);
        this.addBlinker(col + 8, row + 3, false);
        this.addBlinker(col + 8, row + 5, false);
        this.addBlinker(col + 8, row + 10, false);
    };

    addPenta(col, row) {
        this.automata[col][row] = 1;
        this.addBlinker(col - 1, row + 1);
        this.addBlinker(col - 2, row + 2);
        this.addBlinker(col, row + 2);
        this.addBlinker(col - 2, row + 9);
        this.addBlinker(col, row + 9);
        this.addBlinker(col - 1, row + 10);
        this.automata[col][row + 11] = 1;
    };

    addGosper(col, row) {
        this.addBlock(col, row);
        this.addBlinker(col + 10, row, true);
        this.automata[col + 11][row - 1] = 1;
        this.automata[col + 11][row + 3] = 1;
        this.automata[col + 12][row - 2] = 1;
        this.automata[col + 12][row + 4] = 1;
        this.automata[col + 13][row - 2] = 1;
        this.automata[col + 13][row + 4] = 1;
        this.automata[col + 14][row + 1] = 1;
        this.automata[col + 15][row - 1] = 1;
        this.automata[col + 15][row + 3] = 1;
        this.addBlinker(col + 16, row, true);
        this.automata[col + 17][row + 1] = 1;
        this.addBlinker(col + 20, row - 2, true);
        this.addBlinker(col + 21, row - 2, true);
        this.automata[col + 22][row - 3] = 1;
        this.automata[col + 22][row + 1] = 1;
        this.automata[col + 24][row - 3] = 1;
        this.automata[col + 24][row + 1] = 1;
        this.automata[col + 24][row - 4] = 1;
        this.automata[col + 24][row + 2] = 1;
        this.addBlock(col + 34, row - 2);
    };
    
    loadAutomata() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = 0;
            }
        }

        this.addBlock(10, 10);
        this.addHive(14, 11, false);
        this.addHive(21, 10, true);
        this.addTub(10, 15);
        this.addLoaf(15, 16);
        this.addBoat(21, 16);

        this.addBlinker(30, 11);
        this.addToad(35, 11);
        this.addBeacon(41, 10);
        this.addPulsar(48, 11);
        this.addPenta(68, 9);

        this.addGosper(10, 50);
    };

}