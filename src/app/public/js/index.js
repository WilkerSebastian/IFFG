function changeText(element, text) {
  document.querySelector(element).innerHTML = text;
}

function changeImage() /*Mano Wilker coloca o código de mudar as imagens que aparecem à esquerda da tela quando clicar em uma imagem de personagem da grade, o que eu fiz não dá certo e eu não sou muito bom com javascript*/ {
  if (
    document.getElementById("imgClickAndChange").src ==
    "/public/img/flipferrazmini-removebg-preview.png"
  ) {
    document.getElementById("conteudoItself").src =
      "/public/img/ferrazgrademaior.png";
  }
}
