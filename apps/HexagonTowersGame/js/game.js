var gameField;
var gameF = true;

var EMPTY_FIELD = 0;
var CELL_PLAYER_1_TOWER = 1;
var CELL_PLAYER_1_FIELD = 2;
var CELL_PLAYER_2_TOWER = 3;
var CELL_PLAYER_2_FIELD = 4;
var CELL_WATER = 5;
var CELL_MOUNTAIN = 6;
var CELL_PLAYER_1_MOUNTAIN = 7;
var CELL_PLAYER_2_MOUNTAIN = 8;
var CELL_PLAYER_1_WATER = 9;
var CELL_PLAYER_2_WATER = 10;

function HexagonGrid(canvasId, radius, gameField, redPlayerCode, isDebug) {
    this.radius = radius;

    this.height = Math.sqrt(3) * radius;
    this.width = 2 * radius;
    this.side = (3 / 2) * radius;

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');

    this.canvasOriginX = 1;
    this.canvasOriginY = 1;

    this.canvas.addEventListener("mousedown", this.clickEvent.bind(this), false);

    this.gameField = gameField;
    this.redPlayerCode = redPlayerCode;

    this.isDebug = isDebug;

    this.init();
    this.drawHexGrid();
}
;

HexagonGrid.prototype.init = function () {
    gameField["field"] = [];
    for (var y = 0; y < gameField.height; y++) {
        var row = [];
        for (var x = 0; x < gameField.width; x++) {
            row.push(0);
        }
        gameField.field.push(row);
    }
    for (var col = 0; col < gameField.field.length; col++) {
        for (var row = 0; row < gameField.field[col].length; row++) {
            if ((col + 1) === gameField.player1.col && (row + 1) === gameField.player1.row) {
                gameField.field[col][row] = 1;
                this.doMarkAroundUs(col, row, 1);
            } else if ((col + 1) === gameField.player2.col && (row + 1) === gameField.player2.row) {
                gameField.field[col][row] = 2;
                this.doMarkAroundUs(col, row, 2);
            }
        }
    }
};

HexagonGrid.prototype.drawHexGrid = function () {
    var currentHexX;
    var currentHexY;
    var debugText = "";

    var offsetColumn = false;

    for (var col = 0; col < gameField.field.length; col++) {
        for (var row = 0; row < gameField.field[col].length; row++) {
            if (!offsetColumn) {
                currentHexX = (col * this.side) + this.canvasOriginX;
                currentHexY = (row * this.height) + this.canvasOriginY;
            } else {
                currentHexX = col * this.side + this.canvasOriginX;
                currentHexY = (row * this.height) + this.canvasOriginY + (this.height * 0.5);
            }

            if (this.isDebug) {
                debugText = col + "," + row;
            }

            this.drawHex(currentHexX, currentHexY, this.getColor(col, row), debugText);
        }
        offsetColumn = !offsetColumn;
    }
    // Output statistics...
    $("#player").html("Player: " + (player == 1 ? "<font color='#080'>Green</font>" : "<font color='#800'>Red</font>"));
    $("#turnN").text(turnN);
    $("#turnsMax").text(gameField.maxTurns);
    $("#turnsLeft").text(gameField.maxTurns - turnN);
    $("#player1Cells").text(this.getCount(1));
    $("#player2Cells").text(this.getCount(2));
    $("#freeCells").text(this.getFreeCount());
    var winsMark = "=";
    if (this.getCount(1) > this.getCount(2)) {
        winsMark = ">";
    }
    if (this.getCount(1) < this.getCount(2)) {
        winsMark = "<";
    }
    var str = "<table>";
    for (var i = 0; i < gameField.history.length; i++) {
        str += "<tr style='border: 1px solid'><td>Ход № " + (i + 1) + "</td><td>&nbsp; Игрок: " + gameField.history[i].player + "</td><td>&nbsp;Клетка: " + (gameField.history[i].col + 1) + "-" + gameField.history[i].row + "</td></tr>";
    }
    str += "</table>";
    $("#history").html(str);

    $("#winsMark").text(winsMark);
};

HexagonGrid.prototype.getColor = function (col, row) {
    var result = "#ddd";
    switch (gameField.field[col][row]) {
        case 0: //EMPTY_FIELD
            result = "#999";
            break;
        case 1: // PLAYER_1_TOWER
            result = "#080";
            break;
        case 2: // PLAYER_2_TOWER
            result = "#800";
            break;
        case 3: // PLAYER_1_FIELD
            result = "#0f0";
            break;
        case 4: // PLAYER_2_FIELD
            result = "#f00";
            break;
        case 5: // Водоем
            result = "#00f";
            break;
        case 6: // Гора
            result = "#c50";
            break;
        case 7: // PLAYER_1_MOUNTAIN
            result = "#8EA200";
            break;
        case 8: // PLAYER_2_MOUNTAIN
            result = "#BF9030";
            break;
        case 9: // PLAYER_1_WATER
            result = "#086FA1";
            break;
        case 10: // PLAYER_2_WATER
            result = "#7E07A9";
            break;
    }
    return result;
};

