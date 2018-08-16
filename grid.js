var TRACK_WIDTH = 7;
var TRACK_HEIGHT = 7;

var grid_layout = document.getElementById("grid-layout");

var grid_box = document.getElementById("grid-box");

var update_box = function () {
    return new Promise((resolve, reject) => {
        anime({
            targets: grid_box,
            duration: 1000,
            easing: 'easeInOutQuad',
            opacity: 1,
            scale: [0, 1],
            complete: resolve
        });
    });
}

grid_layout.style["grid-template-columns"] = "repeat(" + TRACK_WIDTH + ", " + "1fr)";

grid_layout.style["grid-template-rows"] = "repeat(" + TRACK_HEIGHT + ", " + "1fr)";

function randomGrid() {
    var randRow = Math.floor(Math.random() * (TRACK_WIDTH) + 1);
    var randCol = Math.floor(Math.random() * (TRACK_HEIGHT) + 1);
    grid_box.style["grid-area"] = randRow + " / " + randCol + " / " + (randRow + 1) + " / " + (randCol + 1);

    console.log(randRow + " / " + randCol + " / " + (randRow + 1) + " / " + (randCol + 1));

    update_box().then(() => randomGrid());
}

randomGrid();
