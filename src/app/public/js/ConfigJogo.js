"use strict";
let radio = document.getElementById("radio");
let configjogo = document.getElementById("configjogo");
class ConfigJogo {
  setVolume(valor) {
    audio.volume = valor;
  }
  visible(visivel) {
    if (visivel) {
      configjogo.style.display = "block";
      iniciojogo.style.display = "none";
    } else {
      configjogo.style.display = "none";
      iniciojogo.style.display = "block";
    }
  }
}
const configjogoo = new ConfigJogo();
radio.addEventListener("change", () => {
  teach.setVolume(Number(radio.value) / 100);
  console.log(radio.value);
  audio.play();
});
