class Animacao {

    x:number
    y:number
    width:number
    height:number

    constructor(x:number , y:number , width:number , height:number) {

        this.x = x
        this.y = y
        this.width = width
        this.height = height

    }

}

const animacoes = new Map<string , Animacao[]>()

// lincoln

const andar_direita_l = [

    new Animacao(0 , 0 , 177 , 440),
    new Animacao(177 , 0 , 177 , 440),
    new Animacao(177 * 2 , 0 , 177 , 440),
    new Animacao(177 * 3, 0 , 177 , 440)

]

const andar_esquerda_l = [

    new Animacao(1338 , 0 , 177 , 440),
    new Animacao(1338 - 177, 0 , 177 , 440),
    new Animacao(1338 - (177 * 2), 0 , 177 , 440),
    new Animacao(1338 - (177 * 3), 0 , 177 , 440)

]

animacoes.set("lincoln-andar-esquerda" , andar_esquerda_l)
animacoes.set("lincoln-andar-direita" , andar_direita_l)
animacoes.set("lincoln-default-esquerda", [new Animacao(0 , 0 , 177 , 440)])
animacoes.set("lincoln-default-direita", [new Animacao(1338 , 0 , 177 , 440)])

// ferraz 

const andar_direita_f = [

    new Animacao(0 , 0 , 177 , 440),
    new Animacao(177 , 0 , 177 , 440),
    new Animacao(177 * 2 , 0 , 177 , 440),
    new Animacao(177 * 3, 0 , 177 , 440)

]

const andar_esquerda_f = [

    new Animacao(1338 , 0 , 177 , 440),
    new Animacao(1338 - 177, 0 , 177 , 440),
    new Animacao(1338 - (177 * 2), 0 , 177 , 440),
    new Animacao(1338 - (177 * 3), 0 , 177 , 440)

]

animacoes.set("ferraz-default-esquerda" , [new Animacao(7084 , 348 , 144 , 293)])
animacoes.set("ferraz-default-direita" , [new Animacao(6 , 10 , 144 , 293)])