var turnN = 1;
var player = 1;
HexagonGrid.prototype.doTurn = function (col, row) {
    var result = false;
    var cellValue = gameField.field[col][row];
    if ((cellValue === 0 || cellValue === 3 || cellValue === 4) &&
            this.checkMineNearBy(col, row, player)) { // Empty and at least one mine near by
        // Mark as mine...
        cellValue = player;
        // Mark around us...
        this.doMarkAroundUs(col, row, player);
        // Add to history
        gameField.history.push({
            player: player,
            col: col,
            row: row});
        turnN++;
        result = true;
        // Next player...
        if (player === 1)
            player = 2;
        else
            player = 1;
    }
    gameField.field[col][row] = cellValue;
    return result;
};

HexagonGrid.prototype.doMarkAroundUs = function (col, row, player) {
    if (col % 2 === 0) {
        this.doMarkCell(col - 0, row - 1, player);
        this.doMarkCell(col + 1, row - 1, player);
        this.doMarkCell(col + 1, row - 0, player);
        this.doMarkCell(col + 0, row + 1, player);
        this.doMarkCell(col - 1, row - 0, player);
        this.doMarkCell(col - 1, row - 1, player);
    } else {
        this.doMarkCell(col - 0, row - 1, player);
        this.doMarkCell(col + 1, row - 0, player);
        this.doMarkCell(col + 1, row + 1, player);
        this.doMarkCell(col + 0, row + 1, player);
        this.doMarkCell(col - 1, row + 0, player);
        this.doMarkCell(col - 1, row + 1, player);
    }
};

HexagonGrid.prototype.doMarkCell = function (col, row, player) {
    if (col >= 0 && row >= 0 &&
            col < gameField.field.length && row < gameField.field[col].length &&
            (gameField.field[col][row] === 0 || gameField.field[col][row] === 3 || gameField.field[col][row] === 4)) {
        gameField.field[col][row] = player + 2;
    }
    if (col >= 0 && row >= 0 &&
            col < gameField.field.length && row < gameField.field[col].length && player == 1 &&
            (gameField.field[col][row] === 6)) {
        gameField.field[col][row] = CELL_PLAYER_1_MOUNTAIN;
    }
    if (col >= 0 && row >= 0 &&
            col < gameField.field.length && row < gameField.field[col].length && player == 2 &&
            (gameField.field[col][row] === 6)) {
        gameField.field[col][row] = CELL_PLAYER_2_MOUNTAIN;
    }
    if (col >= 0 && row >= 0 &&
            col < gameField.field.length && row < gameField.field[col].length && player == 1 &&
            (gameField.field[col][row] === 5)) {
        gameField.field[col][row] = CELL_PLAYER_1_WATER;
    }
    if (col >= 0 && row >= 0 &&
            col < gameField.field.length && row < gameField.field[col].length && player == 2 &&
            (gameField.field[col][row] === 5)) {
        gameField.field[col][row] = CELL_PLAYER_2_WATER;
    }
};

HexagonGrid.prototype.checkMineNearBy = function (col, row, player) {
    var result = false;
    if (col % 2 === 0) {
        if (this.doCheckCell(col - 0, row - 1, player))
            result = true;
        if (this.doCheckCell(col + 1, row - 1, player))
            result = true;
        if (this.doCheckCell(col + 1, row - 0, player))
            result = true;
        if (this.doCheckCell(col + 0, row + 1, player))
            result = true;
        if (this.doCheckCell(col - 1, row - 0, player))
            result = true;
        if (this.doCheckCell(col - 1, row - 1, player))
            result = true;
    } else {
        if (this.doCheckCell(col - 0, row - 1, player))
            result = true;
        if (this.doCheckCell(col + 1, row - 0, player))
            result = true;
        if (this.doCheckCell(col + 1, row + 1, player))
            result = true;
        if (this.doCheckCell(col + 0, row + 1, player))
            result = true;
        if (this.doCheckCell(col - 1, row + 0, player))
            result = true;
        if (this.doCheckCell(col - 1, row + 1, player))
            result = true;
    }
    return result;
};

