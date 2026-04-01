// Tutorial: JS trigger for CSS transition on body transform.
// Click anywhere to rotate the page a random small amount.

(function () {
  var rotation = 0;

  document.addEventListener("click", function () {
    var min = 1;
    var max = 20;
    rotation += Math.random() * (max - min + 1) + min;
    document.body.style.transform = "rotate(" + rotation + "deg)";
  });
})();

