"use strict";
class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = LARGURA;
        this.height = ALTURA;
    }
    update(players) {
        players.forEach((player) => {
            if (player.x > LARGURA && this.x < 1920 - LARGURA) {
                this.x += player.sprite.width;
            }
            if (player.x < this.x && this.x > 0) {
                this.x -= player.sprite.width;
            }
        });
    }
    render(img) {
        this.width = img.width;
        this.height = img.height;
        ctx.drawImage(img, this.x, this.y, LARGURA, ALTURA, 0, 0, LARGURA, ALTURA);
    }
}
const camera = new Camera();
