// Simple Javascript animation demo inspired by CWD 6.3:
// On each click, gently rotate the poem container a bit more.

(function () {
	var stage = document.querySelector(".river-stage");
	if (!stage) return;

	var rotation = 0;

	document.addEventListener("click", function () {
		// add a small random rotation between 2 and 10 degrees
		var min = 2;
		var max = 10;
		rotation += Math.random() * (max - min) + min;
		stage.style.transform = "rotate(" + rotation + "deg)";
	});
})();
