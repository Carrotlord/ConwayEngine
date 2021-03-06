/* @author Jiangcheng Oliver Chu */

/* See http://www.conwaylife.com/wiki/Main_Page for
 * info on Conway's Game of Life.
 */
 
/* Rules of Conway's Game of Life:
   http://www.conwaylife.com/wiki/Conway%27s_Game_of_Life
 */

var ALIVE = true;
var DEAD = false;

var g_grid;

var g_conwayTimeoutID = null;

function padStrings(strings) {
    var pad = function pad(string, nextLength) {
        if (string.length >= nextLength) {
            return string;
        }
        var padding = "";
        var neededChars = nextLength - string.length;
        for (var i = 0; i < neededChars; ++i) {
            padding += ".";
        }
        return string + padding;
    }
    var maxStringLength = 0;
    for (var i = 0; i < strings.length; ++i) {
        var currentLength = (strings[i]).length;
        if (currentLength > maxStringLength) {
            maxStringLength = currentLength;
        }
    }
    for (var i = 0; i < strings.length; ++i) {
        strings[i] = pad(strings[i], maxStringLength);
    }
    return strings;
}

/** www.conwaylife.com/wiki/index.php?title=Block-laying_switch_engine */
function makeSwitchEngine(grid, x, y) {
    var switchEngine = ["..................O",
".OOO........O.....O",
"O...O......O.......O",
".OO.........OOOO..OO",
"...OO.OO.........OOO",
".....OO...........O.O",
"...................O.......OO",
"...................O.......OO",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
".......OO",
".......OO",
"",
"",
"",
"",
"",
"",
"...............OO",
"...............OO"];
    switchEngine = padStrings(switchEngine);
    writeStringsToGrid(grid, switchEngine, x, y);
}

/** www.conwaylife.com/wiki/index.php?title=Snail */
function makeSnail(grid, x, y) {
    var snail = [".O",
                 ".O",
                 "O",
                 ".OOO.................OOO...OOO",
                 ".OO.O.........O...O.O......OOO",
                 "..O...........OO.O.......O....OOOO",
                 "......O......O...O.O...OO.O.....OO",
                 "...O..O.OOO...OO.........O........OO.O",
                 "...OO.O.....O.....O.................O",
                 ".........O.OOOOOOO",
                 "",
                 ".........O.OOOOOOO",
                 "...OO.O.....O.....O.................O",
                 "...O..O.OOO...OO.........O........OO.O",
                 "......O......O...O.O...OO.O.....OO",
                 "..O...........OO.O.......O....OOOO",
                 ".OO.O.........O...O.O......OOO",
                 ".OOO.................OOO...OOO",
                 "O",
                 ".O",
                 ".O"];
    snail = padStrings(snail);
    writeStringsToGrid(grid, snail, x, y);
}

