define (["systems/systems", "entities/enComp", "entities/entities", "physics/physics", "time", "inputs/inputs"], 
	function (systems, enComp, entities, physics, time, inputs) {
	var launch = function () {
		inputLoop();
		loop();
	};

	var loop = function () {
		preUpdate();
		update();
		postUpdate();
		preRender();
		render();
		window.requestAnimationFrame(loop);
	};
	var inputLoop = function () {
		processInputs();
		setTimeout(inputLoop, 1000 / 20);
	};

	var processInputs = function () {
		inputs.update(enComp, entities);
		inputs.postUpdate();
	};

	var preUpdate = function () {
		time.preUpdate();
	};

	var update = function () {
		physics.update("client", enComp, entities);
	};

	var postUpdate = function () {
		systems.launch("postUpdate");
	};

	var preRender = function () {
		systems.launch("preRender");
	};

	var render = function () {
		systems.launch("render");
	};

	return launch;
});