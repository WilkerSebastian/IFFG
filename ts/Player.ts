class Player extends Objeto {

    gravidade: number
    speed: number
    forcaDoPulo: number
    direita: boolean
    pulou:boolean
    nome:string
    life:number
    maxLife:number

    constructor(x: number, y: number, width: number, height:number,nome:string, direita?: boolean) {

        super(x, y, width, height, true)
        this.gravidade = 0.8 * scale
        this.speed = 5 * scale
        this.forcaDoPulo = 23 * scale
        this.direita = direita ?? false
        this.pulou = false
        this.nome = nome
        this.life = 100
        this.maxLife = 100

    }

    movimento() {

        // parte inicial de condicionais de movimento
        if (this.direita) {

            if (arrows.get("ArrowLeft")) {

                this.x -= this.speed

            }
            if (arrows.get("ArrowRight")) {

                this.x += this.speed

            }
            if (arrows.get("ArrowUp")) {

                if (!this.pulou) {
                     
                    this.pulou = true
                    setTimeout(() => this.pulou = false , 2000)  

                }

            }
            if (arrows.get("ArrowDown")) {

                this.y += this.speed

            }

        } else {

            if (keys.get("a")) {

                this.x -= this.speed

            }
            if (keys.get("d")) {

                this.x += this.speed

            }
            if (keys.get("w")) {

                if (!this.pulou) {

                    this.pulou = true
                    setTimeout(() => this.pulou = false , 2000)  

                } 

            }
            if (keys.get("s")) {

                this.y += this.speed

            }

        }
        // fim da parte de condicionais de movimento

    }

    update() {

        this.movimento()

        this.speed += this.gravidade
        this.y += this.speed

        if (this.y > (objetos.get("chao") as Objeto).height - this.height) {

            this.y = (objetos.get("chao") as Objeto).y - this.height
            this.speed = 5

        }

    }

    render(cor:string) {

        ctx.fillStyle = cor
        ctx.fillRect(this.x , this.y , this.width , this.height)

        if (this.direita) {
           
            ctx.fillStyle = "#BF3017"
            ctx.fillRect(WIDTH - (this.maxLife * scale + (WIDTH / 5)), 0, this.maxLife * scale, 35 * scale)
         
            ctx.fillStyle = "#2ABF77"
            ctx.fillRect(WIDTH - (this.life * scale + (WIDTH / 5)), 0 ,this.life * scale, 35 * scale)

        } else {

            ctx.fillStyle = "#BF3017"
            ctx.fillRect(0 , 0, this.maxLife * scale + (WIDTH / 5), 35 * scale)
         
            ctx.fillStyle = "#2ABF77"
            ctx.fillRect(0 , 0, this.life * scale + (WIDTH / 5), 35 * scale)

        }

        if (debug) {

            ctx.font = `${sizeFont}px ARIAL`
            ctx.fillText("vida: " + this.life , this.x , this.y - (6 * sizeFont))
            ctx.fillText("X: " + this.x.toFixed(0) , this.x , this.y - (5 * sizeFont))
            ctx.fillText("Y: " + this.x.toFixed(0) , this.x , this.y - (4 * sizeFont))
            ctx.fillText("velocidade: " + this.speed.toFixed(0), this.x - 25 , this.y - (3 * sizeFont))
            ctx.fillText(`pulou: ${this.pulou ? "verdadeiro" : "falso"}`, this.x - 25 , this.y - (2 * sizeFont))
            
        }

    }

}