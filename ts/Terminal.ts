class Terminal {

    section: JQuery<HTMLElement>
    request: JQuery<HTMLInputElement>
    response: JQuery<HTMLTextAreaElement>
    color: string

    constructor() {

        this.section = $("#terminal")
        this.request = $("#request")
        this.response = $("#response")
        this.color = "#85E33D"
        this.setColor()

    }

    commander() {

        const linha = this.request.val() as string
        let resposta: string = "$ "
        let clear = false

        switch (true) {
            case linha.slice(2, 13) == "kill player":

                const num = Number(linha[14])
                let nome: string

                if (num == 1 || num == 2) {

                    if (num == 1) {

                        player1.life = 0
                        nome = player1.nome

                    } else {

                        player2.life = 0
                        nome = player2.nome

                    }

                    resposta += `player ${nome} foi finalizado!`

                } else {

                    resposta += "index errado!"

                }

                break;
            case linha.slice(2, 5) == "cls":

                clear = true

                break;
            case linha.slice(2, 10) == "time set":

                time = Number(linha.slice(11))

                break;
            default:

                resposta += "command not found!"

                break;
        }

        const concat = this.response.val()

        this.request.val("$ ")
        this.response.val(clear ? "$ " : concat + resposta + "\n")

    }

    setColor(color?: string) {

        if (color != undefined) {

            this.request.css("color", color)
            this.response.css("color", color)

        } else {

            this.request.css("color", this.color)
            this.response.css("color", this.color)

        }

    }

    setVisible(mostrar: boolean) {

        this.section.css("display", mostrar ? "block" : "none")

    }

}

const terminal = new Terminal()

terminal.request.on("keydown", (e) => { if (e.key == "Enter") terminal.commander() })