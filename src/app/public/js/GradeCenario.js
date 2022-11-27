"use strict";
let gradecenario = document.getElementById("gradecenario");
class GradeCenario {
  visible(visivel) {
    if (visivel) {
      gradecenario.style.display = "block";
      gradepersona.style.display = "none";
      iniciojogo.style.display = "none";
      configjogo.style.display = "none";
    } else {
      gradecenario.style.display = "none";
      iniciojogo.style.display = "block";
      configjogo.style.display = "none";
      gradepersona.style.display = "none";
    }
  }
}
const gradecenarioo = new GradeCenario();
