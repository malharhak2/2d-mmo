define (["animFrame", "systems/systems", "entities/enComp", "entities/entities", 
	"physics/physics", "time", "inputs/inputs", "socket"], 
	function (animFrame, systems, enComp, entities, 
		physics, time, inputs, socket) {
	var launch = function () {
		timeLoop();
		loop();
		socket.on('serverUpdate', function ())
	};

	var loop = function () {
		preInputs();
		preUpdate();
		update();
		postUpdate();
		postInputs();
		preRender();
		render();
		window.requestAnimationFrame(loop);
	};
	var inputLoop = function () {
		setTimeout(inputLoop, 1000 / 20);
	};
	var timeLoop = function () {
		time._dt = new Date.getTime();
		time._dte = new Date.getTime();
		time.localTime = 0.016;
		setInterval(function () {
			time._dt = new Date.getTime() - time._dte;
			time._dte = new Date().getTime();
			time.localTime += time._dt / 1000.0;
		}, 4);
	};

	var preInputs = function () {
		inputs.update(enComp, entities);	
	};
	var postInputs = function () {
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