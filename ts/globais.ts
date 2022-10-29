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

// imagens

const imagens:HTMLImageElement[] = []

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

let id = setInterval(() => {load()} , 1000)