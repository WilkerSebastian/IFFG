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
// imagens
const imagens = [];
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
    }
}
let id = setInterval(() => { load(); }, 1000);
