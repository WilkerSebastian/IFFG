let radio = document.getElementById("radio") as HTMLInputElement
let config = document.getElementById("config") as HTMLElement
let selecao = document.getElementById("selecao-personagem") as HTMLElement
let selecionado = [false , false]
let personagensIMG = [document.getElementById('sec-1') as HTMLImageElement, document.getElementById('sec-2') as HTMLImageElement]
let nomePersonagens = [document.getElementById('personagem-1') as HTMLElement, document.getElementById('personagem-2') as HTMLElement]

class Configuracoes {

    setGrid(element:HTMLElement , index:number) {

        if (!selecionado[0]) {
         
            console.log("red");
            element.style.cssText = "border: 3px solid red"
            personagensIMG[0].src = `/public/img/${nomes[index]}/andar-${index + 2}`

        } 
        if (!selecionado[1]) {

            console.log("blue");
            element.style.cssText = "border: 3px solid blue"
            personagensIMG[1]

        }

    }

    overGrid(element:HTMLElement) {

        if (!selecionado[0]) {
         
            element.style.cssText = "border: none"

        } 
        if (!selecionado[1]) {

            element.style.cssText = "border: none"
            
        }

    }

    clickGrid(element:HTMLElement , index:number) {

        if (selecionado[0]) {

            selecionado[0] = true

            if (index == 1) {
                
                players[0].nome = nomes[parseInt(`${Math.random() * nomes.length}`)]
                element.style.cssText = "border: 3px solid red"

            } else {

                players[0].nome = nomes[index]
                element.style.cssText = "border: 3px solid blue"
                
            }

        } else {

            selecionado[1] = true
            
            if (index == 1) {
                
                players[1].nome = nomes[parseInt(`${Math.random() * nomes.length}`)]
                element.style.cssText = "border: 3px solid red"

            } else {

                players[1].nome = nomes[index]
                element.style.cssText = "border: 3px solid blue"
                
            }

        }

    }

    setVolume(valor: number) {

        audio.volume = valor

    }

    selecaoVisible(visivel: boolean) {

        if (visivel) {

            selecao.style.display = "block"
            menu.style.display = "none"

        } else {

            selecao.style.display = "none"
            loop()

        }

    }

    visible(visivel: boolean) {

        if (visivel) {

            config.style.display = "block"
            menu.style.display = "none"

        } else {

            config.style.display = "none"
            menu.style.display = "block"

        }

    }

}

const configuracoes = new Configuracoes()

radio.addEventListener("change", () => {

    configuracoes.setVolume(Number(radio.value) / 100)
    console.log(radio.value);
    audio.play()

})