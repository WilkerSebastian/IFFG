const playerSelecionado = { p1: false, p2: false }
let ceneraioSelecionado = false

let index = 0

let i = 0

const nomes = ["ferraz", "lincoln", "helton", "luciano", "sophia"]

const cenarios = ["busao", "bloco", "fazenda", "ifmaker", "planice"]

function jogarGrade() {

    $("#gradepersona").css("display", "block")
    $("#gradecenario").css("display", "none")
    $("#configjogo").css("display", "none")
    $("#iniciojogo").css("display", "none")
    $("#jogo").css("display", "none")

}

function menuInicial() {

    debug = $("#debug").prop("checked")
    $("body").css("background-image", `url("../img/plano_menu.jpg")`)
    $("#gradepersona").css("display", "none")
    $("#gradecenario").css("display", "none")
    $("#configjogo").css("display", "none")
    $("#iniciojogo").css("display", "block")
    $("#jogo").css("display", "none")

}

function cenarioGrade() {

    $("body").css("background-image", `url("../img/cenarios/naoselecionado.png")`)
    $("#gradepersona").css("display", "none")
    $("#gradecenario").css("display", "block")
    $("#configjogo").css("display", "none")
    $("#iniciojogo").css("display", "none")
    $("#jogo").css("display", "none")

}

function configJogo() {

    $("#gradepersona").css("display", "none")
    $("#gradecenario").css("display", "none")
    $("#configjogo").css("display", "block")
    $("#iniciojogo").css("display", "none")
    $("#jogo").css("display", "none")

}

function jogar() {

    $("#gradepersona").css("display", "none")
    $("#gradecenario").css("display", "none")
    $("#configjogo").css("display", "none")
    $("#iniciojogo").css("display", "none")
    $("#jogo").css("display", "block")
    main()

}

function changeImage(path) {

    let nome = path.slice(7)

    nome = nome.slice(0, nome.indexOf("g"))

    if (playerSelecionado.p1 && !(playerSelecionado.p2)) {

        $("#p2").text(`P2: ${nome}`)
        $("#conteudoItself2").attr("src", path)

    } else if (!playerSelecionado.p1) {

        $("#p1").text(`P1: ${nome}`)
        $("#conteudoItself").attr("src", path)

    }

}

function aleatorio() {

    if (index < nomes.length - 1) {

        i = Math.round(Math.random() * nomes.length - 1)

        changeImage(`../img/${nomes[i]}grademaior.png`)

        index++

        setTimeout(() => {

            aleatorio()

        }, 500)

    } else {

        index = 0

        selecao(nomes[i])

    }

}

function selecao(nome: string) {

    if (playerSelecionado.p1 && !(playerSelecionado.p2)) {

        player2.nome = nome
        playerSelecionado.p2 = true
        setTimeout(cenarioGrade, 2000)

    } else if (!playerSelecionado.p1) {

        playerSelecionado.p1 = true
        player1.nome = nome

    }

}

function selecaoCenario(path: string) {

    ceneraioSelecionado = true
    background.src = path
    jogar()

}

function mudarFundo(path: string) {

    if (!ceneraioSelecionado) {

        $("body").css("background-image", `url(${path})`)

    }

}

function aleatorioFundo() {

    if (index < cenarios.length - 1) {

        i = Math.round(Math.random() * cenarios.length - 1)

        mudarFundo(`../img/cenarios/${cenarios[i]}.png`)

        index++

        setTimeout(() => {

            aleatorioFundo()

        }, 500)

    } else {

        index = 0

        selecaoCenario(`../img/cenarios/${cenarios[i]}.png`)

    }

}