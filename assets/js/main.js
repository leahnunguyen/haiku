// Tornado-style animation: words orbit and spiral inward, background stays fixed.

(function () {
  var nodes = Array.prototype.slice.call(
    document.querySelectorAll(".word-node")
  );
  if (!nodes.length) return;

  var state = [];
  var animating = false;

  function initState() {
    state = nodes.map(function (node, index) {
      return {
        node: node,
        angle: Math.random() * Math.PI * 2, // random starting angle
        radius: 40 + Math.random() * 40, // starting distance from center (in %)
        spinOffset: Math.random() * 360 // per-word spin phase
      };
    });
  }

  function step(timestamp) {
    if (!animating) return;

    state.forEach(function (s, i) {
      // Rotate around center and slowly move inward (tornado spiral)
      s.angle += 0.05; // angular speed
      s.radius *= 0.985; // spiral inward

      var x = s.radius * Math.cos(s.angle);
      var y = (s.radius * 0.5) * Math.sin(s.angle); // squash vertically a bit

      var spin = (timestamp / 30 + s.spinOffset) % 360;

      s.node.style.transform =
        "translate(" +
        x.toFixed(1) +
        "%," +
        y.toFixed(1) +
        "%) rotate(" +
        spin.toFixed(1) +
        "deg)";
    });

    // Stop when words have mostly collapsed inward
    if (state.every(function (s) { return s.radius < 5; })) {
      animating = false;
      return;
    }

    window.requestAnimationFrame(step);
  }

  document.addEventListener("click", function (event) {
    // Start a fresh tornado on each click
    initState();
    if (!animating) {
      animating = true;
      window.requestAnimationFrame(step);
    }
  });
})();

