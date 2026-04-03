// Whole text layer spin on click — CSS transition on .word-layer (see styles.css)

(function () {
  var layer = document.querySelector(".word-layer.grid-container");
  if (!layer) return;

  var rotation = 0;

  function randomize() {
    var min = 1;
    var max = 20;
    rotation += Math.random() * (max - min + 1) + min;
    layer.style.transform = "rotate(" + rotation + "deg)";
  }

  document.addEventListener("click", randomize);
})();
