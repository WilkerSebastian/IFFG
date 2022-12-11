const sizeFont = (20 * scale)

function fundo() {

    ctx.fillStyle = "#88DEFA" 
    ctx.fillRect(0 , 0 , WIDTH  , HEIGHT)

}

function showFPS() { 

    ctx.fillStyle = "white" 
    ctx.font = `${sizeFont}px ARIAL` 
    ctx.fillText("FPS: " + fps, 50 , sizeFont * 8) 

}

function timer() {

    ctx.fillStyle = "white";
    ctx.font = `${sizeFont * 3}px ARIAL`;
    ctx.fillText(time.toString(), WIDTH * 0.45, sizeFont * 4.5);

}

function morteSubita() {

    ctx.fillStyle = "red" 
    ctx.font = `${sizeFont * 3}px ARIAL` 
    ctx.fillText("MORTE SUBITA!", WIDTH / 3 , HEIGHT / 2) 

}

function showKeys() {

    ctx.fillStyle = "white" 
    ctx.font = `${sizeFont}px ARIAL` 
    ctx.fillText("input player1: " + debugTecla, 50 , sizeFont * 9) 
    ctx.fillText("input player2: " + debugArrow, 50 , sizeFont * 10) 

}