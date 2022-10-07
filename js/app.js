
const mainContainer = document.querySelector('#mainContainer');

const gridSizeSlider = document.querySelector("#gridSizeSlider");
let currentGridValue = 16;
let output = document.querySelector("#gridSizeP");
output.innerHTML = gridSizeSlider.value;
gridSizeSlider.oninput = function () { //SLIDER GET VALUE
    currentGridValue = this.value;
    output.innerHTML = `${this.value}x${this.value}`;
    createGrids(this.value);
}

function createGrids(canvasSize = 16) {
    resetGrids();
    mainContainer.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    mainContainer.style.gridTemplateRows = `repeat(${canvasSize}, 1fr)`;
    for (let i = 0; i < canvasSize; i++) { //CREATE GRIDS WITH NxN FORMAT
        for (let i = 0; i < canvasSize; i++) {
            const gridDiv = document.createElement('div');
            gridDiv.classList.add('gridDiv');
            mainContainer.appendChild(gridDiv);
        }
    }

    let gridFullList = document.querySelectorAll('.gridDiv'); //ADD EVENT ON MOUSE OVER TO DRAW
    //gridFullList.forEach(grid => grid.addEventListener('mouseover', clickedGrid));
    gridFullList.forEach(grid => grid.addEventListener('mouseover', clickedGrid));
    gridFullList.forEach(grid => grid.addEventListener('mousedown', clickedGrid));
}

/* THIS CONTROLS MOUSE DOWN TRUE OR NOT ON PAGE*/
let mouseDown = false;
window.addEventListener('mousedown', () => {
    mouseDown = true;
})
window.addEventListener('mouseup', () => {
    mouseDown = false;
})
/*          */

let randomColorActive = false;
let currentColor = 'black';

let buttonRandomRGB = document.querySelector('#buttonRandomRGB');
buttonRandomRGB.addEventListener('click', toggleRandom);

function toggleRandom() {
    randomColorActive = !randomColorActive;
    if (randomColorActive) {
        buttonRandomRGB.classList.add('active');
    } else {
        buttonRandomRGB.classList.remove('active');
    }
}

function clickedGrid(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (mouseDown) {
        if (randomColorActive === true) {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            currentColor = "#" + randomColor;
        }
        this.style.backgroundColor = currentColor;
    }
}

function resetGrids() {
    for (let i = 0; i < gridSizeSlider.value; i++) {
        mainContainer.innerHTML = '';
    }
}

let buttonClear = document.querySelector('#buttonClear');
buttonClear.addEventListener('click', createGrids);