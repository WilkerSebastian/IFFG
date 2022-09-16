"use strict";
let radio = document.getElementById("radio");
let config = document.getElementById("config");
let selecao = document.getElementById("selecao-personagem");
let selecionado = [false, false];
class Configuracoes {
    setGrid(element) {
        if (!selecionado[0]) {
            console.log("red");
            element.style.cssText = "border: 3px solid red";
        }
        if (!selecionado[1]) {
            console.log("blue");
            element.style.cssText = "border: 3px solid blue";
        }
    }
    overGrid(element) {
        if (!selecionado[0]) {
            element.style.cssText = "border: none";
        }
        if (!selecionado[1]) {
            element.style.cssText = "border: none";
        }
    }
    clickGrid(element, index) {
        if (selecionado[0]) {
            selecionado[0] = true;
            if (index == 1) {
                players[0].nome = nomes[parseInt(`${Math.random() * nomes.length}`)];
                element.style.cssText = "border: 3px solid red";
            }
            else {
                players[0].nome = nomes[index];
                element.style.cssText = "border: 3px solid blue";
            }
        }
        else {
            selecionado[1] = true;
            if (index == 1) {
                players[1].nome = nomes[parseInt(`${Math.random() * nomes.length}`)];
                element.style.cssText = "border: 3px solid red";
            }
            else {
                players[1].nome = nomes[index];
                element.style.cssText = "border: 3px solid blue";
            }
        }
    }
    setVolume(valor) {
        audio.volume = valor;
    }
    selecaoVisible(visivel) {
        if (visivel) {
            selecao.style.display = "block";
            menu.style.display = "none";
        }
        else {
            selecao.style.display = "none";
            loop();
        }
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