/** http://www.conwaylife.com/wiki/Star_gate */
function makeStarGate(grid, x, y) {
    var starGate = [".......................O.O......................................................................................O",
".....................O...O.................................................O.................................OOOO",
".............O.......O....................................................O.O...............................OOOO................O",
"............OOOO....O....O........OO.....................................O...OO......OO..............OO.....O..O........OO.....O.O",
"...........OO.O.O....O............OO..........................OO.........O...O.OO....O.O.............OO.....OOOO..............O...OO",
"OO........OOO.O..O...O...O....................................OO.........O...O.OOO....OOO....................OOOO...OO.O.O....O...OO...OO",
"OO.........OO.O.O......O.O................................................O.O.OO..O....OOO......OO..............O..O...OO.....O...OO...OO",
"............OOOO...........................................................O....OO....OOO.......OO..................O..........O.O",
".............O.......................................................................O.O..................OO........O..O........O",
".....................................................................................OO...................O",
"........................OO........OO...................OO..........................................O....O.O",
".....OO.................OO.........O...................O................O.........................O.O...OO",
"....O.O............................O.O.......O.......O.O................O.O......OO...............OO.O.......O",
"...OOO..............................OO.......OOOO....OO.................OO.......O.O..............OO.OO.....O",
"...OO.........................................OOOO..................................O.............OO.O......OOO",
"...OO.............OO..........................O..O...............................O..O.............O.O",
"....O.O..........O.O...........O......O.......OOOO......O...........................O........O.....O",
".....O.............O............O......OO....OOOO.......OOO...............OO.....O.O.......O.O............................O.......................OO",
"..............................OOO.....OO.....O.............O.....O.......O.O.....OO.........OO.......................O....OOOO....................O",
"..........................................................OO....O........O...........................................O.....OOOO.......O.........O.O",
"..OO...OO............O..............................OO.........O..O.....OO...........................O..........OO.........O..O......O.O........OO",
"..OO...OO..........OOO...............................O...............................................O.O........OO.........OOOO....OO...O...........OO",
"..................O..................................O.O......O.O....................................OO...................OOOO.....OO...O...........OO",
"....OOO...OOO.....OO..................................OO.....O...........................OO...............................O........OO...O",
"....OOO.....O.................................................OO.........OO.............OOOO.........................................O.O",
".....O.....O..................................................O.........OO.OO..........OO.OO..........................................O",
"............................................................O............OOOO...........OO..........................OO.....O.O",
"...........................................................OOO............OO........................................O......OO",
".............................................................................................................O....O.O.......O",
".............OO...OO............................................................................OO..OO......OOOO.OOO",
"................O..........................................................................O.O..O.OOOO.....OO.O.OO",
"......OOO....O.....O..OO......................O......O...................................O...O...O.OO.....OOO.O..O................................OO.O.OO",
"......OOO.....OO.OO..O.O.......................O......OO.................................O............O....OO.O.O",
".....O...O.....O.O.....O.....................OOO.....OO...........................OO....O....O..............OOOO.....O............................O.....O",
"................O.................................................................OO.....O...................O.....OO",
"....OO...OO.....O........................................................................O...O......................OO.............................OO.OO",
".............................OO............................................................O.O.......................................................O",
".............................O.O...............................................................................................................OO",
".............................O.................................................................................................................O",
"..................O....................................................................................................................OO...OO.O",
".................OOO..................................................................................................................O...O...O",
"................O...O......................................................O................................O.O.......OO.............O",
"...............O.OOO.O...................................................O.O................................OO........OO.............O...O..O.....O",
"................OOOOO...........................OO........................OO.................................O...........OO..........O.....O....OO....OOO",
"....................................OOO..O.....O...O.....................................................................OOO..........O...O......OO..O...O",
".......OO.......................O...O.........O.....O........................................O...........................OO............OO",
".......OO.....................O.O....O........O...O..O.......O......O........................OOO...............OO.....OO.........O.O................O.....O",
"............................OO................O...............O......OO.........................O.............O.O.....OO..........OO................OO...OO",
"............................OO.................O...O...O....OOO.....OO.........................OO.............O...................O",
"............................OO..................OO...OO.O................................OO..................OO",
"........................OO....O.O.......................O.................................O..............................................O.O...........O",
".......................O.O......O.......................OO................................O.O............................................OO...........O.O",
".......................O...................................................................OO................O..O.........................O...........O.O",
"......................OO...........................................................................O........O..............OOOO.........................O",
"..................OO........................................................................................O...O..........O...O........................O",
"..................OO........................................................................................OOOO...........O.........................O..O",
"..........................................................................................O.....O.O.........................O..O......................OO",
"........................................................................................O.O......OO..................................OO.........OO",
".........................................................................................OO......O...................................O.O.......O.O",
"...............................................................................................................................O.....O........O......OO..OO",
"..............................................................................................................................O.O.............O..O..O..O.OO",
"............................................................................O......O...................................OO....O.OO.............O......OO",
".............................................................................O......OO.................................OO...OO.OO..............O.O",
"...........................................................................OOO.....OO........................................O.OO...............OO",
"..............................................................................................................................O.O",
"...............................................................................................................................O",
"",
"",
"...............................................................................................................O",
"..........................................................................................................O.....O",
"..........................................................................................O.O...........OO..O...OO",
"..........................................................................................O.O............O.O.OOOO",
"...........................................................................................O...............OOOOO",
"............................................................................................................OO",
"",
"................................................................................................................................OO",
"................................................................................................................................OO",
"..............................................................................................O.............................................OO",
".............................................................................................OO.............................................OO",
"........................................................................................O....O.O",
"........................................................................................OOO......................................O",
"...........................................................................................O....................................OOO",
"..........................................................................................OO...................................O...O",
"......................................................................................................................OO......O.OOO.O",
".....................................................................................................................OO........OOOOO",
".............................................................................................O.........................O",
"...........................................................................................OO.OO",
"",
"..........................................................................................O.....O...........................................OOO",
"...........................................................................................................................................O...O",
"..........................................................................................OO.O.OO.........................................O.....O",
"...........................................................................................................................................O...O",
".............................................................................................................O..............................OOO",
"...........................................................................................O................OO..............................OOO",
"...........................................................................................O..O.............O.O....................OO",
"...........................................................................................O.......................................O",
"..............................................................................................OO....................................OOO",
"...............................................................................................O......................................O",
".............................................................................................O.O..............................................OOO",
".............................................................................................OO.........................OO...............O...OO.OO",
".......................................................................................................................O.O.............OO....OO.OO",
".........................................................................................................................O..............OO...OOOOO",
"........................................................................................OO...OO.............................................OO...OO",
"........................................................................................O.....O",
".....................................................................................................O",
".........................................................................................O...O.....O.O",
"..........................................................................................OOO.......OO",
"............................................................................................................................O...O.O",
"...........................................................................................................................OO...OO",
"...........................................................................................................................O.O...O...............OO",
".................................................................................................................................................O",
"........................................................................................OO........................................................OOO",
".........................................................................................O..........................................................O",
"......................................................................................OOO..........................OO...............O.......O",
"......................................................................................O..................OO.........O..............OOOO.....O.O",
".............................................................................................OO.........O.O.........O.O.......OO..O..OO........OO",
".............................................................................................OOO..........O..........OO.......OO..OO...........OO",
"...............................................................................................OO.O...........O............OO..........O.......OO",
"...............................................................................................O..O..........OO...........OOO..........O....O.O....OO",
"...............................................................................................OO.O.........OO...OO........OO..........O....O......O.O",
"......................................................................................OO.....OOO...........OOO................OO.....................O",
".....................................................................................O.O.....OO.............OO................OO.....................OO",
".....................................................................................O.......................OO.....OO",
"....................................................................................OO........................O.....O.O",
"......................................................................................................................O",
"......................................................................................................................OO"];
    starGate = padStrings(starGate);
    writeStringsToGrid(grid, starGate, x, y);
}

