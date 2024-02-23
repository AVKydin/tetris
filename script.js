
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

function getRandomElement(arr){
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex];
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
    const name = getRandomElement(TETROMINO_NAMES);
    const matrix = TETROMINOES[name];
    const row = 0;
    const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);

    tetromino = {
        name,
        matrix,
        row,
        column,
    }
}

function placeTetromino(){
    const matrixSize = tetromino.matrix.length;
    for(let row= 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            playField[tetromino.row + row][tetromino.column + column] = tetromino.name
        }
    }
    generateTetromino();
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
            // cells[cellIndex].innerHTML = showRotated[row][column];
            cells[cellIndex].classList.add(name);
        }
    }

}

function draw(){
    cells.forEach(cell => cell.removeAttribute('class'))
    drawTetromino();
    drawPlayField();
}

draw()

document.addEventListener("keydown", onKeyDown);
function onKeyDown(e){
    switch (e.key) {
        case 'ArrowUp':
            rorate();
            break;
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
            break;
        case 'ArrowRight':
            moveTetrominoRight();
            break;
    }
    draw();
}

function rorateTetromino(){
    const oldMatrix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(oldMatrix);
    // showRotated = rotateMatrix();
    tetromino.matrix = rotatedMatrix;
}

function rotateMatrix(matrixTetromino){
    const N = matrixTetromino.length;
    const rotateMatrix = [];
    for(let i = 0; i < N; i++){
        rotateMatrix[i] = []
        for(let j = 0; j <N; j++){
            rotateMatrix[i][j] = matrixTetromino[N-j-j][i]
        }
    }
    return rotateMatrix;
}

function moveTetrominoDown(){
    tetromino.row += 1;
    if(!isValid()){
        tetromino.row -= 1;
        placeTetromino();
    }
}
function moveTetrominoLeft(){
    tetromino.column -= 1;
    if(!isValid()){
        tetromino.column += 1;
    }
}
function moveTetrominoRight(){
    tetromino.column += 1;
    if(!isValid()){
        tetromino.column -= 1;
    }
}

function isValid(){
    const matrixSize = tetromino.matrix.length;
    for(let row= 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(tetromino.matrix[row][column]) continue;
            if(isOutsideOfGameboard(row, column)){return false;}
            if(hasCollisions(row, column)) {return false}
        }
    }
    return true;
}

function isOutsideOfGameboard(row, column){
    return tetromino.column + column < 0 ||
           tetromino.column + column >= PLAYFIELD_COLUMNS ||
           tetromino.row + row >= playField.length;
}

function hasCollisions(row, column){
    return playField[tetromino.row + row][tetromino.column + column]
}













