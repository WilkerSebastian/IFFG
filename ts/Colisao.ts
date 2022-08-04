class Colisao {

    x: number
    y: number
    height: number
    width: number

    constructor(x: number , y: number , width?:number , height?:number) {

        this.x = x
        this.y = y
        this.height = 0 | width as number
        this.width = 0 | height as number

    }

    async colidiu(obj:Colisao):Promise<boolean> {

        return new Promise<boolean>((resolve) => {

            let colisor = false

            if (this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y) {
    
                    colisor = true
    
            }

            resolve(colisor)

        })

    }

    async render(obj:Colisao) {

        if (await this.colidiu(obj)) {

            ctx.fillStyle = "#7A0A1E"
            
        } else {

            ctx.fillStyle = "#BFBFBF"

        }

        ctx.fillRect(this.x , this.y , this.width , this.height)

    }

}