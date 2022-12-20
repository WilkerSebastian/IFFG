const sizeFont = (20 * scale)

function fundo() {

    ctx.drawImage(background,0 , 0 , WIDTH , HEIGHT)

}

function showFPS() { 

    ctx.fillStyle = "white" 
    ctx.font = `${sizeFont}px ARIAL` 
    ctx.fillText("FPS: " + fps, 50 , sizeFont * 8) 

}

function timer() {

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black"
    ctx.font = `${sizeFont * 3}px ARIAL`;
    ctx.fillText(time.toString(), WIDTH * 0.45, sizeFont * 4.5);
    ctx.font = `${sizeFont * 3}px ARIAL`;
    ctx.strokeText(time.toString(), WIDTH * 0.45, sizeFont * 4.5)

}

function morteSubita() {

    ctx.fillStyle = "red" 
    ctx.strokeStyle = "black"
    ctx.font = `${sizeFont * 5}px street` 
    ctx.fillText("MORTE SUBITA!", WIDTH / 3 , HEIGHT / 2) 
    ctx.font = `${sizeFont * 5}px street` 
    ctx.strokeText("MORTE SUBITA!", WIDTH / 3 , HEIGHT / 2) 

}

function novoRound() {

    ctx.fillStyle = "white" 
    ctx.strokeStyle = "black"
    ctx.font = `${sizeFont * 5}px street` 
    ctx.fillText(`ROUND ${rounds}!`, WIDTH / 2.5 , HEIGHT / 2) 
    ctx.font = `${sizeFont * 5}px street` 
    ctx.strokeText(`ROUND ${rounds}!`, WIDTH / 2.5 , HEIGHT / 2) 

}
 
function vitoria() {

    ctx.fillStyle = "#F2CF27" 
    ctx.font = `${sizeFont * 3}px street` 

    if(player1.life == 0) {

        ctx.fillText(`${player2.nome.toUpperCase()}${player2.life == player2.maxLife ? " PERFECT": " "}  WINS!`, WIDTH / 3 , HEIGHT / 2) 

    } else {

        ctx.fillText(`${player1.nome.toUpperCase()}${player1.life == player1.maxLife ? " PERFECT": " "}  WINS!`, WIDTH / 3 , HEIGHT / 2)

    }

}

function showKeys() {

    ctx.fillStyle = "white" 
    ctx.font = `${sizeFont}px ARIAL` 
    ctx.fillText("input player1: " + debugTecla, 50 , sizeFont * 9) 
    ctx.fillText("input player2: " + debugArrow, 50 , sizeFont * 10) 

}