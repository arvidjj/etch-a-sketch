/*let gridDiv1;
let gridDiv2;
let gridDiv3;
let gridDiv4;
let gridDiv5;
let gridDiv6;
let gridDiv7;
let gridDiv8;
let gridDiv9;
let gridDiv10;
let gridDiv11;
let gridDiv12;
let gridDiv13;
let gridDiv14;
let gridDiv15;
let gridDiv16;
const gridDivs = []*/

const mainContainer = document.querySelector('#mainContainer');

const gridSizeSlider = document.querySelector("#gridSizeSlider");
let output = document.querySelector("#gridSizeP");
output.innerHTML = gridSizeSlider.value;
gridSizeSlider.oninput = function() {
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
}

function resetGrids() {
    for (let i = 0; i < gridSizeSlider.value; i++) {
        mainContainer.innerHTML = '';
    }
}