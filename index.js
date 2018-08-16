document.addEventListener("DOMContentLoaded", function (event) {
    setTimeout(() => document.body.classList.add('render'), 60);

    var TRACK_WIDTH = 10,
        TRACK_HEIGHT = 10;

    var grim = document.getElementById("grid");
    grim.style["grid-template-columns"] = "repeat(" + TRACK_WIDTH + "," + 100 / TRACK_WIDTH + "%)";
    grim.style["grid-template-rows"] = "repeat(" + TRACK_HEIGHT + "," + 100 / TRACK_HEIGHT + "%)";

    var grim_factory = function () {

        this.add_item = function (cell) {

            var item = document.createElement('div')
            item.classList.add("grim__item");
            var item_bg = document.createElement('div')
            item_bg.classList.add("grim__item-bg");

            item.style["grid-area"] = cell;
            item.appendChild(item_bg);

            grim.appendChild(item);

            //      var bg = grim.querySelector('.grim__item-bg');

            //      bg.style.transformOrigin = '50% 50%';
            //      anime.remove(bg);

            anime({
                targets: item_bg,
                duration: 30, // increment as more boxes get revealed..
                easing: 'easeInOutQuad',
                opacity: 1,
                scale: [0, 1]
            });

        }

        this.update_item = function () {

            return new Promise((resolve, reject) => {
                anime({
                    targets: grim.querySelector('.grim__item-bg'),
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    opacity: 1,
                    scale: [0, 1],
                    complete: resolve
                });
            });

        }

        this.remove_all = function () {
            while (grim.hasChildNodes()) {
                grim.removeChild(grim.lastChild);
            }
        }

    };

    var score = document.getElementById("counter");
    var count = 0;
    score.innerHTML = count;

    var factory = new grim_factory();

    factory.add_item("1");

    var item = grim.querySelector('.grim__item');
    item.addEventListener("click", function (e) {
        count++;
        score.innerHTML = count;
    });

    function call() {
        var row = randomIntFromInterval(1, 10);
        var col = randomIntFromInterval(1, 10);
        console.log(row, col);
        item.style["grid-area"] = row + " / " + col + " / " + (row + 1) + " / " + (col + 1);
        factory.update_item().then(() => call());
    };

    call();

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

});
