const scale = 20;

const blocks = [
    [
        [1, 1],
        [1, 1],
    ],
    [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
    ],
    [
        [3, 3, 0],
        [0, 3, 3],
        [0, 0, 0]
    ],
    [
        [0, 4, 4],
        [4, 4, 0],
        [0, 0, 0]
    ],
    [
        [5, 0, 0],
        [5, 0, 0],
        [5, 5, 0]
    ],
    [
        [0, 0, 6],
        [0, 0, 6],
        [0, 6, 6]
    ],
    [
        [7, 7, 7],
        [0, 7, 0],
        [0, 0, 0]
    ]
];
const colors = [
    null,
    '#FFD300',
    '#FF0000',
    '#FF8C00',
    '#4166FF',
    '#0000FF',
    '#00FF00',
    '#DF00FF'
];

var sequence = [];
function getBlock(n) {
    while (sequence.length < n + 1) {
        r = Math.floor(Math.random() * blocks.length);
        sequence.push(r);
    }

    return sequence[n];
}

function getGameArea(arenaCanvasId, nextCanvasId, stateDivId) {
    const canvasGame = document.getElementById(arenaCanvasId);
    const ctxGame = canvasGame.getContext('2d');

    ctxGame.scale(scale, scale);

    const canvasNext = document.getElementById(nextCanvasId);
    const ctxNext = canvasNext.getContext('2d');
    ctxNext.scale(scale, scale);

    const tWidth = canvasGame.width / scale;
    const tHeight = canvasGame.height / scale;

    var gameArea = {
        state: 0, // 0 - Paused, 1 - play, 2 - finished.
        level: 0,

        ctxGame: ctxGame,
        ctxNext: ctxNext,
        tWidth: tWidth,
        tHeight: tHeight,
        stateDivId: stateDivId,
        animationId: null,

        x: 4,
        y: 1,
        block: null,
        color: null,
        board: [],
        blockN: 0,
        totalRows: 0,
        interval: 1000,
        lastTime: 0,
        count: 0,
        currBlock: 0,
        nextBlock: 0,

        initGame: function () {
            this.board = [];
            this.state = 1;
            this.level = 0;
            this.interval = 1000;
            this.x = 4;
            this.y = 1;

            const r = new Array(tWidth + 2).fill(1);
            this.board.push(r);

            for (let i = 0; i < tHeight; i++) {
                let row = new Array(tWidth).fill(0);
                row.push(1);
                row.unshift(1);

                this.board.push(row);
            }

            this.board.push(r);
            this.board.push(r);

            this.totalRows = 0;
            this.blockN = 0;
            document.getElementById(this.stateDivId).innerHTML =
                    "B: " + this.blockN + "<br>"
                    + "R: " + this.totalRows + "<br>"
                    + "L: " + this.level;

            this.currBlock = getBlock(this.blockN);
            this.block = blocks[this.currBlock];
            this.color = colors[this.currBlock + 1];
            this.nextBlock = getBlock(this.blockN + 1);
        },

        updateCanvas: function (time = 0) {
            if (this.state == 1) {
                const dt = time - this.lastTime;
                this.lastTime = time;
                this.count += dt;

                if (this.count >= this.interval) {
                    this.y++;
                    this.count = 0;
                }

                if (this.checkCollision(this, this.board)) {
                    this.blockN++;

                    this.putBlock(this.block, this.x, this.y - 1);
                    this.clearBlocks();
                    checkGameOver();

                    this.y = 1;
                    this.x = 4;

                    this.currBlock = this.nextBlock;
                    this.nextBlock = getBlock(this.blockN + 1);
                    this.block = blocks[this.currBlock];
                    this.color = colors[this.currBlock + 1];

                    this.interval = 1000 - 100 * this.level;
                    document.getElementById(this.stateDivId).innerHTML =
                            "B: " + this.blockN + "<br>"
                            + "R: " + this.totalRows + "<br>"
                            + "L: " + this.level;
                }

                this.ctxGame.fillStyle = "#000";
                this.ctxGame.fillRect(0, 0, canvasGame.width, canvasGame.height);

                this.drawBlocks();
                this.ctxGame.fillStyle = this.color;
                this.drawBoard(this.block, this.x, this.y);
                ctxNext.fillStyle = '#000000';
                ctxNext.fillRect(0, 0, 4, 4);
                ctxNext.fillStyle = colors[this.nextBlock + 1];
                this.drawNext(blocks[this.nextBlock], 0, 0);
            }
            this.animationId = requestAnimationFrame(this.updateCanvas.bind(this));
        },

        drawBoard: function (block, x, y) {
            for (let i = 0; i < block.length; i++) {
                for (let j = 0; j < block[i].length; j++) {
                    if (block[i][j]) {
                        this.ctxGame.fillRect(x + j, y + i, 1, 1);
                    }
                }
            }
        },

        drawNext: function (block, x, y) {
            for (let i = 0; i < block.length; i++) {
                for (let j = 0; j < block[i].length; j++) {
                    if (block[i][j]) {
                        ctxNext.fillRect(x + j, y + i, 1, 1);
                    }
                }
            }
        },

        rotateBlock: function (block, direction) {
            let newBlock = [];

            for (let i in block) {
                newBlock.push([]);
            }

            if (direction === 1) {
                for (let i = 0; i < block.length; i++) {
                    for (let j = 0; j < block[i].length; j++) {
                        newBlock[j][block.length - i - 1] = block[i][j];
                    }
                }
            } else {
                for (let i = 0; i < block.length; i++) {
                    for (let j = 0; j < block[i].length; j++) {
                        newBlock[block.length - j - 1][i] = block[i][j];
                    }
                }
            }

            return newBlock;
        },

        putBlock: function (block, x, y) {
            for (let i = 0; i < block.length; i++) {
                for (let j = 0; j < block[i].length; j++) {
                    this.board[y + i + 1][x + j + 1] = this.board[y + i + 1][x + j + 1] || block[i][j];
                }
            }
        },

        checkCollision: function (player, arena) {
            for (let i = 0; i < player.block.length; i++) {
                for (let j = 0; j < player.block[i].length; j++) {
                    if (player.block[i][j] &&
                            arena[player.y + i + 1][player.x + j + 1]) {
                        return 1;
                    }
                }
            }
            return 0;
        },

        clearBlocks: function () {
            for (let i = 1; i < this.board.length - 2; i++) {
                let clear = 1;

                for (let j = 1; j < this.board[i].length - 1; j++) {
                    if (!this.board[i][j]) {
                        clear = 0;
                    }
                }

                if (clear) {
                    let r = new Array(tWidth).fill(0);
                    r.push(1);
                    r.unshift(1);

                    this.board.splice(i, 1);
                    this.board.splice(1, 0, r);

                    if (++this.totalRows % 10 == 0) {
                        if (this.level < 9) {
                            this.level++;
                        }
                    }
                    document.getElementById(this.stateDivId).innerHTML =
                            "B: " + this.blockN + "<br>"
                            + "R: " + this.totalRows + "<br>"
                            + "L: " + this.level;
                }
            }
        },

        drawBlocks: function () {
            for (let i = 1; i < this.board.length - 2; i++) {
                for (let j = 1; j < this.board[i].length - 1; j++) {
                    if (this.board[i][j]) {
                        this.ctxGame.fillStyle = colors[this.board[i][j]];
                        this.ctxGame.fillRect(j - 1, i - 1, 1, 1);
                    }
                }
            }
        }
    };

    return gameArea;
}

