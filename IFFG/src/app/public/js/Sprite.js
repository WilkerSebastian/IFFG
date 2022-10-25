"use strict";
class Sprite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 0;
        this.width = 0;
        this.imagem = new Image();
    }
    setSprite(movimento, direcao, nome) {
        this.imagem.src = `/public/img/${nome}/${movimento}-${direcao}.png`;
        this.width = this.imagem.width;
        this.height = this.imagem.height;
    }
    getSprite(movimento, direcao, nome) {
        if (`/public/img/${nome}/${movimento}-${direcao}.png` == this.imagem.src.slice(21)) {
            return true;
        }
        return false;
    }
}
