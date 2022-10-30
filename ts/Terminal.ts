class Terminal {

    section:JQuery<HTMLElement>
    request:JQuery<HTMLInputElement>
    response:JQuery<HTMLTextAreaElement>
    color:string

    constructor() {

        this.section = $("#terminal")
        this.request = $("#request")
        this.response = $("#response")
        this.color = "#85E33D"
        this.setColor()

        this.request.val("$ ")

    }

    setColor(color?:string) {

        if (color != undefined) {
         
            this.request.css("color" , color)
            this.response.css("color" , color)

        } else {

            this.request.css("color" , this.color)
            this.response.css("color" , this.color)
            
        }

    }

    setVisible(mostrar:boolean) {

        this.section.css("display" , mostrar ? "block" : "none")

    }

}

const terminal = new Terminal()