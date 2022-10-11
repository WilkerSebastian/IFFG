"use strict";
function main() {
    run = !run;
    if (run) {
        loop();
    }
}
function loop() {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    fps = times.length;
    render();
    update();
    window.requestAnimationFrame(loop);
}
function update() {
}
function render() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "black";
    ctx.font = "30px ARIAL";
    ctx.fillText("FPS: " + fps, WIDTH / 2, HEIGHT / 2);
}
main();
