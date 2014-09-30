var requirejs = require('requirejs');

requirejs.config ({
	baseUrl : './public/js',
	modeRequire : require
});

requirejs(['entities/enComp', 'entities/entities'], 
	function (enComp, entities) {

	var socketsManager = require('./network/socketsManager.js');
	var	entitiesList = require('./assets/entitiesList.js');
	var clientsManager = require('./network/clientsManager.js');


	for (var i = 0; i < entitiesList.length; i++) {
		var d = entitiesList[i];
		var entity = entities.createEntity (d.position);
		for (var j in d.components) {
			var comp = enComp.createComponent(j, d.components[j]);
			enComp.attachComponent(comp, entity);
		}
	}
	socketsManager.addOn('getEntities', function (msg, socket) {
		createPlayerEntity(msg.token, msg.nickname);
		var entitiesList = enComp.extractList();
		socket.emit('entitiesList', {
			entitiesList : entitiesList
		});
	});

	function createPlayerEntity (token, nickname) {
		var position = {
			x : Math.floor(Math.random() * 900),
			y : Math.floor(Math.random() * 600)
		};
		var entity = entities.createEntity(position);
		var player = enComp.createComponent("player", {
			nickname : nickname,
			position : position
		});
		var renderer = enComp.createComponent("renderer", {
			position: position
		});
		var rigidbody = enComp.createComponent("rigidbody", {
			position : position
		});
		enComp.attachComponent(player, entity);
		enComp.attachComponent(renderer, entity);
		enComp.attachComponent(rigidbody, entity);
		clientsManager.clients[token].player = player;
	}

	require('./core/srvLoop.js')();
});
