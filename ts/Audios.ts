class Audios {

    musica:number
    efeito:number
    voz:number

    constructor(musica:number, efeito:number,voz:number) {

        this.efeito = efeito / 100
        this.musica = musica / 100
        this.voz = voz / 100

    }

    getVolume() {

        $("#musica").val(this.musica * 100)
        $("#efeito").val(this.efeito * 100)
        $("#voz").val(this.voz * 100)

    }

    setVolume() {


        // musica
                
        cenarioAudio.volume = this.musica / 100

        // efeito


        // voz

    }

}

const master = new Audios(50, 50, 50)
master.getVolume()

document.getElementById("musica")?.addEventListener("change", () => {
    
    master.musica = Number($("#musica").val())

})
document.getElementById("efeito")?.addEventListener("change", () => {

    master.efeito = Number($("#efeito").val())
    
})
document.getElementById("voz")?.addEventListener("change", () => {

    master.voz = Number($("#voz").val())
    
})