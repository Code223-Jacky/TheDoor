let darkness = 45;
let nextFlicker = 0;

function setup() {
    let scene = document.getElementById("hallway-scene");

    let canvas = createCanvas(
        scene.clientWidth,
        scene.clientHeight
    );

    canvas.parent("hallway-scene");
}

function draw() {
    clear();

    if (millis() > nextFlicker) {
        if (random(1) < 0.18) {
            darkness = random(140, 220);
            nextFlicker = millis() + random(60, 180);
        } else {
            darkness = random(35, 70);
            nextFlicker = millis() + random(900, 3000);
        }
    }

    noStroke();
    fill(0, 0, 0, darkness);
    rect(0, 0, width, height);
}

function windowResized() {
    let scene = document.getElementById("hallway-scene");
    resizeCanvas(scene.clientWidth, scene.clientHeight);
}