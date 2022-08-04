let radio = document.getElementById("radio") as HTMLInputElement
let config = document.getElementById("config") as HTMLElement

class Configuracoes {
    
    setVolume(valor:number) {

        audio.volume = valor

    }
 
    visible(visivel:boolean) {

        if (visivel) {
            
            config.style.display ="block"
            menu.style.display = "none"

        } else {

            config.style.display ="none"
            menu.style.display = "block"

        }

    }

}

const configuracoes = new Configuracoes()

radio.addEventListener("change" , () => {

    configuracoes.setVolume(Number(radio.value) / 100)
    console.log(radio.value);
    audio.play()

})