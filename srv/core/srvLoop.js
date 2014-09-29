var requirejs = require('requirejs');

define(["physics/physics", "entities/entities", "entities/enComp", "inputs/playerControls"], 
	function (physics, entities, enComp, playerControls) {
	
	var socketsManager = require('./network/socketsManager.js');

	var  localTime = 0.016;
	var serverTime = localTime;
	var dt = new Date().getTime();
	var dte = new Date().getTime();
	var pdt = 0.0001;
	var pdte = new Date().getTime();

	var timeLoop = function () {
		setInterval (function () {
			dt = new Date().getTime() - dte;
			dte = new Date().getTime();
			localTime += dt / 1000.0;
		}, 4);
	};

	var physicsLoop = function () {
		setInterval (function () {
			pdt = (new Date().getTime() - pdte) / 1000.0;
			pdte = new Date().getTime();
			updatePhysics();
		}, 15);
	};

	var updateLoop = function () {
		setInterval (function () {
			serverTime = localTime;
			socketsManager.emitGlobal('serverUpdate', {
				entities : enComp.extractList(),
				time : serverTime
			});
		}, 45);
	};

	var updatePhysics = function () {
		processInputs();
		physics.fullUpdate("server", enComp, entities);
	};

	var clientsManager = require('../network/clientsManager.js');

	var processInputs = function () {
		for (var i in clientsManager.clients) {
			var client = clientsManager.clients[i];
			var player = client.player;
			var entity = entities.list[player.entity];
			var rigidbody = enComp.rigidbody.comps[entity.components.rigidbody];
			rigidbody.speed = playerControls.processCommands(player.inputs);
		}
	};

	socketsManager.addOn('playerCommand', function (msg) {
		var token = msg.token;
		var client = clientsManager.clients[token];
		client.player.inputs.push(msg.command);
	});
})