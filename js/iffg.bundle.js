"use strict";
class Animacao {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
const animacoes = new Map();
const andar_direita_l = [
    new Animacao(0, 0, 177, 440),
    new Animacao(177, 0, 177, 440),
    new Animacao(177 * 2, 0, 177, 440),
    new Animacao(177 * 3, 0, 177, 440)
];
const andar_esquerda_l = [
    new Animacao(1338, 0, 177, 440),
    new Animacao(1338 - 177, 0, 177, 440),
    new Animacao(1338 - (177 * 2), 0, 177, 440),
    new Animacao(1338 - (177 * 3), 0, 177, 440)
];
animacoes.set("lincoln-andar-esquerda", andar_esquerda_l);
animacoes.set("lincoln-andar-direita", andar_direita_l);
animacoes.set("lincoln-default-esquerda", [new Animacao(0, 0, 177, 440)]);
animacoes.set("lincoln-default-direita", [new Animacao(1338, 0, 177, 440)]);
animacoes.set("ferraz-default-esquerda", [new Animacao(7084, 348, 144, 293)]);
animacoes.set("ferraz-default-direita", [new Animacao(6, 10, 144, 293)]);
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
        this.subita = false;
        this.life = 100;
        this.indexanimacao = 0;
        this.maxLife = 100;
        this.rounds = 0;
        this.direcao = this.direita ? "direita" : "esquerda";
        this.movimentando = false;
        this.animacao = "default";
        this.sprite = animacoes.get(`${this.nome}-${this.animacao}-${this.direcao}`)[this.indexanimacao];
    }
    reset(init) {
        if (init) {
            this.rounds = 0;
        }
        if (this.direita) {
            this.x = WIDTH - (150 * scale);
            this.y = HEIGHT - (225 * scale);
            this.width = (50 * scale);
            this.height = (150 * scale);
        }
        else {
            this.x = (200 * scale);
            this.y = HEIGHT - (225 * scale);
            this.width = (50 * scale);
            this.height = (150 * scale);
        }
        this.pulou = false;
        this.subita = false;
        this.life = 100;
        this.direcao = this.direita ? "direita" : "esquerda";
        this.movimentando = false;
        this.animacao = "default";
        this.sprite = animacoes.get(`${this.nome}-${this.animacao}-${this.direcao}`)[this.indexanimacao];
    }
    movimento() {
        if (this.direita) {
            if (arrows.get("ArrowLeft")) {
                this.animacao = "esquerda";
                this.movimentando = true;
                this.x -= this.speed;
            }
            if (arrows.get("ArrowRight")) {
                this.animacao = "direita";
                this.movimentando = true;
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
            else {
                this.movimentando = false;
            }
        }
        else {
            if (keys.get("a")) {
                this.direcao = "esquerda";
                this.animacao = "andar";
                this.movimentando = true;
                this.x -= this.speed;
            }
            if (keys.get("d")) {
                this.direcao = "direita";
                this.animacao = "andar";
                this.movimentando = true;
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
    morte() {
        if (this.subita) {
            this.life -= 0.075;
        }
    }
    update() {
        this.movimento();
        if (this.movimentando) {
            this.indexanimacao += 0.20;
        }
        this.speed += this.gravidade;
        this.y += this.speed;
        if (this.y > objetos.get("chao").height - this.height) {
            this.y = objetos.get("chao").y - this.height;
            this.speed = 5;
        }
    }
    render(cor) {
        if (debug) {
            ctx.fillStyle = "white";
            ctx.font = `${sizeFont}px ARIAL`;
            ctx.fillText("vida: " + this.life, this.x, this.y - (6 * sizeFont));
            ctx.fillText("X: " + this.x.toFixed(0), this.x, this.y - (5 * sizeFont));
            ctx.fillText("Y: " + this.x.toFixed(0), this.x, this.y - (4 * sizeFont));
            ctx.fillText("velocidade: " + this.speed.toFixed(0), this.x - 25, this.y - (3 * sizeFont));
            ctx.fillText(`pulou: ${this.pulou ? "verdadeiro" : "falso"}`, this.x - 25, this.y - (2 * sizeFont));
            ctx.fillStyle = cor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        ctx.fillStyle = "white";
        ctx.font = `${sizeFont * 2}px ARIAL`;
        if (this.direita) {
            ctx.fillText(this.nome, WIDTH - (sizeFont * 6), sizeFont * 2);
            ctx.fillStyle = "#BF3017";
            ctx.fillRect(WIDTH - (this.maxLife * scale * 4), sizeFont * 3, this.maxLife * scale * 4, 35 * scale);
            ctx.fillStyle = "#2ABF77";
            ctx.fillRect(WIDTH - (this.life * scale * 4), sizeFont * 3, this.life * scale * 4, 35 * scale);
            const cir1 = new Path2D();
            const cir2 = new Path2D();
            ctx.strokeStyle = "black";
            ctx.fillStyle = this.rounds > 0 ? "#F2D841" : "#878787";
            cir1.arc(WIDTH - sizeFont, sizeFont * 6.5, sizeFont / 1.5, 0, 2 * Math.PI);
            ctx.stroke(cir1);
            ctx.fill(cir1);
            ctx.fillStyle = this.rounds > 1 ? "#F2D841" : "#878787";
            cir2.arc(WIDTH - (sizeFont * 3), sizeFont * 6.5, sizeFont / 1.5, 0, 2 * Math.PI);
            ctx.stroke(cir2);
            ctx.fill(cir2);
        }
        else {
            ctx.fillText(this.nome, sizeFont, sizeFont * 2);
            ctx.fillStyle = "#BF3017";
            ctx.fillRect(0, sizeFont * 3, this.maxLife * scale * 4, 35 * scale);
            ctx.fillStyle = "#2ABF77";
            ctx.fillRect(0, sizeFont * 3, this.life * scale * 4, 35 * scale);
            const cir1 = new Path2D();
            const cir2 = new Path2D();
            ctx.strokeStyle = "black";
            ctx.fillStyle = this.rounds > 0 ? "#F2D841" : "#878787";
            cir1.arc(sizeFont, sizeFont * 6.5, sizeFont / 1.5, 0, 2 * Math.PI);
            ctx.stroke(cir1);
            ctx.fill(cir1);
            ctx.fillStyle = this.rounds > 1 ? "#F2D841" : "#878787";
            cir2.arc(sizeFont * 3, sizeFont * 6.5, sizeFont / 1.5, 0, 2 * Math.PI);
            ctx.stroke(cir2);
            ctx.fill(cir2);
        }
        this.sprite = animacoes.get(`${this.nome}-${this.animacao}-${this.direcao}`)[this.indexanimacao];
        ctx.drawImage(imagens.get(this.nome), this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.x, this.y, this.width, this.height);
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
            case linha.slice(2, 10) == "time set":
                time = Number(linha.slice(11));
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
var _a;
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
let state = "init";
const times = [];
let fps = 0;
const canvas = $("#canvas").get()[0];
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
const scale = (WIDTH * HEIGHT) / (1360 * 768);
const objetos = new Map();
objetos.set("chao", new Objeto(0, HEIGHT - (75 * scale), WIDTH, (75 * scale), true));
function createImg(nome) {
    const img = new Image();
    img.src = nome;
    return img;
}
const imagens = new Map();
imagens.set("busao", createImg("./img/cenarios/busao.png"));
imagens.set("lincoln", createImg("./img/sprites/lincoln.png"));
imagens.set("ferraz", createImg("./img/sprites/ferraz.png"));
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
        window.requestAnimationFrame(main);
    }
}
let id = setInterval(() => { load(); }, 1);
let timeRun;
let subita = false;
let time = 200;
let newround = false;
let audios = new Map();
audios.set("fundo-cenario-1", new Audio("../audio/fundo-cenario-1.mp3"));
(_a = audios.get("fundo-cenario-1")) === null || _a === void 0 ? void 0 : _a.play();
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
const player1 = new Player((200 * scale), HEIGHT - (225 * scale), (50 * scale * 2), (150 * scale * 2), "lincoln");
const player2 = new Player(WIDTH - (150 * scale), HEIGHT - (225 * scale), (50 * scale * 2), (150 * scale * 2), "ferraz", true);
function main() {
    state = "loopando";
    newround = true;
    time = 200;
    timeRun = setInterval(() => { time--; }, 1000);
    loop();
}
function loop() {
    if (state == "loopando") {
        if (time <= 0) {
            time = 0;
            clearInterval(timeRun);
        }
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        update();
        render();
        window.requestAnimationFrame(loop);
    }
    else if (state == "novo") {
        vitoria();
        player1.reset();
        player2.reset();
        setTimeout(() => {
            newround = true;
            time = 200;
            state = "loopando";
            loop();
        }, 1500);
    }
    else if (state == "finalizou") {
        vitoria();
        newround = false;
        setTimeout(() => {
            player1.reset(true);
            player2.reset(true);
        });
    }
}
function update() {
    player1.update();
    player2.update();
    if (time == 0) {
        if (!player1.subita || !player2.subita) {
            subita = true;
            setTimeout(() => subita = false, 1500);
        }
        player1.subita = true;
        player2.subita = true;
        player1.morte();
        player2.morte();
    }
    if (player1.life <= 0) {
        player1.subita = false;
        player2.subita = false;
        player2.rounds++;
        state = player2.rounds == 2 ? "finalizou" : "novo";
    }
    if (player2.life <= 0) {
        player1.subita = false;
        player2.subita = false;
        player1.rounds++;
        state = player1.rounds == 2 ? "finalizou" : "novo";
    }
}
function render() {
    fundo();
    timer();
    if (newround) {
        novoRound();
        setTimeout(() => newround = false, 1000);
    }
    player1.render("red");
    player2.render("blue");
    if (subita) {
        morteSubita();
    }
    if (debug) {
        showFPS();
        showKeys();
    }
}
const sizeFont = (20 * scale);
function fundo() {
    ctx.drawImage(imagens.get("busao"), 0, 0, WIDTH, HEIGHT);
}
function showFPS() {
    ctx.fillStyle = "white";
    ctx.font = `${sizeFont}px ARIAL`;
    ctx.fillText("FPS: " + fps, 50, sizeFont * 8);
}
function timer() {
    ctx.fillStyle = "white";
    ctx.font = `${sizeFont * 3}px ARIAL`;
    ctx.fillText(time.toString(), WIDTH * 0.45, sizeFont * 4.5);
}
function morteSubita() {
    ctx.fillStyle = "red";
    ctx.font = `${sizeFont * 3}px ARIAL`;
    ctx.fillText("MORTE SUBITA!", WIDTH / 3, HEIGHT / 2);
}
function novoRound() {
    const round = player1.rounds + player2.rounds;
    ctx.fillStyle = "white";
    ctx.font = `${sizeFont * 3}px ARIAL`;
    ctx.fillText(`ROUND ${round != 0 ? round : 1}!`, WIDTH / 2.2, HEIGHT / 2);
}
function vitoria() {
    ctx.fillStyle = "#F2CF27";
    ctx.font = `${sizeFont * 3}px ARIAL`;
    if (player1.life == 0) {
        ctx.fillText(`${player2.nome.toUpperCase()}${player2.life == player2.maxLife ? " PERFECT" : " "}  WINS!`, WIDTH / 3, HEIGHT / 2);
    }
    else {
        ctx.fillText(`${player1.nome.toUpperCase()}${player1.life == player1.maxLife ? " PERFECT" : " "}  WINS!`, WIDTH / 3, HEIGHT / 2);
    }
}
function showKeys() {
    ctx.fillStyle = "white";
    ctx.font = `${sizeFont}px ARIAL`;
    ctx.fillText("input player1: " + debugTecla, 50, sizeFont * 9);
    ctx.fillText("input player2: " + debugArrow, 50, sizeFont * 10);
}
$(".h-win").css("height", `${window.innerHeight}px`);
$(".w-win").css("width", `${window.innerWidth}px`);
