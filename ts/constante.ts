const canvas = document.getElementById('canvas') as HTMLCanvasElement
const menu = document.getElementById("menu") as HTMLElement

const ALTURA = window.innerHeight
const LARGURA = window.innerWidth 

canvas.height = ALTURA
canvas.width = LARGURA

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const audio = new Audio("/public/audio/fundo.mp3")
audio.volume = 0.20

let rodando = false
let debug = false
let fps = 0
let tempo = 180
let maxWidth = LARGURA
let maxHeight = ALTURA
let round = 1
let iniciou = true

const nomes = ["lincoln" , "ferraz"]

const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    e: {
        pressed: false
    },
    t: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowRight: {
      pressed: false
    },
    ArrowLeft: {
      pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    PageUp: {
        pressed: false
    },
    Home: {
        pressed: false
    }
    
  }

function timer() {

    if (0 < tempo) {

        tempo--

        setTimeout(timer , 1000)

    } else {

        tempo = 0

    }

}

timer()

function saiuDoMundo(x:number , y:number) {

    if (x > LARGURA || y > ALTURA || 
        x < 0 || y < 0) {
        
        return true

    }

    return false

}

function speed(delta: number, pixelsPerSec: number) {
    return ((pixelsPerSec * delta) / 1000);
};