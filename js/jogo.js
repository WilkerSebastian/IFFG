"use strict";
// função padrão
function main() {
    run = !run;
    if (run) {
        loop();
    }
}
// função de loop de gameplay
function loop() {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    fps = times.length;
    render();
    update();
    // usando o requesicao de quadro pela taxa de atualização
    window.requestAnimationFrame(loop);
}
// função responsável pela parte lógica do jogo
function update() {
}
// função responsável pela parte de rendirzação do jogo
function render() {
    var _a;
    fundo();
    (_a = objetos.get("chao")) === null || _a === void 0 ? void 0 : _a.render("#CD853F");
}