function countNeighbors(grid, x, y) {
    var stateToInt = function stateToInt(s) {
        if (s === ALIVE) {
            return 1;
        } else {
            return 0;
        }
    }
    return stateToInt(getCell(grid, x - 1, y - 1)) +
           stateToInt(getCell(grid, x, y - 1)) +
           stateToInt(getCell(grid, x + 1, y - 1)) +
           stateToInt(getCell(grid, x - 1, y)) +
           stateToInt(getCell(grid, x + 1, y)) +
           stateToInt(getCell(grid, x - 1, y + 1)) +
           stateToInt(getCell(grid, x, y + 1)) +
           stateToInt(getCell(grid, x + 1, y + 1));
}

/**
Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any live cell with two or three live neighbours lives, unchanged, to the next generation.
Any dead cell with exactly three live neighbours cells will come to life.

WARNING: DO NOT modify the grid in place. You need to generate a new grid entirely.
 */
function conwayNextGeneration(grid) {
    var h = heightOf(grid);
    var w = widthOf(grid);
    var nextGenGrid = makeGridArray(h, w, 0);
    for (var y = 0; y < h; ++y) {
        for (var x = 0; x < w; ++x) {
            var state = getCell(grid, x, y);
            var neighbors = countNeighbors(grid, x, y);
            // Remember: all cells in the new generation
            // start off as dead. Make things alive as needed.
            if (state === DEAD) {
                // We need 3 neighbors to come to life.
                if (neighbors === 3) {
                    setCell(nextGenGrid, x, y, ALIVE);
                }
            } else {
                // We stay alive only if we have 2 or 3 neighbors.
                if (neighbors === 2 || neighbors === 3) {
                    setCell(nextGenGrid, x, y, ALIVE);
                }
                // Otherwise, this live cell dies.
            }
        }
    }
    return nextGenGrid;
}

