// --- Template strings for DOM generation ---
var divSquare = '<div id="s$y_$x" class="square $color"></div>';
var divFigure = '<div id="f$y_$x" class="figure">$figure</div>';
var divButton = '<div>&#183;</div>';

// --- Game state (replaces PHP $_SESSION) ---
var gameState = {
    board: [],
    figurePlayer: '&#x2658;',   // white knight
    figureOpponent: '&#x265E;', // black knight
    state: 'play',              // 'play', 'win', 'loss'
    history: [],                // array of {y, x, figure}
    buttons: []                 // array of {y, x} — valid next moves
};

// --- Knight move offsets (8 L-shapes) ---
var knightMoves = [
    [-2,  1],   // ** /  * /  *
    [-1,  2],   //   * / ***
    [ 1,  2],   // *** /   *
    [ 2,  1],   // *     / *  / **
    [ 2, -1],   //  *    /  * / **
    [ 1, -2],   // ***   / *
    [-1,-2],    // *     / ***
    [-2,-1]     // **    /  * /  *
];

// --- Board initialization ---
function initGame(playerFigure, opponentFigure) {
    // Build 8x8 alternating board
    gameState.board = [];
    for (var y = 0; y < 8; y++) {
        gameState.board[y] = [];
        for (var x = 0; x < 8; x++) {
            gameState.board[y][x] = (y + x) % 2 === 0 ? 'black' : 'white';
        }
    }

    // Unicode chess knights
    gameState.figurePlayer = playerFigure || '&#x2658;';
    gameState.figureOpponent = opponentFigure || '&#x265E;';
    gameState.state = 'play';
    gameState.history = [];
    gameState.buttons = [];

    // First turn: every cell is valid
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            gameState.buttons.push({ y: y, x: x });
        }
    }
}

// --- Check if a cell has already been visited ---
function checkEmpty(y, x) {
    for (var i = 0; i < gameState.history.length; i++) {
        if (gameState.history[i].y === y && gameState.history[i].x === x) {
            return false;
        }
    }
    return true;
}

// --- Perform a turn: record move and compute next valid buttons ---
function doTurn(y, x, figure) {
    // Record this move in history
    gameState.history.push({ y: y, x: x, figure: figure });

    // Recompute valid moves from the new position
    gameState.buttons = [];
    for (var i = 0; i < knightMoves.length; i++) {
        var ny = y + knightMoves[i][0];
        var nx = x + knightMoves[i][1];

        // Check board bounds
        if (ny < 0 || ny >= 8 || nx < 0 || nx >= 8) continue;

        // Must be a valid cell and not yet visited
        if (checkEmpty(ny, nx)) {
            gameState.buttons.push({ y: ny, x: nx });
        }
    }
}

// --- Computer picks a random valid move ---
function doTurnComputer() {
    if (gameState.buttons.length > 0) {
        var n = Math.floor(Math.random() * gameState.buttons.length);
        doTurn(gameState.buttons[n].y, gameState.buttons[n].x, gameState.figureOpponent);
    }
}

// --- Player click handler: player move -> computer move -> check win/loss ---
function handlePlayerMove(y, x) {
    if (gameState.state !== 'play') return;

    // Player's turn
    doTurn(y, x, gameState.figurePlayer);

    // If computer can still move, it plays
    if (gameState.buttons.length > 0) {
        doTurnComputer();

        // After computer move: no buttons left means player has no moves next -> loss
        if (gameState.buttons.length === 0) {
            gameState.state = 'loss';
        }
    } else {
        // Player placed the last possible knight — player wins
        gameState.state = 'win';
    }

    renderBoard();
}

// --- Render the board from gameState ---
function renderBoard() {
    var $board = $(".board");
    $board.html("");

    // Draw squares
    for (var y = 0; y < gameState.board.length; y++) {
        for (var x = 0; x < gameState.board[y].length; x++) {
            $board.append(
                divSquare.replace('$y', y).replace('$x', x)
                    .replace('$color', gameState.board[y][x])
            );
        }
    }

    // Draw figures on visited cells
    var len = gameState.history.length;
    for (var i = 0; i < len; i++) {
        var h = gameState.history[i];
        // Show the actual unicode figure for the last 2 moves, filled square for older ones
        var symbol = (i >= len - 2) ? h.figure : '&#9632;';
        $("#s" + h.y + "_" + h.x).html(
            divFigure.replace('$y', h.y).replace('$x', h.x)
                .replace('$figure', symbol)
        );
    }

    // Highlight valid next moves with click handlers
    for (var i = 0; i < gameState.buttons.length; i++) {
        var by = gameState.buttons[i].y;
        var bx = gameState.buttons[i].x;
        var $sq = $("#s" + by + "_" + bx);

        if ($sq.length) {
            $sq.addClass("button");
            $sq.attr("data-y", by);
            $sq.attr("data-x", bx);
            $sq.html(divButton);
        }
    }

    // Attach click handlers (event delegation so they survive re-renders)
    $('.button').off('click').on('click', function () {
        var y = parseInt($(this).attr("data-y"));
        var x = parseInt($(this).attr("data-x"));
        handlePlayerMove(y, x);
    });

    // Update state text
    $('.state').html(gameState.state);
}

// --- New game handlers ---
$(function () {
    // Player starts with white knight (default)
    initGame('&#x2658;', '&#x265E;');
    renderBoard();

    // New game — player is white knight
    $('.newGameW').click(function () {
        initGame('&#x2658;', '&#x265E;');
        renderBoard();
    });

    // New game — player is black knight, computer moves first
    $('.newGameB').click(function () {
        initGame('&#x265E;', '&#x2658;');

        // Computer (white knight) makes the first move
        doTurnComputer();

        // If computer blocked itself immediately, player wins
        if (gameState.buttons.length === 0) {
            gameState.state = 'win';
        }

        renderBoard();
    });
});