"use strict";
function fundo() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
function showFPS() {
    ctx.fillStyle = "black";
    ctx.font = "30px ARIAL";
    ctx.fillText("FPS: " + fps, WIDTH / 4, HEIGHT / 8);
}
