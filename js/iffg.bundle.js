"use strict";
class Objeto {
    constructor(x, y, width, height, collide) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collide = collide;
    }
    isCollided(obj) {
        const colisor = {
            collided: false,
            x: this.x,
            y: this.y
        };
        if (!obj.collide) {
            return colisor;
        }
        const distanciaX = (this.x + this.width / 2) - (obj.x + obj.width / 2);
        const distanciaY = (this.y + this.height / 2) - (obj.y + obj.height / 2);
        const sumWidth = (this.width + obj.width) / 2;
        const sumHeight = (this.height + obj.height) / 2;
        if (Math.abs(distanciaX) < sumWidth && Math.abs(distanciaY) < sumHeight) {
            colisor.collided = true;
            const overX = sumWidth - Math.abs(distanciaX);
            const overY = sumHeight - Math.abs(distanciaY);
            if (overX > overY) {
                colisor.y = distanciaY > 0 ? this.y + overY : this.y - overY;
            }
            else {
                colisor.x = distanciaX > 0 ? this.x + overX : this.x - overX;
            }
        }
        return colisor;
    }
    render(cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Player extends Objeto {
    constructor(x, y, width, height, nome, direita) {
        super(x, y, width, height, true);
        this.gravidade = 0.8 * scale;
        this.speed = 5 * scale;
        this.forcaDoPulo = 23 * scale;
        this.direita = direita !== null && direita !== void 0 ? direita : false;
        this.pulou = false;
        this.nome = nome;
        this.life = 100;
        this.maxLife = 100;
    }
    movimento() {
        if (this.direita) {
            if (arrows.get("ArrowLeft")) {
                this.x -= this.speed;
            }
            if (arrows.get("ArrowRight")) {
                this.x += this.speed;
            }
            if (arrows.get("ArrowUp")) {
                if (!this.pulou) {
                    this.pulou = true;
                    setTimeout(() => this.pulou = false, 2000);
                }
            }
            if (arrows.get("ArrowDown")) {
                this.y += this.speed;
            }
        }
        else {
            if (keys.get("a")) {
                this.x -= this.speed;
            }
            if (keys.get("d")) {
                this.x += this.speed;
            }
            if (keys.get("w")) {
                if (!this.pulou) {
                    this.pulou = true;
                    setTimeout(() => this.pulou = false, 2000);
                }
            }
            if (keys.get("s")) {
                this.y += this.speed;
            }
        }
    }
    update() {
        this.movimento();
        this.speed += this.gravidade;
        this.y += this.speed;
        if (this.y > objetos.get("chao").height - this.height) {
            this.y = objetos.get("chao").y - this.height;
            this.speed = 5;
        }
    }
    render(cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.direita) {
        }
        else {
            ctx.fillStyle = "#BF3017";
            ctx.fillRect(0, 9, this.maxLife * scale, 50 * scale);
            ctx.fillStyle = "#2ABF77";
            ctx.fillRect(0, 0, this.life * scale, 50 * scale);
        }
        if (debug) {
            ctx.font = `${sizeFont}px ARIAL`;
            ctx.fillText("vida: " + this.life, this.x, this.y - (6 * sizeFont));
            ctx.fillText("X: " + this.x.toFixed(0), this.x, this.y - (5 * sizeFont));
            ctx.fillText("Y: " + this.x.toFixed(0), this.x, this.y - (4 * sizeFont));
            ctx.fillText("velocidade: " + this.speed.toFixed(0), this.x - 25, this.y - (3 * sizeFont));
            ctx.fillText(`pulou: ${this.pulou ? "verdadeiro" : "falso"}`, this.x - 25, this.y - (2 * sizeFont));
        }
    }
}
class Terminal {
    constructor() {
        this.section = $("#terminal");
        this.request = $("#request");
        this.response = $("#response");
        this.color = "#85E33D";
        this.setColor();
    }
    commander() {
        const linha = this.request.val();
        let resposta = "$ ";
        let clear = false;
        switch (true) {
            case linha.slice(2, 13) == "kill player":
                const num = Number(linha[14]);
                let nome;
                if (num == 1 || num == 2) {
                    if (num == 1) {
                        player1.life = 0;
                        nome = player1.nome;
                    }
                    else {
                        player2.life = 0;
                        nome = player2.nome;
                    }
                    resposta += `player ${nome} foi finalizado!`;
                }
                else {
                    resposta += "index errado!";
                }
                break;
            case linha.slice(2, 5) == "cls":
                clear = true;
                break;
            default:
                resposta += "command not found!";
                break;
        }
        const concat = this.response.val();
        this.request.val("$ ");
        this.response.val(clear ? "$ " : concat + resposta + "\n");
    }
    setColor(color) {
        if (color != undefined) {
            this.request.css("color", color);
            this.response.css("color", color);
        }
        else {
            this.request.css("color", this.color);
            this.response.css("color", this.color);
        }
    }
    setVisible(mostrar) {
        this.section.css("display", mostrar ? "block" : "none");
    }
}
const terminal = new Terminal();
terminal.request.on("keydown", (e) => { if (e.key == "Enter")
    terminal.commander(); });
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
let run = false;
const times = [];
let fps = 0;
const canvas = $("#canvas").get()[0];
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
const scale = (WIDTH * HEIGHT) / (1360 * 768);
const objetos = new Map();
objetos.set("chao", new Objeto(0, HEIGHT - (75 * scale), WIDTH, (75 * scale), true));
const imagens = {};
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
let debug = false;
let debugTecla = 'nenhuma';
let debugArrow = 'nenhuma';
window.addEventListener("keydown", (evento) => {
    if (evento.ctrlKey && evento.key == "k") {
        debug = !debug;
        terminal.setVisible(debug);
    }
    if (keys.get(evento.key) != undefined) {
        debugTecla = evento.key;
        keys.set(evento.key, true);
    }
    if (arrows.get(evento.key) != undefined) {
        debugArrow = evento.key;
        arrows.set(evento.key, true);
    }
});
window.addEventListener("keyup", (evento) => {
    if (keys.get(evento.key) != undefined) {
        debugTecla = "nenhuma";
        keys.set(evento.key, false);
    }
    if (arrows.get(evento.key) != undefined) {
        debugArrow = "nenhuma";
        arrows.set(evento.key, false);
    }
});
const player1 = new Player((200 * scale), HEIGHT - (225 * scale), (50 * scale), (150 * scale), "lincoln");
const player2 = new Player(WIDTH - (150 * scale), HEIGHT - (225 * scale), (50 * scale), (150 * scale), "ferraz", true);
function main() {
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
    player1.update();
    player2.update();
}
function render() {
    var _a;
    fundo();
    (_a = objetos.get("chao")) === null || _a === void 0 ? void 0 : _a.render("#CD853F");
    player1.render("red");
    player2.render("blue");
    if (debug) {
        showFPS();
        showKeys();
    }
}
const sizeFont = (20 * scale);
function fundo() {
    ctx.fillStyle = "#88DEFA";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
function showFPS() {
    ctx.fillStyle = "black";
    ctx.font = `${sizeFont}px ARIAL`;
    ctx.fillText("FPS: " + fps, 50, sizeFont * 4);
}
function showKeys() {
    ctx.fillStyle = "black";
    ctx.font = `${sizeFont}px ARIAL`;
    ctx.fillText("input player1: " + debugTecla, 50, sizeFont * 5);
    ctx.fillText("input player2: " + debugArrow, 50, sizeFont * 6);
}
$(".h-win").css("height", `${window.innerHeight}px`);
$(".w-win").css("width", `${window.innerWidth}px`);
