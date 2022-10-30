class Terminal {

    terminal:JQuery<HTMLElement>
    request:JQuery<HTMLInputElement>
    response:JQuery<HTMLTextAreaElement>

    constructor() {

        this.terminal = $("#terminal")
        this.request = $("#request")
        this.response = $("#response")

    }

    setVisible(mostrar:boolean) {

        this.terminal.css("display" , mostrar ? "block" : "none")

    }

}

const terminal = new Terminal()