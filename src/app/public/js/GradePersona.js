"use strict";
let gradepersona = document.getElementById("gradepersona");
class GradePersona {
  visible(visivel) {
    if (visivel) {
      gradepersona.style.display = "block";
      iniciojogo.style.display = "none";
      configjogo.style.display = "none";
    } else {
      gradepersona.style.display = "none";
      iniciojogo.style.display = "block";
      configjogo.style.display = "none";
    }
  }
}
const gradepersonaa = new GradePersona();