HexagonGrid.prototype.doCheckCell = function (col, row, player) {
    var result = false;
    if (col >= 0 && row >= 0 && col < gameField.field.length && row < gameField.field[col].length &&
            (gameField.field[col][row] === player || gameField.field[col][row] === player + 2)) {
        result = true;
    }
    return result;
};

HexagonGrid.prototype.getFreeCount = function () {
    var result = 0;
    for (var col = 0; col < gameField.field.length; col++) {
        for (var row = 0; row < gameField.field[col].length; row++) {
            if (gameField.field[col][row] === 0) {
                result++;
            }
        }
    }
    return result;
};

HexagonGrid.prototype.getCount = function (player) {
    var result = 0;
    for (var col = 0; col < gameField.field.length; col++) {
        for (var row = 0; row < gameField.field[col].length; row++) {
            if (gameField.field[col][row] === player || gameField.field[col][row] === player + 2 || gameField.field[col][row] === player + 6 || gameField.field[col][row] === player + 8) {
                result++;
            }
        }
    }
    return result;
};

HexagonGrid.prototype.drawHexAtColRow = function (column, row, color) {
    var drawy = column % 2 == 0 ? (row * this.height) + this.canvasOriginY : (row * this.height) + this.canvasOriginY + (this.height / 2);
    var drawx = (column * this.side) + this.canvasOriginX;

    this.drawHex(drawx, drawy, color, "");
};

HexagonGrid.prototype.drawHex = function (x0, y0, fillColor, debugText) {
    this.context.strokeStyle = "#000";
    this.context.beginPath();
    this.context.moveTo(x0 + this.width - this.side, y0);
    this.context.lineTo(x0 + this.side, y0);
    this.context.lineTo(x0 + this.width, y0 + (this.height / 2));
    this.context.lineTo(x0 + this.side, y0 + this.height);
    this.context.lineTo(x0 + this.width - this.side, y0 + this.height);
    this.context.lineTo(x0, y0 + (this.height / 2));

    if (fillColor) {
        this.context.fillStyle = fillColor;
        this.context.fill();
    }

    this.context.closePath();
    this.context.stroke();

    if (debugText) {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(debugText, x0 + (this.width / 2) - (this.width / 4), y0 + (this.height - 5));
    }
};

//Recusivly step up to the body to calculate canvas offset.
HexagonGrid.prototype.getRelativeCanvasOffset = function () {
    var x = 0, y = 0;
    var layoutElement = this.canvas;
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);

        return {x: x, y: y};
    }
};

HexagonGrid.prototype.clickEvent = function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;

    var tile = this.getSelectedTile(localX, localY);
    if (tile.column >= 0 && tile.row >= 0) {
        if (gameF && gameField.maxTurns - turnN > 0) {
            if (this.doTurn(tile.column, tile.row)) {
                switch (this.redPlayerCode) {
                    case 1: // Computer game...
                        gameF = this.doComputerTurn();
                        break;
                }

                this.drawHexGrid();
                if (gameField.maxTurns - turnN <= 0) {
                    this.printResults();
                }
            }
        } else {
            this.printResults();
        }
    }
};
//Uses a grid overlay algorithm to determine hexagon location
//Left edge of grid has a test to acuratly determin correct hex
HexagonGrid.prototype.getSelectedTile = function (mouseX, mouseY) {

    var offSet = this.getRelativeCanvasOffset();

    mouseX -= offSet.x;
    mouseY -= offSet.y;

    var column = Math.floor((mouseX) / this.side);
    var row = Math.floor(
            column % 2 == 0
            ? Math.floor((mouseY) / this.height)
            : Math.floor(((mouseY + (this.height * 0.5)) / this.height)) - 1);

    //Test if on left side of frame            
    if (mouseX > (column * this.side) && mouseX < (column * this.side) + this.width - this.side) {

        //Now test which of the two triangles we are in 
        //Top left triangle points
        var p1 = new Object();
        p1.x = column * this.side;
        p1.y = column % 2 == 0
                ? row * this.height
                : (row * this.height) + (this.height / 2);

        var p2 = new Object();
        p2.x = p1.x;
        p2.y = p1.y + (this.height / 2);

        var p3 = new Object();
        p3.x = p1.x + this.width - this.side;
        p3.y = p1.y;

        var mousePoint = new Object();
        mousePoint.x = mouseX;
        mousePoint.y = mouseY;

        if (this.isPointInTriangle(mousePoint, p1, p2, p3)) {
            column--;

            if (column % 2 != 0) {
                row--;
            }
        }

        //Bottom left triangle points
        var p4 = new Object();
        p4 = p2;

        var p5 = new Object();
        p5.x = p4.x;
        p5.y = p4.y + (this.height / 2);

        var p6 = new Object();
        p6.x = p5.x + (this.width - this.side);
        p6.y = p5.y;

        if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
            column--;

            if (column % 2 == 0) {
                row++;
            }
        }
    }

    return  {row: row, column: column};
};


