// variáveis 

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

// variável run 

let state = "init"

// variáveis de FPS

const times:number[] = [];
let fps = 0;

// variáveis de renderização

const canvas = $("#canvas").get()[0] as HTMLCanvasElement
canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

// variavel de escala da tela

const scale = (WIDTH * HEIGHT) / (1360 * 768)

// função de verificação

function saiuDoMundo(x:number , width:number) {

    // verificação se saiu do eixo x
    if (x + width > WIDTH || x + width < 0) {
        
        return true

    }

    return false

}

// lista de objetos e player

const objetos = new Map<string , Objeto>()

objetos.set("chao" , new Objeto(0 , HEIGHT - (75 * scale), WIDTH ,(75 * scale) , true))

// imagens

function createImg(nome:string) {

    const img = new Image()
    img.src = nome

    return img

}

const imagens = new Map<string , HTMLImageElement>()
imagens.set("busao" , createImg("../img/cenarios/busao.png"))
imagens.set("lincoln" , createImg("../img/sprites/lincoln.png"))
imagens.set("ferraz" , createImg("../img/sprites/ferraz.png"))

// telcas keys/arrows

const keys = new Map<string , boolean>()

keys.set("a" , false)
keys.set("d" , false)
keys.set("w" , false)
keys.set("s" , false)
keys.set("q" , false)
keys.set("e" , false)
keys.set("g" , false)


const arrows = new Map<string , boolean>()

arrows.set("ArrowLeft" , false)
arrows.set("ArrowRight" , false)
arrows.set("ArrowUp" , false)
arrows.set("ArrowDown" , false)
arrows.set("k", false)
arrows.set("p", false)

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

    }

}

let id = setInterval(() => {load()} , 1)

// variaveis para round

let rounds = 0

let timeRun:NodeJS.Timer

let subita = false

let time = 200

let newround = false

// variavel do cenario

const background = new Image()

// audio 

const cenarioAudio = new Audio("../audio/cenarios/fundo-cenario.mp3")

// variaveis de depuração

let debug = false

let debugTecla = 'nenhuma'
let debugArrow = 'nenhuma'

let corDebugP1 = "red"
let corDebugP2 = "blue"