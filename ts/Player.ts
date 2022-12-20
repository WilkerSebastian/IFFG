class Player extends Objeto {

    gravidade: number
    speed: number
    forcaDoPulo: number
    direita: boolean
    pulou: boolean
    nome: string
    life: number
    maxLife: number
    indexAnimacao: number
    subita: boolean
    defesa:boolean
    rounds: number
    ataque:boolean
    podeAtacar:boolean
    acimaDoChao:boolean
    sprite: HTMLImageElement
    direcao: string
    dano:number

    constructor(x: number, y: number, width: number, height: number, nome: string,dano:number, direita?: boolean) {

        super(x, y, width, height, true)
        this.gravidade = 0.8 * scale
        this.speed = 5 * scale
        this.forcaDoPulo = 23 * scale
        this.direita = direita ?? false
        this.pulou = false
        this.nome = nome
        this.subita = false
        this.life = 100
        this.maxLife = 100
        this.rounds = 0
        this.indexAnimacao = 0
        this.acimaDoChao = false
        this.defesa = false
        this.podeAtacar = true
        this.direcao = !this.direita ? "direita" : "esquerda"
        this.sprite = new Image()
        this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/default.png`
        this.ataque = false
        this.dano = dano
        this.setSize(this.sprite.width , this.sprite.height)
    }

    setSize(width: number, height: number) {

        switch (this.nome) {
            case "ferraz":
         
            this.width = width
            this.height = height

                break;
        
            case "lincoln":

                this.width = width / 1.35
                this.height = height / 1.35

                break;
        }

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

        this.acimaDoChao = false
        this.indexAnimacao = 0
        this.pulou = false
        this.subita = false
        this.life = 100
        this.direcao = !this.direita ? "direita" : "esquerda"
        this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/default.png`
        this.setSize(this.sprite.width , this.sprite.height)

    }

    frameLimiter(limite:number) {

        this.indexAnimacao += 0.16

        let index = Number(this.indexAnimacao.toFixed(0))

        if(!(index < limite)) {
            
            this.indexAnimacao = 0
            index = 0

        }

        return index

    }

    movimento() {

        // parte inicial de condicionais de movimento
        if (this.direita) {

            if (arrows.get("ArrowDown")) {

                if (this.acimaDoChao) {
                    
                    this.y += this.speed

                } else {

                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/abaixado.png`

                }

            } else {

                if (arrows.get("ArrowLeft")) {

                    this.direcao = "esquerda"
                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/andar-${this.frameLimiter(4)}.png`
                    this.x -= this.speed
    
                }
                if (arrows.get("ArrowRight")) {
    
                    this.direcao = "direita"
                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/andar-${this.frameLimiter(4)}.png`
                    this.x += this.speed
    
                }
                if (arrows.get("ArrowUp")) {
    
                    if (!this.pulou) {
    
                        this.pulou = true
                        setTimeout(() => this.pulou = false, 2000)
    
                    }
    
                }
                if (arrows.get("k") && this.podeAtacar) {

                    this.ataque = true
                    setTimeout(() => this.ataque = false, 50)
                    this.podeAtacar = false
                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/soco-0.png`
                    setTimeout(() => this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/soco-1.png`,250)
                    setTimeout(() => this.podeAtacar = true, 1000)
                    
                }
                if (arrows.get("p") && this.podeAtacar) {
                    
                    this.ataque = true
                    setTimeout(() => this.ataque = false, 50)
                    this.podeAtacar = false
                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/chute-1.png`
                    setTimeout(() => this.podeAtacar = true, 1000)

                }

            }
            if (debugArrow == "nenhuma") {

                this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/default.png`

            }

        } else {

            if (keys.get("s")) {

                if (this.acimaDoChao) {
                    
                    this.y += this.speed

                } else {

                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/abaixado.png`

                }

            } 
            else if(keys.get("g")) {
            
                this.defesa = true
                this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/defesa.png`

            } else {

                this.defesa = false

                if (keys.get("a")) {

                    this.direcao = "esquerda"
                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/andar-${this.frameLimiter(4)}.png`
                    this.x -= this.speed
    
                }
                if (keys.get("d")) {
    
                    this.direcao = "direita"
                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/andar-${this.frameLimiter(4)}.png`
                    this.x += this.speed
    
                }
                if (keys.get("w")) {
    
                    if (!this.pulou) {
    
                        this.pulou = true
                        setTimeout(() => this.pulou = false, 2000)
    
                    }
    
                }
                if(keys.get("q") && this.podeAtacar) {

                    this.ataque = true
                    setTimeout(() => this.ataque = false, 50)
                    this.podeAtacar = false
                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/soco-0.png`
                    setTimeout(() => this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/soco-1.png`,250)
                    setTimeout(() => this.podeAtacar = true, 1000)
    
                }
                if (keys.get("e") && this.podeAtacar) {
                    
                    this.ataque = true
                    setTimeout(() => this.ataque = false, 50)
                    this.podeAtacar = false
                    this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/chute-1.png`
                    setTimeout(() => this.podeAtacar = true, 1000)

                }

            }
            if (debugTecla == "nenhuma") {

                this.sprite.src = `./img/sprites/${this.nome}/${this.direcao}/default.png`

            }

        }
        // fim da parte de condicionais de movimento

    }

    morte() {

        if (this.subita) {

            this.life -= 0.075

        }

    }

    levaDano(valor:number) {

        if (!this.defesa) {
            
            this.life -= valor
            
            this.life = this.life < 0 ? 0 : this.life 

        }

    }

    update() {

        let colisor:{collided: boolean,x: number,y: number}

        this.movimento()

        this.speed += this.gravidade
        this.y += this.speed

        //const p = new Objeto(this.x , this.y, this.width / 5, this.height, true)

        if (this.direita) {
            
            colisor = player1.isCollided(this)

        } else {

            colisor = player2.isCollided(this)
            
        }

        if (colisor.collided) {
            
            if (this.direita) {
                
                player1.levaDano(this.ataque ? this.dano : 0)
                corDebugP2 = "purple"

            } else {

                player2.levaDano(this.ataque ? this.dano : 0)
                corDebugP1 = "purple"
                
            }

            /*if (this.direcao == "direita") {
                
                this.x -= 5

            } else {

                this.x += 5

            }*/

        } else {

            if (this.direita) {
                
                corDebugP2 = "red"

            } else {
                
                corDebugP1 = "blue"

            }

        }

        if (this.x + this.width > WIDTH) {

            this.x = WIDTH - this.width
            
        }
        if (this.x + this.width < this.width) {

            this.x = 0
            
        }
        if (this.y > (objetos.get("chao") as Objeto).height - this.height) {

            this.acimaDoChao = false
            this.y = (objetos.get("chao") as Objeto).y - this.height 
            this.speed = 5

        } else {

            this.acimaDoChao = true

        }

    }

    render() {

        if (debug) {

            ctx.fillStyle = "white"
            ctx.font = `${sizeFont}px ARIAL`
            ctx.fillText(`atacou: ${this.ataque ? "sim":"não"}`, this.x, this.y - (7 * sizeFont))
            ctx.fillText("vida: " + this.life, this.x, this.y - (6 * sizeFont))
            ctx.fillText("X: " + this.x.toFixed(0), this.x, this.y - (5 * sizeFont))
            ctx.fillText("Y: " + this.x.toFixed(0), this.x, this.y - (4 * sizeFont))
            ctx.fillText("velocidade: " + this.speed.toFixed(0), this.x - 25, this.y - (3 * sizeFont))
            ctx.fillText(`pulou: ${this.pulou ? "verdadeiro" : "falso"}`, this.x - 25, this.y - (2 * sizeFont))

            ctx.fillStyle = this.direita ? corDebugP1 : corDebugP2
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

        this.setSize(this.sprite.width , this.sprite.height)

        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)

    }

}