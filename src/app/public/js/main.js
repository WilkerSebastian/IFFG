"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let fundo = new Image();
fundo.src = "/public/img/fundo.jpg";
let lastUpdate = new Date().getTime();
let delta = 0;
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key == 'ç') {
        debug = !debug;
        terminal.visibilidade(debug);
    }
    switch (event.key) {
        case "a":
            keys.a.pressed = true;
            players[0].lastKey = 'a';
            break;
        case "d":
            keys.d.pressed = true;
            players[0].lastKey = 'd';
            break;
        case "e":
            keys.e.pressed = true;
            players[0].lastKey = 'e';
            break;
        case "t":
            keys.t.pressed = true;
            players[0].lastKey = 't';
            break;
        case "s":
            keys.s.pressed = true;
            players[0].lastKey = 's';
            break;
    }
    switch (event.key) {
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            players[1].lastKey = 'ArrowRight';
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            players[1].lastKey = 'ArrowLeft';
            break;
        case "Home":
            keys.Home.pressed = true;
            players[1].lastKey = 'Home';
            break;
        case "PageUp":
            keys.PageUp.pressed = true;
            players[1].lastKey = 'PageUp';
            break;
        case "ArrowDown":
            keys.ArrowDown.pressed = true;
            players[1].lastKey = 'ArrowDown';
            break;
    }
});
document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
        case "e":
            keys.e.pressed = false;
            break;
        case "t":
            keys.t.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
    }
    switch (event.key) {
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
        case "Home":
            keys.Home.pressed = false;
            break;
        case "PageUp":
            keys.PageUp.pressed = false;
            break;
        case "ArrowDown":
            keys.ArrowDown.pressed = false;
            break;
    }
});
function loop() {
    if (rodando) {
        if (iniciou) {
            setTimeout(() => {
                iniciou = false;
                players[0].init();
                players[1].init();
                audio.play();
                loop();
            }, 1000);
        }
        else {
            let t = new Date().getTime();
            delta = t - lastUpdate;
            lastUpdate = new Date().getTime();
            fps++;
            if (fps > 60) {
                fps = 60;
            }
            update();
            render();
            setTimeout(() => { loop(); }, 1000 / 60);
        }
    }
    else {
        if (players[0].morto) {
            players[1].vitorias++;
            finalizao(players[1].nome);
        }
        else if (players[1].morto) {
            players[0].vitorias++;
            finalizao(players[0].nome);
        }
        if (players[0].vitorias == 2) {
            render();
            finalizao(players[0].nome);
            setTimeout(() => {
                canvas.style.display = "none";
                menu.style.display = "block";
            }, 3000);
        }
        else if (players[1].vitorias == 2) {
            render();
            finalizao(players[1].nome);
            setTimeout(() => {
                canvas.style.display = "none";
                menu.style.display = "block";
            }, 3000);
        }
        else {
            setTimeout(() => {
                tempo = 150;
                canvas.style.display = "block";
                menu.style.display = "none";
                response.value += `> novo round \n`;
                iniciou = true;
                rodando = true;
                loop();
            }, 10);
        }
    }
}
;
lastUpdate = new Date().getTime();
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        if (keys.ArrowLeft.pressed && players[1].lastKey === 'ArrowLeft') {
            console.log("esquerda");
            players[1].movimento("esquerda", delta);
        }
        else if (keys.ArrowRight.pressed && players[1].lastKey === 'ArrowRight') {
            players[1].movimento("direita", delta);
        }
        else if (keys.PageUp.pressed && players[1].lastKey === 'PageUp') {
            players[1].movimento("defesa", delta);
        }
        else if (keys.Home.pressed && players[1].lastKey === 'Home') {
            players[1].movimento("soco", delta);
        }
        else if (keys.ArrowDown.pressed && players[1].lastKey === 'ArrowDown') {
            players[1].movimento("baixo", delta);
        }
        if (keys.a.pressed && players[0].lastKey === 'a') {
            players[0].movimento("esquerda", delta);
        }
        else if (keys.d.pressed && players[0].lastKey === 'd') {
            players[0].movimento("direita", delta);
        }
        else if (keys.e.pressed && players[0].lastKey === 'e') {
            players[0].movimento("soco", delta);
        }
        else if (keys.t.pressed && players[0].lastKey === 't') {
            players[0].movimento("defesa", delta);
        }
        else if (keys.s.pressed && players[0].lastKey === 's') {
            players[0].movimento("baixo", delta);
        }
        if (tempo == 0) {
            players.forEach((p) => { p.levarDano(0.05); });
        }
        players[0].update(players[1]);
        players[1].update(players[0]);
        camera.update(players);
    });
}
function render() {
    camera.render(fundo);
    if (debug)
        debuger();
    players[0].render(players[1].colisao);
    players[1].render(players[0].colisao);
    renderTimer();
    roundRender();
}
