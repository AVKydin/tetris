
const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = ["O", "L", "J", "I", "T", "Z", "S"];

const TETROMINOES = {
    O: [
        [1, 1],
        [1, 1],
    ],
    L: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    J: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
};

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

let playField;
let tetromino;

function generatePlayField(){
    for (let i = 0; i < PLAYFIELD_COLUMNS * PLAYFIELD_ROWS; i++) {
        const div = document.createElement('div');
        document.querySelector('.grid').append(div)
    }

    playField = new Array(PLAYFIELD_ROWS).fill()
        .map(()=>new Array(PLAYFIELD_COLUMNS).fill(0))
}

function generateTetromino(){
    const name = TETROMINO_NAMES[1];
    const matrix = TETROMINOES[name];

    tetromino = {
        name,
        matrix,
        row: 3,
        column: 5,
    }
}

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.grid div')


function drawPlayField(){

    for (let row= 0; row < PLAYFIELD_ROWS; row++){
        for (let column= 0; column < PLAYFIELD_COLUMNS; column++) {
            if(playField[row][column]===0) continue;

            const name = playField[row][column];
            const cellIndex = convertPositionToIndex(row, column)
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTetromino(){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row= 0; row < tetrominoMatrixSize; row++){
        for (let column= 0; column < tetrominoMatrixSize; column++){
            if(!tetromino.matrix[row][column]) continue;
            const cellIndex = convertPositionToIndex(
                tetromino.row + row,
                tetromino.column + column
            )
            cells[cellIndex].classList.add(name);
        }
    }

}

// drawTetromino();
// drawPlayField();

function draw(){
    cells.forEach(cell => cell.removeAttribute('class'))
    drawTetromino();
    drawPlayField();
}

draw()

document.addEventListener("keydown", onKeyDown);
function onKeyDown(e){
    switch (e.key) {
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLefr();
            break;
        case 'ArrowRight':
            moveTetrominoRight();
            break;
    }

    draw();
}


function moveTetrominoDown(){
    tetromino.row += 1;
}
function moveTetrominoLefr(){
    tetromino.column -= 1;
}
function moveTetrominoRight(){
    tetromino.column += 1;
}


