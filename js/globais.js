"use strict";
// variáveis 
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
// variável run 
let run = false;
// variáveis de FPS
const times = [];
let fps = 0;
// variáveis de renderização
const canvas = $("#canvas").get()[0];
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
// lista de objetos e player
//const player1 = new Player()
//const player2 = new Player()
const objetos = new Map();
objetos.set("chao", new Objeto(0, HEIGHT - 75, WIDTH, 75, true));
// imagens
const imagens = {};
// telcas keys/arrows
const keys = {
    "a": false,
    "d": false,
    "w": false,
    "s": false
};
const arrows = {
    "ArrowLeft": false,
    "ArrowRight": false,
    "ArrowUp": false,
    "ArrowDown": false
};
// tela carrgamento
let carregamento = 0;
function load() {
    const barra = $("#barra");
    barra.css("width", `${carregamento}%`);
    carregamento += 10;
    if (carregamento >= 100) {
        clearInterval(id);
        $("#load").css("display", "none");
        $("#onload").css("display", "block");
        window.requestAnimationFrame(main);
    }
}
let id = setInterval(() => { load(); }, 1);
