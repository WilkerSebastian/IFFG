/*function changeText(element, text) {
  document.querySelector(element).innerHTML = text;
}

function changeImage() {
  if (
    document.getElementById("imgClickAndChange").src ==
    "/public/img/flipferrazmini-removebg-preview.png"
  ) {
    document.getElementById("conteudoItself").src =
      "/public/img/ferrazgrademaior.png";
  }
}

*/

const mh = [...document.querySelectorAll(".mh")];

mh.forEach((h) => (h.style.height = `${window.innerHeight}px`));

function changeText(element, text) {
  document.querySelector(element).innerHTML = text;
}

function changeImage(arquivo, id) {
  const imagem = document.getElementById(id);

  imagem.src = `/public/img/${arquivo}`;
}
