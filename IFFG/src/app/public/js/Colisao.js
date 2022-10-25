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
class Colisao {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = 0 | width;
        this.width = 0 | height;
    }
    colidiu(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                let colisor = false;
                if (this.x < obj.x + obj.width &&
                    this.x + this.width > obj.x &&
                    this.y < obj.y + obj.height &&
                    this.y + this.height > obj.y) {
                    colisor = true;
                }
                resolve(colisor);
            });
        });
    }
    render(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.colidiu(obj)) {
                ctx.fillStyle = "#7A0A1E";
            }
            else {
                ctx.fillStyle = "#BFBFBF";
            }
            ctx.fillRect(this.x, this.y, this.width, this.height);
        });
    }
}
