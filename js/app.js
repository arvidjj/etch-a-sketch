
const mainContainer = document.querySelector('#mainContainer');

const gridSizeSlider = document.querySelector("#gridSizeSlider");
let currentGridValue = 16;
let output = document.querySelector("#gridSizeP");
output.innerHTML = `${gridSizeSlider.value}x${gridSizeSlider.value}`;
gridSizeSlider.oninput = function () { //SLIDER GET VALUE
    currentGridValue = this.value;
    output.textContent = `${this.value}x${this.value}`;
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

let shadowModeActive = false;
let randomColorActive = false;
let eraserActive = false;
let modesList = [shadowModeActive, randomColorActive, eraserActive];
let currentColor = 'black';
let backgroundColor = 'white';
let lastColor = currentColor;

let buttonRandomRGB = document.querySelector('#buttonRandomRGB');
buttonRandomRGB.addEventListener('click', toggleRandom);
function toggleRandom() {
    if (modesList[0]) {
        unToggleButtons();
        return;
    }
    unToggleButtons();
    modesList[0] = !modesList[0];
    
    if (modesList[0]) {
        buttonRandomRGB.classList.add('active');
        lastColor = currentColor;
    } else {
        buttonRandomRGB.classList.remove('active');
    }
}


let buttonShadowMode = document.querySelector('#buttonShadowMode');
buttonShadowMode.addEventListener('click', toggleShadow);
function toggleShadow() {
    if (modesList[1]) {
        unToggleButtons();
        return;
    }
    unToggleButtons();
    modesList[1] = !modesList[1];

    if (modesList[1]) {
        buttonShadowMode.classList.add('active');
    } else {
        buttonShadowMode.classList.remove('active');
    }
}

let buttonEraser = document.querySelector('#buttonEraser');
buttonEraser.addEventListener('click', toggleEraser);
function toggleEraser() {
    if (modesList[2]) {
        unToggleButtons();
        return;
    }
    unToggleButtons();
    modesList[2] = !modesList[2];

    if (modesList[2]) {
        buttonEraser.classList.add('active');
    } else {
        buttonEraser.classList.remove('active');
    }
}

let drawingOptionButtons = document.querySelectorAll('.drawingOption');

function unToggleButtons() {
    drawingOptionButtons.forEach(a => a.classList.remove('active'));
    for (let i = 0; i < modesList.length; ++i) {
        modesList[i] = false;
    }
    currentColor = lastColor;
}

function clickedGrid(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (mouseDown) {
        if (modesList[0] === true) { //RANDOM RGB
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            currentColor = "#" + randomColor;
        } else if (modesList[1] === true) { // SHADOW MODE
            if (this.style.backgroundColor === 'rgb(0, 0, 0)') {
                return;
            }
            let gridColor = +this.style.backgroundColor.slice(14).slice(0, -1) + 0.1;
            console.log(gridColor);
            console.log(this.style.backgroundColor);

            let shadowColor = `rgba(0, 0, 0, ${gridColor})`;
            currentColor = shadowColor;
        } else if (modesList[2] === true) { //eraser
            currentColor = backgroundColor;
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
buttonClear.onclick = function () {
    createGrids(currentGridValue);
};