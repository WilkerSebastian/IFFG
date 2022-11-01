"use strict";
let luffy = document.getElementById("luffy");
class MonkeyDLuffy {
  visible(visivel) {
    if (visivel) {
      luffy.style.display = "block";
      barbabranca.style.display = "none";
      barbanegra.style.display = "none";
    } else {
      luffy.style.display = "none";
      barbabranca.style.display = "block";
      barbanegra.style.display = "none";
    }
  }
}
const mugiwara = new MonkeyDLuffy();
