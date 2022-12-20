const mh = [...document.querySelectorAll(".mh")];

mh.forEach((h) => (h.style.height = `${window.innerHeight}px`));

function changeText(element, text) {
  document.querySelector(element).innerHTML = text;
}

function changeImage(arquivo, id) {
  const imagem = document.getElementById(id);

  imagem.src = `/public/img/${arquivo}`;
}

function changeDivImage1() {
    document.querySelector("body").style.background =
      "url('/public/img/BlocoEFrente.jpg') no-repeat / center center / fixed / cover";
  }