const scale = 20;

const canvasGame = document.getElementById("canvasGame");
const ctxGame = canvasGame.getContext('2d');

ctxGame.scale(scale, scale);

const canvasNext = document.getElementById("canvasNext");
const ctxNext = canvasNext.getContext('2d');
ctxNext.scale(scale, scale);

const tWidth = canvasGame.width / scale;
const tHeight = canvasGame.height / scale;

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

let board = [];

let rand = Math.floor(Math.random() * blocks.length);
let next = Math.floor(Math.random() * blocks.length);

const gameArea = {
    state: 0, // 0 - Paused, 1 - play, 2 - finished.
    x: 4,
    y: 1,
    block: null,
    color: null
}

rand = Math.floor(Math.random() * blocks.length);
gameArea.block = blocks[rand];
gameArea.color = colors[rand + 1];

var totalBlocks = 0;
var totalRows = 0;

function initGame() {
    board = [];

    const r = new Array(tWidth + 2).fill(1);
    board.push(r);

    for (let i = 0; i < tHeight; i++) {
        let row = new Array(tWidth).fill(0);
        row.push(1);
        row.unshift(1);

        board.push(row);
    }

    board.push(r);
    board.push(r);

    totalRows = 0;
    totalBlocks = 0;
    document.getElementById('score').innerHTML = totalBlocks + "/" + totalRows;
}

function drawBoard(block, x, y) {
    for (let i = 0; i < block.length; i++) {
        for (let j = 0; j < block[i].length; j++) {
            if (block[i][j]) {
                ctxGame.fillRect(x + j, y + i, 1, 1);
            }
        }
    }
}

function drawNext(block, x, y) {
    for (let i = 0; i < block.length; i++) {
        for (let j = 0; j < block[i].length; j++) {
            if (block[i][j]) {
                ctxNext.fillRect(x + j, y + i, 1, 1);
            }
        }
    }
}

function rotateBlock(block, direction) {
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
}


function putBlock(block, x, y) {
    for (let i = 0; i < block.length; i++) {
        for (let j = 0; j < block[i].length; j++) {
            board[y + i + 1][x + j + 1] = board[y + i + 1][x + j + 1] || block[i][j];
        }
    }
}

function checkCollision(player, arena) {
    for (let i = 0; i < player.block.length; i++) {
        for (let j = 0; j < player.block[i].length; j++) {
            if (player.block[i][j] &&
                    arena[player.y + i + 1][player.x + j + 1]) {
                return 1;
            }
        }
    }

    return 0;
}
function clearBlocks() {
    for (let i = 1; i < board.length - 2; i++) {
        let clear = 1;

        for (let j = 1; j < board[i].length - 1; j++) {
            if (!board[i][j]) {
                clear = 0;
            }
        }

        if (clear) {
            let r = new Array(tWidth).fill(0);
            r.push(1);
            r.unshift(1);

            board.splice(i, 1);
            board.splice(1, 0, r);

            totalRows++;
            document.getElementById('score').innerHTML = totalBlocks + "/" + totalRows;
        }
    }
}

function drawBlocks() {
    for (let i = 1; i < board.length - 2; i++) {
        for (let j = 1; j < board[i].length - 1; j++) {
            if (board[i][j]) {
                ctxGame.fillStyle = colors[board[i][j]];
                ctxGame.fillRect(j - 1, i - 1, 1, 1);
            }
        }
    }
}

function checkGameOver() {
    for (let j = 1; j < board[1].length - 1; j++) {
        if (board[1][j]) {
            gameArea.state = 2;            
            document.getElementById("startGame").style.display = "block";
            //initGame();
        }
    }
}

let interval = 1000;
let lastTime = 0;
let count = 0;

function updateCanvas(time = 0) {
    if (gameArea.state == 1) {
        const dt = time - lastTime;
        lastTime = time;
        count += dt;

        if (count >= interval) {
            gameArea.y++;
            count = 0;
        }

        if (checkCollision(gameArea, board)) {
            totalBlocks++;

            putBlock(gameArea.block, gameArea.x, gameArea.y - 1);
            clearBlocks();
            checkGameOver();

            gameArea.y = 1;
            gameArea.x = 4;

            rand = next;
            next = Math.floor(Math.random() * blocks.length);
            gameArea.block = blocks[rand];
            gameArea.color = colors[rand + 1];

            interval = 1000;
            document.getElementById('score').innerHTML = totalBlocks + "/" + totalRows;
        }

        ctxGame.fillStyle = "#000";
        ctxGame.fillRect(0, 0, canvasGame.width, canvasGame.height);

        drawBlocks();
        ctxGame.fillStyle = gameArea.color;
        drawBoard(gameArea.block, gameArea.x, gameArea.y);
        ctxNext.fillStyle = '#000000';
        ctxNext.fillRect(0, 0, 4, 4);
        ctxNext.fillStyle = colors[next + 1];
        drawNext(blocks[next], 0, 0);
    }
    requestAnimationFrame(updateCanvas);
}

document.addEventListener("keydown", event => {
    if (event.keyCode === 37 && interval - 1) { // <-
        gameArea.x--;
        if (checkCollision(gameArea, board)) {
            gameArea.x++;
        }
    } else if (event.keyCode === 39 && interval - 1) { // ->
        gameArea.x++;
        if (checkCollision(gameArea, board)) {
            gameArea.x--;
        }
    } else if (event.keyCode === 40) { // down
        gameArea.y++;
        count = 0;
    } else if (event.keyCode === 38) { // up
        gameArea.block = rotateBlock(gameArea.block, 1);
        if (checkCollision(gameArea, board)) {
            gameArea.block = rotateBlock(gameArea.block, -1);
        }
    } else if (event.keyCode === 32) { // space
        interval = 1;
    }

    event.preventDefault();
});

function doStart(){
    gameArea.state = 1;
    initGame();
    updateCanvas();
    document.getElementById("gameBoard").style.display = "block";
    document.getElementById("startGame").style.display = "none";
}
