define ([], function () {
	var loop = function () {
		inputs();
		update();
		render();
		window.requestAnimationFrame(loop);
	};

	var inputs = function () {

	};

	var update = function () {

	};
	var render = function () {

	};

	return loop;
});