/* Creates a glider that points southeast. */
function makeGlider(grid, x, y) {
    glider = ["010",
              "001",
              "111"];
    writeStringsToGrid(grid, glider, x, y);
}

/* Creates a loop that behaves chaotically. */
function makeLoop(grid, x, y) {
    loop = ["00001111000000",
            "00010000110000",
            "00100000001100",
            "01000000000110",
            "10000000000001",
            "01100000000110",
            "00011000001000",
            "00000111010000",
            "00000000100000"];
    writeStringsToGrid(grid, loop, x, y);
}

/** Generates a 2D array of ALIVE and DEAD values.
    Does not write to the conway_grid.
 */
function makeGridArray(height, width, invisible_padding) {
    var makeRow = function makeRow() {
        var row = [];
        for (var i = 0; i < width; ++i) {
            row.push(DEAD);
        }
        return row;
    }
    var grid = [];
    for (var i = 0; i < height; ++i) {
        grid.push(makeRow());
    }
    return grid;
}

/** Returns the height of a 2D array. */
function heightOf(grid) {
    return grid.length;
}

/** Returns the width of a 2D array. Heightless arrays also have 0 width. */
function widthOf(grid) {
    if (heightOf(grid) === 0) {
        return 0;
    }
    return (grid[0]).length;
}

/** Makes a cell ALIVE or DEAD in a 2D array. */
function setCell(grid, x, y, state) {
    if (heightOf(grid) <= y || widthOf(grid) <= x || x < 0 || y < 0) {
        console.log("Out of bounds");
        return grid;
    }
    grid[y][x] = state;
    return grid;
}

/** Changes the state of a cell in a 2D array. */
function toggleCell(grid, x, y) {
    if (heightOf(grid) <= y || widthOf(grid) <= x || x < 0 || y < 0) {
        //console.log("Out of bounds");
        return grid;
    }
    if (grid[y][x] === DEAD) {
        grid[y][x] = ALIVE;
    } else {
        grid[y][x] = DEAD;
    }
    return grid;
}

function userToggleCell(x, y) {
    toggleCell(g_grid, x, y);
    drawGrid(g_grid);
}

/** Gets the state of a cell in a 2D array.
    Out of bounds cells are DEAD.
 */
function getCell(grid, x, y) {
    if (heightOf(grid) <= y || widthOf(grid) <= x || x < 0 || y < 0) {
        //console.log("Out of bounds");
        return DEAD;
    }
    return grid[y][x];
}

/** Given an array of strings, write the contents
    of that array into the 2D grid at a certain (x,y)
    offset.
 */
function writeStringsToGrid(grid, strings, x, y) {
    var stringsHeight = strings.length;
    var stringsWidth = 0;
    if (stringsHeight > 0) {
        stringsWidth = (strings[0]).length;
    }
    for (var i = 0; i < stringsHeight; ++i) {
        for (var j = 0; j < stringsWidth; ++j) {
            var currentChar = strings[i].charAt(j);
            if (currentChar === "1" || currentChar === "O") {
                // Set alive
                setCell(grid, x + j, y + i, ALIVE);
            } else {
                setCell(grid, x + j, y + i, DEAD);
            }
        }
    }
}

