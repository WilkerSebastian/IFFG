// variáveis 

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

// variável run 

let run = false

// variáveis de FPS

const times:number[] = [];
let fps = 0;

// variáveis de renderização

const canvas = $("#canvas").get()[0] as HTMLCanvasElement
canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

// lista de objetos e player

const objetos = new Map<string , Objeto>()

objetos.set("chao" , new Objeto(0 , HEIGHT - 75, WIDTH ,75 , true))

// imagens

const imagens = {


}

// telcas keys/arrows

const keys = new Map<string , boolean>()

keys.set("a" , false)
keys.set("d" , false)
keys.set("w" , false)
keys.set("s" , false)

const arrows = new Map<string , boolean>()

arrows.set("ArrowLeft" , false)
arrows.set("ArrowRight" , false)
arrows.set("ArrowUp" , false)
arrows.set("ArrowDown" , false)

// tela carrgamento

let carregamento = 0

function load() {

    const barra = $("#barra") as JQuery<HTMLDivElement>

    barra.css("width" , `${carregamento}%`)

    carregamento += 10

    if (carregamento >= 100) {
    
        clearInterval(id)

        $("#load").css("display" , "none")
        $("#onload").css("display" , "block")

        run = true
        window.requestAnimationFrame(main)

    }

}

let id = setInterval(() => {load()} , 1)

// variaveis de depuração

let debug = false

let debugTecla = 'nenhuma'
let debugArrow = 'nenhuma'