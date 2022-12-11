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

const player1 = new Player((200 * scale) , HEIGHT - (225 * scale) , (50 * scale)  , (150 * scale) , "lincoln")
const player2 = new Player(WIDTH - (150 * scale) , HEIGHT - (225 * scale) , (50 * scale) , (150 * scale) , "ferraz" , true)

// função padrão
function main() { 

    if (run) { 

        time = 200

        timeRun = setInterval(() => {time--},1000)

        loop() 

    }

}

// função de loop de gameplay
function loop() { 

    if (time <= 0) {

        time = 0
        clearInterval(timeRun)
        
    }

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

    if (time == 0) {
        
        if (!player1.subita || !player2.subita) {

            subita = true
            setTimeout(() => subita = false,1500)
            
        }

        player1.subita = true
        player2.subita = true

        player1.morte()
        player2.morte()

    }

    if (player1.life == 0 || player2.life == 0) {
        
        run = false

    }

}

// função responsável pela parte de rendirzação do jogo
function render() { 

    fundo()

    timer()

    objetos.get("chao")?.render("#CD853F")
    
    player1.render("red")
    player2.render("blue")

    if(subita) {  

        morteSubita()

    }

    if (debug) {

        showFPS()
        showKeys()
        
    }

}