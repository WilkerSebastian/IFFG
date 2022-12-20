"use strict";
class Animacao {
    constructor(cortes, coeficiente) {
        this.index = 0;
        this.maxIndex = cortes.length;
        this.coeficiente = coeficiente;
        this.cortes = cortes;
        this.sprite = new Image();
        this.pulo = false;
    }
    dano(nome, direcao) {
    }
    pular(nome) {
        this.pulo = true;
        this.sprite.src = `../img/sprite/${nome}/pulo.png`;
    }
    especial(nome) {
        this.pulo = false;
        this.sprite.src = `../img/sprite/`;
    }
    defesa() {
        this.pulo = false;
    }
    ataque() {
        this.pulo = false;
    }
    default() {
        this.pulo = false;
    }
    andar() {
        this.pulo = false;
    }
    render(x, y, width, height) {
        if (this.cortes.length != 1) {
            if (this.index > this.maxIndex) {
                this.index = 0;
            }
            else {
                this.index += this.coeficiente;
            }
        }
        const index = Number(this.index.toFixed(0));
        const corte = this.cortes[index];
    }
}
var _a, _b, _c;
class Audios {
    constructor(musica, efeito, voz) {
        this.efeito = efeito;
        this.musica = musica;
        this.voz = voz;
    }
    getVolume() {
        $("#musica").val(this.musica);
        $("#efeito").val(this.efeito);
        $("#voz").val(this.voz);
    }
    setVolume() {
        cenarioAudio.volume = this.musica;
    }
}
const master = new Audios(50, 50, 50);
master.getVolume();
(_a = document.getElementById("musica")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
});
(_b = document.getElementById("efeito")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", () => {
});
(_c = document.getElementById("voz")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", () => {
});
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
    constructor(x, y, width, height, nome, dano, direita) {
        super(x, y, width, height, true);
        this.gravidade = 0.8 * scale;
        this.speed = 5 * scale;
        this.forcaDoPulo = 23 * scale;
        this.direita = direita !== null && direita !== void 0 ? direita : false;
        this.pulou = false;
        this.nome = nome;
        this.subita = false;
        this.life = 100;
        this.maxLife = 100;
        this.rounds = 0;
        this.indexAnimacao = 0;
        this.acimaDoChao = false;
        this.defesa = false;
        this.podeAtacar = true;
        this.audio = new Audio();
        this.direcao = !this.direita ? "direita" : "esquerda";
        this.sprite = new Image();
        this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/default.png`;
        this.ataque = false;
        this.dano = dano;
        this.setSize(this.sprite.width, this.sprite.height);
    }
    setSize(width, height) {
        switch (this.nome) {
            case "ferraz":
                this.width = width;
                this.height = height;
                break;
            case "lincoln":
                this.width = width / 1.35;
                this.height = height / 1.35;
                break;
        }
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
        this.acimaDoChao = false;
        this.indexAnimacao = 0;
        this.pulou = false;
        this.subita = false;
        this.life = 100;
        this.direcao = !this.direita ? "direita" : "esquerda";
        this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/default.png`;
        this.setSize(this.sprite.width, this.sprite.height);
    }
    frameLimiter(limite) {
        this.indexAnimacao += 0.16;
        let index = Number(this.indexAnimacao.toFixed(0));
        if (!(index < limite)) {
            this.indexAnimacao = 0;
            index = 0;
        }
        return index;
    }
    movimento() {
        if (this.direita) {
            if (arrows.get("ArrowDown")) {
                if (this.acimaDoChao) {
                    this.y += this.speed;
                }
                else {
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/abaixado.png`;
                }
            }
            else {
                if (arrows.get("ArrowLeft")) {
                    this.direcao = "esquerda";
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/andar-${this.frameLimiter(4)}.png`;
                    this.x -= this.speed;
                }
                if (arrows.get("ArrowRight")) {
                    this.direcao = "direita";
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/andar-${this.frameLimiter(4)}.png`;
                    this.x += this.speed;
                }
                if (arrows.get("ArrowUp")) {
                    if (!this.pulou) {
                        this.pulou = true;
                        setTimeout(() => this.pulou = false, 2000);
                    }
                }
                if (arrows.get("k") && this.podeAtacar) {
                    this.ataque = true;
                    setTimeout(() => this.ataque = false, 50);
                    this.podeAtacar = false;
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/soco-0.png`;
                    setTimeout(() => this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/soco-1.png`, 250);
                    setTimeout(() => this.podeAtacar = true, 1000);
                }
                if (arrows.get("p") && this.podeAtacar) {
                    this.ataque = true;
                    setTimeout(() => this.ataque = false, 50);
                    this.podeAtacar = false;
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/chute-1.png`;
                    setTimeout(() => this.podeAtacar = true, 1000);
                }
            }
            if (debugArrow == "nenhuma") {
                this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/default.png`;
            }
        }
        else {
            if (keys.get("s")) {
                if (this.acimaDoChao) {
                    this.y += this.speed;
                }
                else {
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/abaixado.png`;
                }
            }
            else if (keys.get("g")) {
                this.defesa = true;
                this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/defesa.png`;
            }
            else {
                this.defesa = false;
                if (keys.get("a")) {
                    this.direcao = "esquerda";
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/andar-${this.frameLimiter(4)}.png`;
                    this.x -= this.speed;
                }
                if (keys.get("d")) {
                    this.direcao = "direita";
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/andar-${this.frameLimiter(4)}.png`;
                    this.x += this.speed;
                }
                if (keys.get("w")) {
                    if (!this.pulou) {
                        this.pulou = true;
                        setTimeout(() => this.pulou = false, 2000);
                    }
                }
                if (keys.get("q") && this.podeAtacar) {
                    this.ataque = true;
                    setTimeout(() => this.ataque = false, 50);
                    this.podeAtacar = false;
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/soco-0.png`;
                    setTimeout(() => this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/soco-1.png`, 250);
                    setTimeout(() => this.podeAtacar = true, 1000);
                }
                if (keys.get("e") && this.podeAtacar) {
                    this.ataque = true;
                    setTimeout(() => this.ataque = false, 50);
                    this.podeAtacar = false;
                    this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/chute-1.png`;
                    setTimeout(() => this.podeAtacar = true, 1000);
                }
            }
            if (debugTecla == "nenhuma") {
                this.sprite.src = `../img/sprites/${this.nome}/${this.direcao}/default.png`;
            }
        }
    }
    morte() {
        if (this.subita) {
            this.life -= 0.075;
        }
    }
    levaDano(valor) {
        if (!this.defesa) {
            this.life -= valor;
            this.life = this.life < 0 ? 0 : this.life;
        }
    }
    update() {
        let colisor;
        this.movimento();
        this.speed += this.gravidade;
        this.y += this.speed;
        if (this.direita) {
            colisor = player1.isCollided(this);
        }
        else {
            colisor = player2.isCollided(this);
        }
        if (colisor.collided) {
            if (this.direita) {
                player1.levaDano(this.ataque ? this.dano : 0);
                corDebugP2 = "purple";
            }
            else {
                player2.levaDano(this.ataque ? this.dano : 0);
                corDebugP1 = "purple";
            }
        }
        else {
            if (this.direita) {
                corDebugP2 = "red";
            }
            else {
                corDebugP1 = "blue";
            }
        }
        if (this.x + this.width > WIDTH) {
            this.x = WIDTH - this.width;
        }
        if (this.x + this.width < this.width) {
            this.x = 0;
        }
        if (this.y > objetos.get("chao").height - this.height) {
            this.acimaDoChao = false;
            this.y = objetos.get("chao").y - this.height;
            this.speed = 5;
        }
        else {
            this.acimaDoChao = true;
        }
    }
    render() {
        if (debug) {
            ctx.fillStyle = "white";
            ctx.font = `${sizeFont}px ARIAL`;
            ctx.fillText(`atacou: ${this.ataque ? "sim" : "não"}`, this.x, this.y - (7 * sizeFont));
            ctx.fillText("vida: " + this.life, this.x, this.y - (6 * sizeFont));
            ctx.fillText("X: " + this.x.toFixed(0), this.x, this.y - (5 * sizeFont));
            ctx.fillText("Y: " + this.x.toFixed(0), this.x, this.y - (4 * sizeFont));
            ctx.fillText("velocidade: " + this.speed.toFixed(0), this.x - 25, this.y - (3 * sizeFont));
            ctx.fillText(`pulou: ${this.pulou ? "verdadeiro" : "falso"}`, this.x - 25, this.y - (2 * sizeFont));
            ctx.fillStyle = this.direita ? corDebugP1 : corDebugP2;
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
        this.setSize(this.sprite.width, this.sprite.height);
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
    perdeu() {
        this.sprite.src = `../img/sprites/${this.nome}/derrota-1.png`;
        this.setSize(this.sprite.width, this.sprite.height);
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
    vitoria() {
        this.sprite.src = `../img/sprites/${this.nome}/vitoria-1.png`;
        this.setSize(this.sprite.width, this.sprite.height);
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
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
            case linha.slice(2, 10) == "life set":
                const life = Number(linha.slice(11, linha.indexOf(" -")));
                if (linha.slice(linha.indexOf("p")) == "p1") {
                    player1.life -= life;
                    resposta += `${player1.nome} levou de dano ${life}`;
                }
                else if (linha.slice(linha.indexOf("p")) == "p2") {
                    player2.life -= life;
                    resposta += `${player2.nome} levou de dano ${life}`;
                }
                else {
                    resposta += "not found player";
                }
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
let state = "init";
const times = [];
let fps = 0;
const canvas = $("#canvas").get()[0];
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
const scale = (WIDTH * HEIGHT) / (1360 * 768);
function saiuDoMundo(x, width) {
    if (x + width > WIDTH || x + width < 0) {
        return true;
    }
    return false;
}
const objetos = new Map();
objetos.set("chao", new Objeto(0, HEIGHT - (75 * scale), WIDTH, (75 * scale), true));
function createImg(nome) {
    const img = new Image();
    img.src = nome;
    return img;
}
const imagens = new Map();
imagens.set("busao", createImg("../img/cenarios/busao.png"));
imagens.set("lincoln", createImg("../img/sprites/lincoln.png"));
imagens.set("ferraz", createImg("../img/sprites/ferraz.png"));
const keys = new Map();
keys.set("a", false);
keys.set("d", false);
keys.set("w", false);
keys.set("s", false);
keys.set("q", false);
keys.set("e", false);
keys.set("g", false);
const arrows = new Map();
arrows.set("ArrowLeft", false);
arrows.set("ArrowRight", false);
arrows.set("ArrowUp", false);
arrows.set("ArrowDown", false);
arrows.set("k", false);
arrows.set("p", false);
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
let id = setInterval(() => { load(); }, 1);
let rounds = 0;
let timeRun;
let subita = false;
let time = 200;
let newround = false;
const background = new Image();
const cenarioAudio = new Audio();
let debug = false;
let debugTecla = 'nenhuma';
let debugArrow = 'nenhuma';
let corDebugP1 = "red";
let corDebugP2 = "blue";
window.addEventListener("keydown", (evento) => {
    if (evento.ctrlKey && evento.key.toLocaleLowerCase() == "k") {
        debug = !debug;
        terminal.setVisible(debug);
    }
    if (keys.get(evento.key.toLocaleLowerCase()) != undefined) {
        debugTecla = evento.key.toLocaleLowerCase();
        keys.set(evento.key.toLocaleLowerCase(), true);
    }
    if (arrows.get(evento.key) != undefined) {
        debugArrow = evento.key;
        arrows.set(evento.key, true);
    }
});
window.addEventListener("keyup", (evento) => {
    if (keys.get(evento.key.toLocaleLowerCase()) != undefined) {
        debugTecla = "nenhuma";
        keys.set(evento.key.toLocaleLowerCase(), false);
    }
    if (arrows.get(evento.key) != undefined) {
        debugArrow = "nenhuma";
        arrows.set(evento.key, false);
    }
});
const player1 = new Player((200 * scale), HEIGHT - (225 * scale), (50 * (scale + 0.2) * 2), (150 * (scale + 0.2) * 2), "lincoln", 5);
const player2 = new Player(WIDTH - (150 * scale), HEIGHT - (225 * scale), (50 * (scale + 0.2) * 2), (150 * (scale + 0.2) * 2), "ferraz", 5, true);
function main() {
    rounds = 1;
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
        rounds++;
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
            menuInicial();
        }, 3000);
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
    player1.render();
    player2.render();
    if (subita) {
        morteSubita();
    }
    if (debug) {
        showFPS();
        showKeys();
    }
}
const playerSelecionado = { p1: false, p2: false };
let ceneraioSelecionado = false;
let index = 0;
let i = 0;
const nomes = ["ferraz", "lincoln", "helton", "luciano", "sophia"];
const cenarios = ["busao", "bloco", "fazenda", "ifmaker", "planice"];
function jogarGrade() {
    $("#gradepersona").css("display", "block");
    $("#gradecenario").css("display", "none");
    $("#configjogo").css("display", "none");
    $("#iniciojogo").css("display", "none");
    $("#jogo").css("display", "none");
}
function menuInicial() {
    debug = $("#debug").prop("checked");
    $("body").css("background-image", `url("../img/plano_menu.jpg")`);
    $("#gradepersona").css("display", "none");
    $("#gradecenario").css("display", "none");
    $("#configjogo").css("display", "none");
    $("#iniciojogo").css("display", "block");
    $("#jogo").css("display", "none");
}
function cenarioGrade() {
    $("body").css("background-image", `url("../img/cenarios/naoselecionado.png")`);
    $("#gradepersona").css("display", "none");
    $("#gradecenario").css("display", "block");
    $("#configjogo").css("display", "none");
    $("#iniciojogo").css("display", "none");
    $("#jogo").css("display", "none");
}
function configJogo() {
    $("#gradepersona").css("display", "none");
    $("#gradecenario").css("display", "none");
    $("#configjogo").css("display", "block");
    $("#iniciojogo").css("display", "none");
    $("#jogo").css("display", "none");
}
function jogar() {
    $("#gradepersona").css("display", "none");
    $("#gradecenario").css("display", "none");
    $("#configjogo").css("display", "none");
    $("#iniciojogo").css("display", "none");
    $("#jogo").css("display", "block");
    main();
}
function changeImage(path) {
    let nome = path.slice(7);
    nome = nome.slice(0, nome.indexOf("g"));
    if (playerSelecionado.p1 && !(playerSelecionado.p2)) {
        $("#p2").text(`P2: ${nome}`);
        $("#conteudoItself2").attr("src", path);
    }
    else if (!playerSelecionado.p1) {
        $("#p1").text(`P1: ${nome}`);
        $("#conteudoItself").attr("src", path);
    }
}
function aleatorio() {
    if (index < nomes.length - 1) {
        i = Math.round(Math.random() * nomes.length - 1);
        changeImage(`../img/${nomes[i]}grademaior.png`);
        index++;
        setTimeout(() => {
            aleatorio();
        }, 500);
    }
    else {
        index = 0;
        selecao(nomes[i]);
    }
}
function selecao(nome) {
    if (playerSelecionado.p1 && !(playerSelecionado.p2)) {
        player2.nome = nome;
        playerSelecionado.p2 = true;
        setTimeout(cenarioGrade, 2000);
    }
    else if (!playerSelecionado.p1) {
        playerSelecionado.p1 = true;
        player1.nome = nome;
    }
}
function selecaoCenario(path) {
    ceneraioSelecionado = true;
    background.src = path;
    jogar();
}
function mudarFundo(path) {
    if (!ceneraioSelecionado) {
        $("body").css("background-image", `url(${path})`);
    }
}
function aleatorioFundo() {
    if (index < cenarios.length - 1) {
        i = Math.round(Math.random() * cenarios.length - 1);
        mudarFundo(`../img/cenarios/${cenarios[i]}.png`);
        index++;
        setTimeout(() => {
            aleatorioFundo();
        }, 500);
    }
    else {
        index = 0;
        selecaoCenario(`../img/cenarios/${cenarios[i]}.png`);
    }
}
const sizeFont = (20 * scale);
function fundo() {
    ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
}
function showFPS() {
    ctx.fillStyle = "white";
    ctx.font = `${sizeFont}px ARIAL`;
    ctx.fillText("FPS: " + fps, 50, sizeFont * 8);
}
function timer() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.font = `${sizeFont * 3}px ARIAL`;
    ctx.fillText(time.toString(), WIDTH * 0.45, sizeFont * 4.5);
    ctx.font = `${sizeFont * 3}px ARIAL`;
    ctx.strokeText(time.toString(), WIDTH * 0.45, sizeFont * 4.5);
}
function morteSubita() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    ctx.font = `${sizeFont * 5}px street`;
    ctx.fillText("MORTE SUBITA!", WIDTH / 3, HEIGHT / 2);
    ctx.font = `${sizeFont * 5}px street`;
    ctx.strokeText("MORTE SUBITA!", WIDTH / 3, HEIGHT / 2);
}
function novoRound() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.font = `${sizeFont * 5}px street`;
    ctx.fillText(`ROUND ${rounds}!`, WIDTH / 2.5, HEIGHT / 2);
    ctx.font = `${sizeFont * 5}px street`;
    ctx.strokeText(`ROUND ${rounds}!`, WIDTH / 2.5, HEIGHT / 2);
}
function vitoria() {
    ctx.fillStyle = "#F2CF27";
    ctx.font = `${sizeFont * 3}px street`;
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
