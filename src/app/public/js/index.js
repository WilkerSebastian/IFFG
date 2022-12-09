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

function changeDivImage(arquivo, id) {
  const backimagem = document.getElementById(id);

  backimagem.src = `/public/img/${arquivo}`;
}
