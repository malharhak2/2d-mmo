define (["animFrame", "systems/systems", "entities/enComp", "entities/entities", 
	"physics/physics", "time", "inputs/inputs", "socket", "config", "gameSession",
	"inputs/playerControls", "classes/Vector2"], 
	function (animFrame, systems, enComp, entities, 
		physics, time, inputs, socket, config, gameSession,
		playerControls, Vector2) {
	var launch = function () {
		timeLoop();
		loop();
		socket.on('serverUpdate', function (msg) {
			console.log("Server update!");
			serverUpdate(msg);
		});
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

	var serverUpdates = [];
	var oldestTick = 0;
	var serverUpdate = function (msg) {
		time.serverTime = msg.time;
		if (config.brute_force) {
			for (var i = 0; i < msg.entities.length; i++) {
				var e = msg.entities[i];
				if (entities.list[e.id] !== undefined) {
					entities.list[e.id].position = e.position;
					for (var j in e.components) {
						enComp[j].comps[e.components[j].id] = e.components[j];
					}
				} else {
					enComp.receiveEntity (e);
				}
			}
		} else {
			serverUpdates.push(msg);
			if (serverUpdates.length >= 60 * config.bufferSize) {
				serverUpdates.splice(0, 1);
			}
			oldestTick = serverUpdates[0].time;
			processCorrection();
			processInterpolation ();
		}
	};

	var processInterpolation = function () {
		var currentTime = time.localTime;
		var count = serverUpdates.length - 1;
		var target = null, previous = null;

		for (var i = 0; i < count; i++) {
			var point = serverUpdates[i];
			var next = serverUpdates[i + 1];

			if (currentTime > point.time && currentTime < next.time) {
				target = next;
				previous = point;
				break;
			}
		}

		if (!target) {
			target = this.server_updates[0];
			previous = this.server_updates[0];
		}

		if (target && previous) {
			var targetTime = target.time;

			var diff = targetTime - currentTime;
			var maxDifference = (target.time - previous.time).fixed(3);

			// TODO: INTERPOLATION
		}
	};
	var processCorrection = function () {
		if (!serverUpdates.length) return;

		var lastData = serverUpdates[serverUpdates.length - 1];
		var p, sp;
		for (var c in enComp.player.comps) {
			if (enComp.player.comps[c].nickname == gameSession.nickname) {
				p = enComp.player.comps[c];
				break;
			}
		}
		for (var e = 0; e < lastData.entities.length; e++) {
			var entity = lastData.entities[e];
			if (entity.components.player !== undefined) {
				if (entity.components.player.nickname == gameSession.nickname) {
					sp = entity;
					break;
				}
			}
		}
		if (sp !== undefined) {
			var index = -1;
			var lastServerInput = sp.components.player.lastInputSeq;
			for (var i = 0; i < p.inputs.length; i++) {
				if (p.inputs[i].seq == lastServerInput) {
					index = i;
					break;
				}
			}
			if (index != -1) {
				//console.log("=========");
				var toClear = Math.abs(index + 1);
				//p.inputs.splice(0, toClear);
				//console.log(p.inputs[0].seq);
				//console.log("last: " + lastServerInput + " - toClear: " + toClear + " - p.last: " + + p.lastInputSeq);
				var pe = entities.list[p.entity];
				pe.position = Vector2.create(sp.position);
				p.lastInputSeq = lastServerInput;

				processInputs(pe, p);
			}
		} else { 
			console.log("WTF");
		}
	};

	var processInputs = function (entity, player) {
		var movement = playerControls.processCommands(player);
		var rigidbody = enComp.rigidbody.comps[entity.components.rigidbody];
		rigidbody.speed = Vector2.create(movement);
		rigidbody.position = Vector2.create(entity.position);
		physics.execute(rigidbody, entity,1);
		player.position = Vector2.create(entity.position);
	};
	var timeLoop = function () {
		time._dt = new Date().getTime();
		time._dte = new Date().getTime();
		time.localTime = 0.016;
		time.serverTime = 0;
		setInterval(function () {
			time._dt = new Date().getTime() - time._dte;
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
		var player, entity;
		for (var i in enComp.player.comps) {
			if (enComp.player.comps[i].nickname === gameSession.nickname) {
				player = enComp.player.comps[i];
				entity = entities.list[player.entity];
			}
		}
		processInputs(entity, player);
		//physics.update("client", enComp, entities);
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