"use strict";
let morte = true;
function renderTimer() {
    ctx.fillStyle = "red";
    ctx.font = "50px arial";
    ctx.fillText(tempo.toString(), LARGURA / 2.1, 70);
    if (tempo == 0 && morte) {
        ctx.fillStyle = "red";
        ctx.font = "50px arial";
        ctx.fillText("MORTE SUBITA!", LARGURA / 3, 200);
        setTimeout(() => { morte = false; }, 3000);
    }
}
function finalizao(nome) {
    const player = players.filter((p) => {
        return p.nome == nome;
    });
    ctx.font = "50px arial";
    ctx.fillStyle = "white";
    if (player[0].life == player[0].hp) {
        ctx.fillText(`${nome.toLocaleUpperCase()} PERFECT WINS!`, ALTURA / 1.5, 160);
    }
    else {
        ctx.fillText(`${nome.toLocaleUpperCase()} WINS!`, ALTURA / 1.5, 160);
    }
}
function debuger() {
    ctx.font = "20px arial";
    ctx.fillStyle = "#F2BF3D";
    ctx.fillText(`FPS: ${fps}`, 10, 130);
    ctx.fillText(`INPUT player 1: ${players[0].lastKey}`, 10, 150);
    ctx.fillText(`INPUT player 2: ${players[1].lastKey}`, 10, 170);
}
function roundRender() {
    if (iniciou) {
        ctx.font = "50px arial";
        ctx.fillStyle = "white";
        ctx.fillText(`ROUND ${round}`, ALTURA / 1.1, 160);
    }
}
function circulo(x, y, cor) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = cor;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
}
