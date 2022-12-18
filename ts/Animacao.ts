class Animacao {

    index: number
    maxIndex: number
    coeficiente: number
    pulo:boolean
    sprite:HTMLImageElement
    cortes:{x:number,y:number,width:number,height:number}[]

    constructor(cortes:{x:number,y:number,width:number,height:number}[], coeficiente: number) {

        this.index = 0
        this.maxIndex = cortes.length
        this.coeficiente = coeficiente
        this.cortes = cortes
        this.sprite = new Image()
        this.pulo = false

    }

    dano(nome:string , direcao:boolean) {



    }

    pular(nome:string) {

        this.pulo = true

        this.sprite.src = `./img/sprite/${nome}/pulo.png`

    }

    especial(nome:string) {

        this.pulo = false

        this.sprite.src = `./img/sprite/`

    }

    defesa() {

        this.pulo = false

    }

    ataque() {

        this.pulo = false
    }

    default() {

        this.pulo = false

    }

    andar() {

        this.pulo = false

    }

    render(x:number, y:number, width:number, height:number) {

        if (this.cortes.length != 1) {
         
            if (this.index > this.maxIndex) {

                this.index = 0
    
            } else {
    
                this.index += this.coeficiente
    
            }

        } 

        const index = Number(this.index.toFixed(0))

        const corte = this.cortes[index]

       // ctx.drawImage(imagem, corte.x, corte.y, corte.width, corte.height, x, y, width, height)

    }

}