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

// players de declaração

const player1 = new Player((200 * scale) , HEIGHT - (225 * scale) , (50 * scale * 2)  , (150 * scale * 2) , "lincoln")
const player2 = new Player(WIDTH - (150 * scale) , HEIGHT - (225 * scale) , (50 * scale * 2) , (150 * scale * 2) , "ferraz" , true)

// função padrão
function main() { 

    state = "loopando"

    newround = true

    time = 200

    timeRun = setInterval(() => {time--},1000)

    loop() 

}

// função de loop de gameplay
function loop() { 

    if (state == "loopando") {

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

        update() 
        render() 
    
        // usando o requesicao de quadro pela taxa de atualização
        window.requestAnimationFrame(loop)

    } else if(state == "novo") {

        vitoria()

        player1.reset()
        player2.reset()

        setTimeout(() => {

            newround = true

            time = 200
            
            state = "loopando"
            loop()
        
        } , 1500)

    } else if(state == "finalizou") {

        vitoria()

        newround = false

        setTimeout(() => {

            player1.reset(true)
            player2.reset(true)
    
        })

    } 

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

    if (player1.life <= 0) {
        
        player1.subita = false
        player2.subita = false
            
        player2.rounds++
        state = player2.rounds == 2 ? "finalizou" : "novo"
        
    }

    if (player2.life <= 0) {
        
        player1.subita = false
        player2.subita = false

        player1.rounds++
        state = player1.rounds == 2 ? "finalizou" : "novo"

    }

}

// função responsável pela parte de rendirzação do jogo
function render() { 

    fundo()

    timer()

    if (newround) {
        
        novoRound()

        setTimeout(() => newround = false, 1000)

    }
    
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