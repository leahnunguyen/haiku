(function () {
	var nodes = document.querySelectorAll(".word-node");
	if (!nodes.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	var ticking = false;
	var lastY = 0;

	function applyParallax() {
		var y = window.scrollY || window.pageYOffset;
		lastY = y;
		nodes.forEach(function (el) {
			var rate = parseFloat(el.getAttribute("data-parallax"));
			if (isNaN(rate)) rate = 0.12;
			var offset = y * rate * -0.45;
			el.style.setProperty("--parallax-y", offset.toFixed(2) + "px");
		});
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(applyParallax);
		}
	}

	window.addEventListener("scroll", onScroll, { passive: true });
	applyParallax();
})();
