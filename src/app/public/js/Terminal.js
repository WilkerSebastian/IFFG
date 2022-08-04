"use strict";
const Hterminal = document.getElementById("terminal");
const response = document.getElementById("response");
const request = document.getElementById("request");
class Terminal {
    constructor() {
    }
    executar(script) {
        if (script.slice(0, 11) === "kill player") {
            players[Number(script.slice(12))].life = 0;
            return "kill " + players[Number(script.slice(12))].nome;
        }
        if (script.slice(0, 8) === "time set") {
            tempo = Number(script.slice(9));
            return "time modified to " + script.slice(9);
        }
        if (script.slice(0, 16) === "audio volume set") {
            audio.volume = Number(script.slice(17));
            return "volume modified to " + script.slice(17);
        }
        if (script.slice(0, 9) === "audio set") {
            tempo = Number(script.slice(10));
            return "audio modified to " + script.slice(10);
        }
        let res = "command not found";
        switch (script) {
            case "log":
                response.style.color = "";
                res = "log: \n" + response.value;
                break;
            case "stop":
                rodando = false;
                res = "game stoped";
                break;
            case "restart":
                rodando = false;
                res = "game restart";
                break;
            case "cls":
                setTimeout(() => { response.value = ""; }, 10);
                break;
        }
        return res;
    }
    visibilidade(view) {
        if (view) {
            Hterminal.style.display = "block";
        }
        else {
            Hterminal.style.display = "none";
        }
    }
}
const terminal = new Terminal();
terminal.visibilidade(debug);
request.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        const res = terminal.executar(request.value);
        response.value += `> ${res} \n`;
        request.value = "";
    }
});
