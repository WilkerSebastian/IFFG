// variáveis 

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

let run = false
const times:number[] = [];
let fps = 0;

// variáveis de renderização

const canvas = $("#canvas").get()[0] as HTMLCanvasElement
canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D