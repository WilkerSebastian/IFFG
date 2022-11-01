function aleatorio() {
  const pessoas = document.getElementById("box");

  let index = 0;

  document.getElementsByClassName("box").style = "color: yellow";
  const id = setInterval(() => {
    if (index >= 10) {
      clearInterval(id);
    }
    index++;
    $(".personagem").text(pessoas[Math.floor(Math.random() * 5)]);
  }, 1000);
}
