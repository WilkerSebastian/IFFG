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
const objetos = new Map();
objetos.set("chao", new Objeto(0, HEIGHT - 75, WIDTH, 75, true));
// imagens
const imagens = {};
// telcas keys/arrows
const keys = new Map();
keys.set("a", false);
keys.set("d", false);
keys.set("w", false);
keys.set("s", false);
const arrows = new Map();
arrows.set("ArrowLeft", false);
arrows.set("ArrowRight", false);
arrows.set("ArrowUp", false);
arrows.set("ArrowDown", false);
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
        run = true;
        window.requestAnimationFrame(main);
    }
}
let id = setInterval(() => { load(); }, 1);
// variaveis de depuração
let debug = false;
let debugTecla = 'nenhuma';
let debugArrow = 'nenhuma';
