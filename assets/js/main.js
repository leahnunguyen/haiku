(function () {
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var nodes = Array.prototype.slice.call(
		document.querySelectorAll(".word-node")
	);
	if (!nodes.length) return;

	var state = [];
	var lastTime = null;

	function randomize() {
		var grid = document.querySelector(".grid-container");
		var words = document.querySelectorAll(".word-node .word");

		if (grid) {
			grid.style.transform = "rotate(" + Math.random() * 360 + "deg)";
		}

		words.forEach(function (wordEl) {
			var scale = randomNumber(50, 120) / 100;
			var translateX = randomNumber(0, 50);
			var translateY = randomNumber(0, 20);
			var rotate = randomNumber(0, 360);

			if (Math.random() > 0.5) {
				scale = 1;
				translateX = randomNumber(0, 80);
				translateY = randomNumber(0, 80);
			}

			wordEl.style.transform =
				"scale(" +
				scale +
				") translate(" +
				translateX +
				"%," +
				translateY +
				"%) rotate(" +
				rotate +
				"deg)";
		});

		// Nudge each word-node with a damped kick (pairs with update loop)
		var w = window.innerWidth;
		var h = window.innerHeight;
		var maxKick = Math.min(w, h) * 0.12;
		state.forEach(function (s) {
			s.kickX += (Math.random() - 0.5) * maxKick;
			s.kickY += (Math.random() - 0.5) * maxKick;
		});
	}

	function initState() {
		state = nodes.map(function (node) {
			var ampX = 2 + Math.random() * 4;
			var ampY = 1 + Math.random() * 3;
			var phaseX = Math.random() * Math.PI * 2;
			var phaseY = Math.random() * Math.PI * 2;
			var freqX = 0.04 + Math.random() * 0.06;
			var freqY = 0.04 + Math.random() * 0.06;

			return {
				node: node,
				ampX: ampX,
				ampY: ampY,
				phaseX: phaseX,
				phaseY: phaseY,
				freqX: freqX,
				freqY: freqY,
				kickX: 0,
				kickY: 0
			};
		});

		state.forEach(function (s) {
			s.node.style.setProperty("--dx", "0px");
			s.node.style.setProperty("--dy", "0px");
		});

		lastTime = performance.now();
	}

	function update(time) {
		if (!lastTime) lastTime = time;
		var dt = (time - lastTime) / 1000;
		lastTime = time;

		dt = Math.min(dt, 0.05);

		var t = time / 1000;
		var damp = Math.exp(-dt * 8);

		state.forEach(function (s) {
			s.kickX *= damp;
			s.kickY *= damp;

			var dx =
				Math.sin(t * s.freqX * Math.PI * 2 + s.phaseX) * s.ampX + s.kickX;
			var dy =
				Math.sin(t * s.freqY * Math.PI * 2 + s.phaseY) * s.ampY + s.kickY;

			s.node.style.setProperty("--dx", dx.toFixed(2) + "px");
			s.node.style.setProperty("--dy", dy.toFixed(2) + "px");
		});

		window.requestAnimationFrame(update);
	}

	initState();
	window.requestAnimationFrame(update);
	document.addEventListener("click", randomize);
})();