function drawGrid(grid) {
    var h = heightOf(grid);
    var w = widthOf(grid);
    for (var y = 0; y < h; ++y) {
        for (var x = 0; x < w; ++x) {
            var cellState = getCell(grid, x, y);
            var cell = document.getElementById("g" + x + "_" + y);
            if (cellState === ALIVE) {
                cell.className = "alive";
            } else {
                cell.className = "dead";
            }
        }
    }
}

// How to use closures:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

function makeToggler(x, y) {
    return function toggler() {
        userToggleCell(x, y);
        console.log("(" + x + "," + y + ")");
    }
}

/** Generate the grid, including updating the graphical cells. */
function generateGrid(height, width, invisible_padding) {
    // http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    // Delete the old children:
    var myTable = document.getElementById("conway_grid");
    while (myTable.firstChild) {
        myTable.removeChild(myTable.firstChild);
    }
    var numColumns = width;
    var numRows = height;
    var conwayGrid = document.getElementById("conway_grid");
    for (var i = 0; i < numRows; ++i) {
        var currentRow = document.createElement("tr");
        for (var j = 0; j < numColumns; ++j) {
            var currentSquare = document.createElement("td");
            // http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript
            currentSquare.className = "dead";
            // gx_y is the (x,y) cell.
            currentSquare.id = "g" + j + "_" + i;
            currentSquare.onclick = makeToggler(j, i);
            currentRow.appendChild(currentSquare);
        }
        conwayGrid.appendChild(currentRow);
    }
    return makeGridArray(height, width, invisible_padding);
}

/** Starts up Conway's Game of Life. */
function startUp() {
    g_grid = generateGrid(60, 120, 0);
    makeGlider(g_grid, 5, 5);
    makeGlider(g_grid, 15, 5);
    makeGlider(g_grid, 25, 5);
    makeGlider(g_grid, 35, 5);
    makeLoop(g_grid, 26, 16);
    makeLoop(g_grid, 46, 16);
    makeLoop(g_grid, 66, 16);
    makeLoop(g_grid, 26, 35);
    makeLoop(g_grid, 40, 40);
    drawGrid(g_grid);
}

/* http://stackoverflow.com/questions/1085801/get-selected-value-of-dropdownlist-using-javascript */
function setStartConditions() {
    var selector = document.getElementById("select_start_conditions");
    var choice = (selector.options[selector.selectedIndex]).value;
    if (choice === "blank") {
        g_grid = generateGrid(60, 120, 0);
    } else if (choice === "gliders_loops") {
        g_grid = generateGrid(60, 120, 0);
        makeGlider(g_grid, 5, 5);
        makeGlider(g_grid, 15, 5);
        makeGlider(g_grid, 25, 5);
        makeGlider(g_grid, 35, 5);
        makeLoop(g_grid, 26, 16);
        makeLoop(g_grid, 46, 16);
        makeLoop(g_grid, 66, 16);
        makeLoop(g_grid, 26, 35);
        makeLoop(g_grid, 40, 40);
    } else if (choice === "snail") {
        g_grid = generateGrid(60, 120, 0);
        makeSnail(g_grid, 80, 3);
    } else if (choice === "switch_engine") {
        g_grid = generateGrid(80, 120, 0);
        makeSwitchEngine(g_grid, 55, 30);
    } else if (choice === "stargate") {
        g_grid = generateGrid(150, 170, 0);
        makeStarGate(g_grid, 5, 5);
    }
    drawGrid(g_grid);
}

function runConway() {
    g_grid = conwayNextGeneration(g_grid);
    drawGrid(g_grid);
    g_conwayTimeoutID = window.setTimeout(runConway, 100, []);
}

function stopConway() {
    window.clearTimeout(g_conwayTimeoutID);
}