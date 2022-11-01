"use strict";
let radio = document.getElementById("radio");
let barbanegra = document.getElementById("barbanegra");
class BarbaNegra {
  setVolume(valor) {
    audio.volume = valor;
  }
  visible(visivel) {
    if (visivel) {
      barbanegra.style.display = "block";
      barbabranca.style.display = "none";
    } else {
      barbanegra.style.display = "none";
      barbabranca.style.display = "block";
    }
  }
}
const teach = new BarbaNegra();
radio.addEventListener("change", () => {
  teach.setVolume(Number(radio.value) / 100);
  console.log(radio.value);
  audio.play();
});
