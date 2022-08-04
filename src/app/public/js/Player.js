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
class Player {
    constructor(hp, dano, x, y, esquerda, nome) {
        this.hp = hp;
        this.life = hp;
        this.dano = dano;
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(this.x, this.y);
        this.colisao = new Colisao(this.x, this.y);
        this.esquerda = esquerda;
        this.nome = nome;
        this.posicao = [0, 2, 0];
        this.inputliberado = true;
        this.ataque = new Colisao(0, 0);
        this.hit = false;
        this.isMove = [true, true];
        this.lastKey = ' ';
        this.isDefense = false;
        this.defesa = 3;
        this.morto = false;
        this.vitorias = 0;
        this.init();
    }
    init() {
        this.posicao = [0, 2, 0];
        this.hit = false;
        this.isMove = [true, true];
        this.lastKey = ' ';
        this.isDefense = false;
        this.defesa = 3;
        this.morto = false;
        this.inputliberado = true;
        this.life = this.hp;
        if (this.esquerda) {
            this.sprite.setSprite("andar", 2, this.nome);
            this.colisao.x = this.x + 25;
            this.colisao.y = this.y - 10;
            this.colisao.width = this.sprite.imagem.width / 1.7;
            this.colisao.height = this.sprite.imagem.height;
        }
        else {
            this.sprite.setSprite("andar", 0, this.nome);
            this.colisao.x = this.x + 25;
            this.colisao.y = this.y - 10;
            this.colisao.width = this.sprite.imagem.width / 1.7;
            this.colisao.height = this.sprite.imagem.height;
        }
    }
    movimento(moveset, delta) {
        if (this.inputliberado) {
            switch (moveset) {
                case 'esquerda':
                    if (this.isMove[0]) {
                        this.posicao[2] = 0;
                        this.sprite.setSprite("andar", this.posicao[0], this.nome);
                        this.colisao.x = this.x + 60;
                        this.colisao.y = this.y + 10;
                        this.colisao.width = this.sprite.imagem.width / 2.5;
                        this.colisao.height = this.sprite.imagem.height - 20;
                        this.posicao[0] += 1;
                        if (this.posicao[0] > 1) {
                            this.posicao[0] = 0;
                        }
                        this.x -= speed(delta, 1000);
                    }
                    break;
                case 'direita':
                    if (this.isMove[1]) {
                        this.posicao[2] = 1;
                        this.sprite.setSprite("andar", this.posicao[1], this.nome);
                        this.colisao.x = this.x + 60;
                        this.colisao.y = this.y + 10;
                        this.colisao.width = this.sprite.imagem.width / 2.5;
                        this.colisao.height = this.sprite.imagem.height - 20;
                        this.posicao[1] += 1;
                        if (this.posicao[1] > 3) {
                            this.posicao[1] = 2;
                        }
                        this.x += speed(delta, 1000);
                    }
                    break;
                case 'soco':
                    if (!this.hit) {
                        this.sprite.setSprite("socofraco", this.posicao[2], this.nome);
                        this.ataque.height = 25;
                        this.ataque.width = this.sprite.width / 2;
                        if (this.posicao[2] == 1) {
                            this.ataque.x = this.x + this.colisao.width;
                        }
                        else {
                            this.ataque.x = (this.x + 85) - this.colisao.width;
                        }
                        this.ataque.y = this.y + (this.colisao.height / 4);
                        setTimeout(() => { this.limparColisao(), 10; });
                        setTimeout(() => {
                            this.sprite.setSprite("andar", this.posicao[this.posicao[2]], this.nome);
                        }, 600);
                    }
                    // this.posicao[0] += 1
                    // if (this.posicao[0] > 1) {
                    //     this.posicao[0] = 0
                    // }
                    // this.x -= speed(delta, 1000)
                    break;
                case 'defesa':
                    if (this.defesa > 0) {
                        this.isDefense = true;
                        this.sprite.setSprite("defesaalta", this.posicao[2], this.nome);
                    }
                    //setTimeout(() => { this.sprite.setSprite("andar", this.posicao[this.posicao[2]], this.nome) }, 5)
                    break;
                case 'baixo':
                    if (this.defesa > 0) {
                        this.isDefense = true;
                        this.sprite.setSprite("defesabaixa", this.posicao[2], this.nome);
                        this.colisao.y = this.sprite.y + 100;
                        this.colisao.width = this.sprite.imagem.width / 2.5;
                        this.colisao.height = this.sprite.imagem.height / 2;
                    }
                    //setTimeout(() => { this.sprite.setSprite("andar", this.posicao[this.posicao[2]], this.nome) }, 5)
                    break;
            }
            this.inputliberado = false;
            setTimeout(() => { this.inputliberado = true; }, 100);
        }
    }
    limparColisao() {
        this.ataque.height = 0;
        this.ataque.width = 0;
        this.ataque.x = 0;
        this.ataque.y = 0;
    }
    update(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let adicao = !this.isDefense;
            if (adicao) {
                if (this.defesa < 3) {
                    adicao = false;
                    this.defesa++;
                    setTimeout(() => { adicao = true; }, 1000);
                }
            }
            if (yield this.colisao.colidiu(obj.colisao)) {
                if (this.sprite.getSprite("andar", 0, this.nome) || this.sprite.getSprite("andar", 1, this.nome)) {
                    if (this.esquerda) {
                        this.isMove = [false, true];
                        this.x -= 4;
                        this.colisao.x -= 4;
                    }
                    else {
                        this.isMove = [false, true];
                        this.x += 2;
                        this.colisao.x += 2;
                    }
                }
                else if (this.sprite.getSprite("andar", 2, this.nome) || this.sprite.getSprite("andar", 3, this.nome)) {
                    if (this.esquerda) {
                        this.isMove = [false, true];
                        this.x -= 2;
                        this.colisao.x -= 2;
                    }
                    else {
                        this.isMove = [false, true];
                        this.x += 2;
                        this.colisao.x += 2;
                    }
                }
            }
            else {
                this.isMove = [true, true];
            }
            if ((yield this.ataque.colidiu(obj.colisao)) && !obj.isDefense) {
                obj.levarDano(this.dano);
                this.hit = true;
                setTimeout(() => { this.hit = false; }, 1000);
            }
            else if ((yield this.ataque.colidiu(obj.colisao)) && obj.isDefense) {
                if (obj.defesa > 0) {
                    obj.setDefesa(obj.defesa - 1);
                }
                else {
                    obj.isDefense = false;
                }
            }
            // if (obj.defesa < 3 && obj.defesa >= 0) {
            //     setTimeout(() => {obj.setDefesa(obj.defesa + 1)} , 1000)
            // }
            if (this.life < 0) {
                this.life = 0;
            }
            if (this.life == 0) {
                this.morto = true;
                this.sprite.setSprite("selecao", 0, this.nome);
                setTimeout(() => { rodando = false; }, 500);
            }
        });
    }
    setDefesa(valor) {
        this.defesa = valor;
    }
    levarDano(dano) {
        this.life -= dano;
    }
    render(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (debug) {
                yield this.colisao.render(obj);
                yield this.ataque.render(obj);
                ctx.font = "20px arial";
                ctx.fillStyle = "#DB3547";
                ctx.fillText(`X: ${this.x}`, this.x + 50, this.y + this.colisao.height - 325);
                ctx.fillText(`Y: ${this.y}`, this.x + 50, this.y + this.colisao.height - 350);
                ctx.fillText(`LIFE: ${this.life}`, this.x + 50, this.y + this.colisao.height - 375);
                ctx.fillText(`DEFESA ATIVA: ${this.isDefense}`, this.x + 50, this.y + this.colisao.height - 400);
                ctx.fillText(`DEFESAS: ${this.defesa}`, this.x + 50, this.y + this.colisao.height - 425);
            }
            if (this.esquerda) {
                ctx.font = "20px arial";
                ctx.fillStyle = "#AD3B47";
                ctx.fillRect(0, 40, this.hp * 5.5, 25);
                ctx.fillStyle = "#46AB5A";
                ctx.fillRect(0, 40, this.life * 5.5, 25);
                ctx.drawImage(this.sprite.imagem, this.x, this.y);
                ctx.fillStyle = "#F0C60C";
                ctx.fillText(`${this.nome.toUpperCase()}`, 10, 60);
                circulo(15, 80, (this.vitorias >= 1) ? "#D4B024" : "#BDBDBD");
                circulo(45, 80, (this.vitorias == 2) ? "#D4B024" : "#BDBDBD");
            }
            else {
                ctx.font = "20px arial";
                ctx.fillStyle = "#AD3B47";
                ctx.fillRect(LARGURA - (this.hp * 5.5), 40, (this.hp * 5.5), 25);
                ctx.drawImage(this.sprite.imagem, this.x, this.y);
                ctx.fillStyle = "#46AB5A";
                ctx.fillRect(LARGURA - (this.life * 5.5), 40, (this.life * 5.5), 25);
                ctx.drawImage(this.sprite.imagem, this.x, this.y);
                ctx.fillStyle = "#F0C60C";
                ctx.fillText(`${this.nome.toUpperCase()}`, LARGURA - 150, 60);
                circulo(LARGURA - 15, 80, (this.vitorias >= 1) ? "#D4B024" : "#BDBDBD");
                circulo(LARGURA - 45, 80, (this.vitorias == 2) ? "#D4B024" : "#BDBDBD");
            }
        });
    }
}
const players = [
    new Player(100, 5, 0, ALTURA - 280, true, "lincoln"),
    new Player(100, 5, LARGURA - 200, ALTURA - 280, false, "ferraz")
];
