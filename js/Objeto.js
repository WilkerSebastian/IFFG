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