HexagonGrid.prototype.sign = function (p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};

//TODO: Replace with optimized barycentric coordinate method
HexagonGrid.prototype.isPointInTriangle = function isPointInTriangle(pt, v1, v2, v3) {
    var b1, b2, b3;

    b1 = this.sign(pt, v1, v2) < 0.0;
    b2 = this.sign(pt, v2, v3) < 0.0;
    b3 = this.sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
};

HexagonGrid.prototype.doComputerTurn = function () {
    var result = false;

    //Get list of nearest of mine cells (0)
    var freeNearCells = [];
    for (var col = 0; col < gameField.field.length; col++) {
        for (var row = 0; row < gameField.field[col].length; row++) {
            if (gameField.field[col][row] === 0 && this.checkMineNearBy(col, row, 2)) {
                freeNearCells.push({col: col, row: row});
            }
        }
    }

    if (freeNearCells.length > 0) {
        var n = Math.floor(Math.random() * freeNearCells.length);
        result = this.doTurn(freeNearCells[n].col, freeNearCells[n].row);
    } else {
        //Get list of nearest with border of mine cells (4)
        var borderNearCells = [];
        for (var col = 0; col < gameField.field.length; col++) {
            for (var row = 0; row < gameField.field[col].length; row++) {
                if (gameField.field[col][row] === 4 && this.checkMineNearBy(col, row, 1)) {
                    borderNearCells.push({col: col, row: row});
                }
            }
        }
        if (borderNearCells.length > 0) {
            var n = Math.floor(Math.random() * borderNearCells.length);
            result = this.doTurn(borderNearCells[n].col, borderNearCells[n].row);
        } else {
            //Get list of mine cells (4)
            var mineCells = [];
            for (var col = 0; col < gameField.field.length; col++) {
                for (var row = 0; row < gameField.field[col].length; row++) {
                    if (gameField.field[col][row] === 4) {
                        mineCells.push({col: col, row: row});
                    }
                }
            }
            if (mineCells.length > 0) {
                var n = Math.floor(Math.random() * mineCells.length);
                result = this.doTurn(mineCells[n].col, mineCells[n].row);
            } else {
                // Check other variants...
                // Game over.... I have no cells to turn...
            }
        }
    }
    return result;
};

function downloadData(gameField) {
    var rows = [];
    //rows[0] = "";
    rows[0] = gameField.field.length + " " + gameField.field.length + " " + gameField.maxTurns + " " + gameField.mode;
    rows[1] = "P: " + gameField.player1.col + " - " + gameField.player1.row + " | " + gameField.player2.col + " - " + gameField.player2.row;
    rows[2] = "W: ";
    rows[3] = "M: ";
    for (var col = 0; col < gameField.field.length; col++) {
        for (var row = 0; row < gameField.field[col].length; row++) {
            if (gameField.field[col][row] === CELL_WATER || gameField.field[col][row] === CELL_PLAYER_1_WATER || gameField.field[col][row] === CELL_PLAYER_2_WATER) {
                rows[2] += (col + 1) + " - " + (row + 1) + " | ";
            }
            if (gameField.field[col][row] === CELL_MOUNTAIN || gameField.field[col][row] === CELL_PLAYER_1_MOUNTAIN || gameField.field[col][row] === CELL_PLAYER_2_MOUNTAIN) {
                rows[3] += (col + 1) + " - " + (row + 1) + " | ";
            }
        }
    }

    for (var i = 4; i < gameField.history.length; i++) {
        rows[i] = "Ход " + (i - 3) + ": x = " + gameField.history[i - 3].col + "   y = " + gameField.history[i - 3].row;
    }
    var data = rows.join("\r\n");
    var blob = new Blob([data], {type: 'text'});
    var link = document.createElement("a");
    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "history");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

HexagonGrid.prototype.printResults = function () {
    var cellsA = this.getCount(1);
    var cellsB = this.getCount(2);
    if (cellsA == cellsB) {
        //$("#player").html("Game over!!! No player wins!!!");
        alert("Game over!!! No player wins!!!");
    }
    if (cellsA > cellsB) {
        //$("#player").html("Game over!!! <font color='#080'>Green</font> player wins!!!");
        alert("Game over!!! Green player wins!!!");
    }
    if (cellsA < cellsB) {
        //$("#player").html("Game over!!! <font color='#800'>Red</font> player wins!!!");
        alert("Game over!!! Red player wins!!!");
    }
};
