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

/*function changeDivImage() {
  var imgPath = new String();
  imgPath = document.getElementById("div1").style.backgroundImage;

  if (imgPath == "url(images/blue.gif)" || imgPath == "") {
    document.getElementById("div1").style.backgroundImage =
      "url(images/green.gif)";
  } else {
    document.getElementById("div1").style.backgroundImage =
      "url(images/blue.gif)";
  }
}
*/

/*function changeDivImage(arquivo, id) {
  const backimagem = document.getElementById(id);

  backimagem.src = `/public/img/${arquivo}`;
}*/

function changeDivImage1() {
  document.querySelector("body").style.background =
    "url('/public/img/BlocoEFrente.jpg') no-repeat / center center / fixed / cover";
}
/*
function changeDivImage2() {
  document.querySelector("body").style.background =
    "url('/public/img/BlocoELado.jpg') center center / cover";
}
function changeDivImage3() {
  document.querySelector("body").style.background =
    "url('/public/img/Onibus.jpg') center center / cover";
}*/
