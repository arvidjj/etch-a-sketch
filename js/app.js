
const mainContainer = document.querySelector('#mainContainer');

const gridSizeSlider = document.querySelector("#gridSizeSlider");
let currentGridValue = 16;
let output = document.querySelector("#gridSizeP");
output.innerHTML = gridSizeSlider.value;
gridSizeSlider.oninput = function() {
    currentGridValue = this.value;
    output.innerHTML = `${this.value}x${this.value}`;
    createGrids(this.value);
  }

function createGrids(canvasSize = 16) {
    resetGrids();
    mainContainer.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    mainContainer.style.gridTemplateRows = `repeat(${canvasSize}, 1fr)`;
    for (let i = 0; i < canvasSize; i++) {
        for (let i = 0; i < canvasSize; i++) {
            const gridDiv = document.createElement('div');
            gridDiv.classList.add('gridDiv');
            mainContainer.appendChild(gridDiv);
        }
    }

    let gridFullList = document.querySelectorAll('.gridDiv');
    
    gridFullList.forEach(a => (a.addEventListener('click', clickedGrid)));

}

let randomColorActive = false;
let currentColor = 'black';

let buttonRandomRGB = document.querySelector('#buttonRandomRGB');
buttonRandomRGB.addEventListener('click', toggleRandom);

function toggleRandom() {
    randomColorActive = !randomColorActive;
}

function clickedGrid(e) {
    if (randomColorActive === true) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        currentColor = "#" + randomColor;
    }
    this.style.backgroundColor = currentColor;
}

function resetGrids() {
    for (let i = 0; i < gridSizeSlider.value; i++) {
        mainContainer.innerHTML = '';
    }
}

let buttonClear = document.querySelector('#buttonClear');
buttonClear.addEventListener('click', createGrids);