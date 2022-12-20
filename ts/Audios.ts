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