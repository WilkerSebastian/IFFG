// eventos de teclado
window.addEventListener("keydown" , (evento) => {

    if (evento.ctrlKey && evento.key == "k") {
     
        debug = !debug
        terminal.setVisible(debug)
        
    }

    if (keys.get(evento.key) != undefined) {
        
        debugTecla = evento.key
        keys.set(evento.key , true)

    }
    if (arrows.get(evento.key) != undefined) {

        debugArrow = evento.key
        arrows.set(evento.key , true)
        
    }

})
window.addEventListener("keyup" , (evento) => {

    if (keys.get(evento.key) != undefined) {
        
        debugTecla = "nenhuma"
        keys.set(evento.key , false)

    }
    if (arrows.get(evento.key) != undefined) {

        debugArrow = "nenhuma"
        arrows.set(evento.key , false)
        
    }

})

// players de declaraçãp

const player1 = new Player(200 , HEIGHT - 225 , 50 , 150)
const player2 = new Player(WIDTH - 150 , HEIGHT - 225 , 50 , 150 , true)

// função padrão
function main() { 

    if (run) { 

        loop() 

    }

}

// função de loop de gameplay
function loop() { 

    const now = performance.now(); 
    
    while (times.length > 0 && times[0] <= now - 1000) { 

        times.shift(); 

    }

    times.push(now); 

    fps = times.length; 

    render() 
    update() 

    // usando o requesicao de quadro pela taxa de atualização
    window.requestAnimationFrame(loop) 

}

// função responsável pela parte lógica do jogo
function update() { 

    player1.update()
    player2.update()

}

// função responsável pela parte de rendirzação do jogo
function render() { 

    fundo()
    objetos.get("chao")?.render("#CD853F")
    
    player1.render("red")
    player2.render("blue")

    if (debug) {

        showFPS()
        showKeys()
        
    }

}