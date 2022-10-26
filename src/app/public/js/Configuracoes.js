"use strict";
let radio = document.getElementById("radio");
let config = document.getElementById("config");
class Configuracoes {
    setVolume(valor) {
        audio.volume = valor;
    }
    visible(visivel) {
        if (visivel) {
            config.style.display = "block";
            menu.style.display = "none";
        }
        else {
            config.style.display = "none";
            menu.style.display = "block";
        }
    }
}
const configuracoes = new Configuracoes();
radio.addEventListener("change", () => {
    configuracoes.setVolume(Number(radio.value) / 100);
    console.log(radio.value);
    audio.play();
});
