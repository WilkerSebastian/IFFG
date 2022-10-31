const sizeFont = (20 * scale)

function fundo() {

    ctx.fillStyle = "#88DEFA" 
    ctx.fillRect(0 , 0 , WIDTH  , HEIGHT)

}

function showFPS() { 

    ctx.fillStyle = "black" 
    ctx.font = `${sizeFont}px ARIAL` 
    ctx.fillText("FPS: " + fps, 50 , sizeFont * 4) 

}

function showKeys() {

    ctx.fillStyle = "black" 
    ctx.font = `${sizeFont}px ARIAL` 
    ctx.fillText("input player1: " + debugTecla, 50 , sizeFont * 5) 
    ctx.fillText("input player2: " + debugArrow, 50 , sizeFont * 6) 

}