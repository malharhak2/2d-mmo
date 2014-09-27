var Entity = require('./Entity.js');

var entities = {
	idCounter : 0,
	list : {}
};

entities.createEntity = function (zone, position) {
	var id = this.idCounter;
	this.list[id] = new Entity(id, zone, position);
	this.idCounter++;
	return this.list[id];
};