class Audios {

    musica:number
    efeito:number
    voz:number

    constructor(musica:number, efeito:number,voz:number) {

        this.efeito = efeito
        this.musica = musica
        this.voz = voz

    }

    getVolume() {

        $("#musica").val(this.musica)
        $("#efeito").val(this.efeito)
        $("#voz").val(this.voz)

    }

    setVolume() {


        // musica
                
        cenarioAudio.volume = this.musica

        // efeito


        // voz

    }

}

const master = new Audios(50, 50, 50)
master.getVolume()

document.getElementById("musica")?.addEventListener("change", () => {


    
})
document.getElementById("efeito")?.addEventListener("change", () => {


    
})
document.getElementById("voz")?.addEventListener("change", () => {


    
})