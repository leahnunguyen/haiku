// Javascript animation just for the haiku words (background stays fixed).
// We gently float each .word-node up and down using requestAnimationFrame.

(function () {
	var nodes = Array.prototype.slice.call(document.querySelectorAll(".word-node"));
	if (!nodes.length) return;

	var start = null;

	function step(timestamp) {
		if (!start) start = timestamp;
		var t = (timestamp - start) / 1000; // seconds

		nodes.forEach(function (node, index) {
			// Each word gets a phase offset so they don't move in sync
			var phase = index * 0.7;
			var offset = Math.sin(t * 0.8 + phase) * 6; // +/- 6px vertical drift
			node.style.transform = "translate3d(-50%, " + offset.toFixed(2) + "px, 0)";
		});

		window.requestAnimationFrame(step);
	}

	window.requestAnimationFrame(step);
})();
