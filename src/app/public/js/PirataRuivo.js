"use strict";
let shanks = document.getElementById("shanks");
class PirataRuivo {
  visible(visivel) {
    if (visivel) {
      shanks.style.display = "block";
      luffy.style.display = "none";
      barbabranca.style.display = "none";
      barbanegra.style.display = "none";
    } else {
      shanks.style.display = "none";
      barbabranca.style.display = "block";
      barbanegra.style.display = "none";
      luffy.style.display = "none";
    }
  }
}
const yonkou = new PirataRuivo();
