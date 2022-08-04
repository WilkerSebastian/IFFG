class Sprite {

    x: number
    y: number
    height: number
    width: number
    imagem: HTMLImageElement

    constructor(x: number , y: number) {

        this.x = x
        this.y = y
        this.height = 0
        this.width = 0
        this.imagem = new Image()

    }

    setSprite(movimento:string , direcao:number , nome:string) {

        this.imagem.src = `/public/img/${nome}/${movimento}-${direcao}.png`

        this.width = this.imagem.width
        this.height = this.imagem.height

    }

    getSprite(movimento:string , direcao:number , nome:string) {
        
        if (`/public/img/${nome}/${movimento}-${direcao}.png` == this.imagem.src.slice(21)) {
            
            return true

        }

        return false

    }

}