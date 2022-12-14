class Player extends Objeto {

    gravidade: number
    speed: number
    forcaDoPulo: number
    direita: boolean
    pulou: boolean
    nome: string
    life: number
    maxLife: number
    subita: boolean
    rounds: number
    animacao: string
    direcao:string
    movimentando:boolean
    sprite:Animacao
    indexanimacao:number

    constructor(x: number, y: number, width: number, height: number, nome: string, direita?: boolean) {

        super(x, y, width, height, true)
        this.gravidade = 0.8 * scale
        this.speed = 5 * scale
        this.forcaDoPulo = 23 * scale
        this.direita = direita ?? false
        this.pulou = false
        this.nome = nome
        this.subita = false
        this.life = 100
        this.indexanimacao = 0;
        this.maxLife = 100
        this.rounds = 0
        this.direcao = this.direita ? "direita" : "esquerda"
        this.movimentando = false
        this.animacao = "default"
        this.sprite = (animacoes.get(`${this.nome}-${this.animacao}-${this.direcao}`) as Animacao[])[this.indexanimacao]

    }

    reset(init?: boolean) {

        if (init) {

            this.rounds = 0

        }

        if (this.direita) {

            this.x = WIDTH - (150 * scale)
            this.y = HEIGHT - (225 * scale)
            this.width = (50 * scale)
            this.height = (150 * scale)

        } else {

            this.x = (200 * scale)
            this.y = HEIGHT - (225 * scale)
            this.width = (50 * scale)
            this.height = (150 * scale)

        }

        this.pulou = false
        this.subita = false
        this.life = 100
        this.direcao = this.direita ? "direita" : "esquerda"
        this.movimentando = false
        this.animacao = "default"
        this.sprite = (animacoes.get(`${this.nome}-${this.animacao}-${this.direcao}`) as Animacao[])[this.indexanimacao]

    }

    movimento() {

        // parte inicial de condicionais de movimento
        if (this.direita) {

            if (arrows.get("ArrowLeft")) {

                this.animacao = "esquerda"
                this.movimentando = true
                this.x -= this.speed

            }
            if (arrows.get("ArrowRight")) {

                this.animacao = "direita"
                this.movimentando = true
                this.x += this.speed

            }
            if (arrows.get("ArrowUp")) {

                if (!this.pulou) {

                    this.pulou = true
                    setTimeout(() => this.pulou = false, 2000)

                }

            }
            if (arrows.get("ArrowDown")) {

                this.y += this.speed

            } else {

                this.movimentando = false

            }

        } else {

            if (keys.get("a")) {

                this.direcao = "esquerda"
                this.animacao = "andar"
                this.movimentando = true
                this.x -= this.speed

            }
            if (keys.get("d")) {

                this.direcao = "direita"
                this.animacao = "andar"
                this.movimentando = true
                this.x += this.speed

            }
            if (keys.get("w")) {

                if (!this.pulou) {

                    this.pulou = true
                    setTimeout(() => this.pulou = false, 2000)

                }

            }
            if (keys.get("s")) {

                this.y += this.speed

            }

        }
        // fim da parte de condicionais de movimento

    }

    morte() {

        if (this.subita) {

            this.life -= 0.075

        }

    }

    update() {

        this.movimento()

        if (this.movimentando) {
         
            this.indexanimacao += 0.20

        }

        this.speed += this.gravidade
        this.y += this.speed

        if (this.y > (objetos.get("chao") as Objeto).height - this.height) {

            this.y = (objetos.get("chao") as Objeto).y - this.height
            this.speed = 5

        }

    }

    render(cor: string) {

        if (debug) {

            ctx.fillStyle = "white"
            ctx.font = `${sizeFont}px ARIAL`
            ctx.fillText("vida: " + this.life, this.x, this.y - (6 * sizeFont))
            ctx.fillText("X: " + this.x.toFixed(0), this.x, this.y - (5 * sizeFont))
            ctx.fillText("Y: " + this.x.toFixed(0), this.x, this.y - (4 * sizeFont))
            ctx.fillText("velocidade: " + this.speed.toFixed(0), this.x - 25, this.y - (3 * sizeFont))
            ctx.fillText(`pulou: ${this.pulou ? "verdadeiro" : "falso"}`, this.x - 25, this.y - (2 * sizeFont))

            ctx.fillStyle = cor
            ctx.fillRect(this.x, this.y, this.width, this.height)

        }

        ctx.fillStyle = "white"
        ctx.font = `${sizeFont * 2}px ARIAL`

        if (this.direita) {

            ctx.fillText(this.nome, WIDTH - (sizeFont * 6), sizeFont * 2)

            ctx.fillStyle = "#BF3017"
            ctx.fillRect(WIDTH - (this.maxLife * scale * 4), sizeFont * 3, this.maxLife * scale * 4, 35 * scale)

            ctx.fillStyle = "#2ABF77"
            ctx.fillRect(WIDTH - (this.life * scale * 4), sizeFont * 3, this.life * scale * 4, 35 * scale)

            const cir1 = new Path2D()
            const cir2 = new Path2D()

            ctx.strokeStyle = "black"
            ctx.fillStyle = this.rounds > 0 ? "#F2D841" : "#878787"

            cir1.arc(WIDTH - sizeFont, sizeFont * 6.5, sizeFont / 1.5, 0, 2 * Math.PI)
            ctx.stroke(cir1)
            ctx.fill(cir1)

            ctx.fillStyle = this.rounds > 1 ? "#F2D841" : "#878787"

            cir2.arc(WIDTH - (sizeFont * 3), sizeFont * 6.5, sizeFont / 1.5, 0, 2 * Math.PI)
            ctx.stroke(cir2)
            ctx.fill(cir2)


        } else {

            ctx.fillText(this.nome, sizeFont, sizeFont * 2)

            ctx.fillStyle = "#BF3017"
            ctx.fillRect(0, sizeFont * 3, this.maxLife * scale * 4, 35 * scale)

            ctx.fillStyle = "#2ABF77"
            ctx.fillRect(0, sizeFont * 3, this.life * scale * 4, 35 * scale)

            const cir1 = new Path2D()
            const cir2 = new Path2D()

            ctx.strokeStyle = "black"
            ctx.fillStyle = this.rounds > 0 ? "#F2D841" : "#878787"

            cir1.arc(sizeFont, sizeFont * 6.5, sizeFont / 1.5, 0, 2 * Math.PI)
            ctx.stroke(cir1)
            ctx.fill(cir1)

            ctx.fillStyle = this.rounds > 1 ? "#F2D841" : "#878787"

            cir2.arc(sizeFont * 3, sizeFont * 6.5, sizeFont / 1.5, 0, 2 * Math.PI)
            ctx.stroke(cir2)
            ctx.fill(cir2)

        }

        this.sprite = (animacoes.get(`${this.nome}-${this.animacao}-${this.direcao}`) as Animacao[])[this.indexanimacao]

        ctx.drawImage(imagens.get(this.nome) as HTMLImageElement,this.sprite.x , this.sprite.y,this.sprite.width , this.sprite.height, this.x , this.y , this.width , this.height)

    }

}