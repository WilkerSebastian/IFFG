class Player extends Objeto {

    gravidade: number
    speed: number
    forcaDoPulo: number
    direita: boolean
    pulou:boolean

    constructor(x: number, y: number, width: number, height: number, direita?: boolean) {

        super(x, y, width, height, true)
        this.gravidade = 0.8
        this.speed = 5
        this.forcaDoPulo = 23
        this.direita = direita ?? false
        this.pulou = false

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

        if (debug) {

            ctx.font = "20px ARIAL"
            ctx.fillText("X: " + this.x , this.x , this.y - 100)
            ctx.fillText("Y: " + this.x , this.x , this.y - 80)
            ctx.fillText("velocidade: " + this.speed, this.x - 25 , this.y - 60)
            ctx.fillText(`pulou: ${this.pulou ? "verdadeiro" : "falso"}`, this.x - 25 , this.y - 40)
            
        }

    }

}