var gameAreaL = getGameArea("arenaL", "nextL", 'scoreL');
var gameAreaR = getGameArea("arenaR", "nextR", 'scoreR');

function checkGameOver() {
    for (let j = 1; j < gameAreaL.board[1].length - 1; j++) {
        if (gameAreaL.board[1][j]) {
            gameAreaL.state = 2;
            cancelAnimationFrame(gameAreaL.animationId);
            if (gameAreaR.state == 2) {
                document.getElementById("startGame").style.display = "block";
            }
            //initGame();
        }
    }

    for (let j = 1; j < gameAreaR.board[1].length - 1; j++) {
        if (gameAreaR.board[1][j]) {
            gameAreaR.state = 2;
            cancelAnimationFrame(gameAreaR.animationId);
            if (gameAreaL.state == 2) {
                document.getElementById("startGame").style.display = "block";
            }
            //initGame();
        }
    }
}

document.addEventListener("keydown", event => {
    if (event.keyCode === 65 && gameAreaL.interval - 1) { // <-
        gameAreaL.x--;
        if (gameAreaL.checkCollision(gameAreaL, gameAreaL.board)) {
            gameAreaL.x++;
        }
    } else if (event.keyCode === 68 && gameAreaL.interval - 1) { // ->
        gameAreaL.x++;
        if (gameAreaL.checkCollision(gameAreaL, gameAreaL.board)) {
            gameAreaL.x--;
        }
    } else if (event.keyCode === 83) { // down
        gameAreaL.y++;
        gameAreaL.count = 0;
    } else if (event.keyCode === 87) { // up
        gameAreaL.block = gameAreaL.rotateBlock(gameAreaL.block, 1);
        if (gameAreaL.checkCollision(gameAreaL, gameAreaL.board)) {
            gameAreaL.block = gameAreaL.rotateBlock(gameAreaL.block, -1);
        }
    } else if (event.keyCode === 81) { // space
        gameAreaL.interval = 1;
    }

    // -----
    if (event.keyCode === 37 && gameAreaR.interval - 1) { // <-
        gameAreaR.x--;
        if (gameAreaR.checkCollision(gameAreaR, gameAreaR.board)) {
            gameAreaR.x++;
        }
    } else if (event.keyCode === 39 && gameAreaR.interval - 1) { // ->
        gameAreaR.x++;
        if (gameAreaR.checkCollision(gameAreaR, gameAreaR.board)) {
            gameAreaR.x--;
        }
    } else if (event.keyCode === 40) { // down
        gameAreaR.y++;
        gameAreaR.count = 0;
    } else if (event.keyCode === 38) { // up
        gameAreaR.block = gameAreaR.rotateBlock(gameAreaR.block, 1);
        if (gameAreaR.checkCollision(gameAreaR, gameAreaR.board)) {
            gameAreaR.block = gameAreaR.rotateBlock(gameAreaR.block, -1);
        }
    } else if (event.keyCode === 32) { // space
        gameAreaR.interval = 1;
    }

    event.preventDefault();
});

function doStart() {
    sequence = [];

    gameAreaL.initGame();
    gameAreaL.updateCanvas();

    gameAreaR.initGame();
    gameAreaR.updateCanvas();

    document.getElementById("gameBoard").style.display = "block";
    document.getElementById("startGame").style.display = "none";
}
