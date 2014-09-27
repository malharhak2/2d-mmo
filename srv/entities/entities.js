var Entity = require('./Entity.js');

var entities = {
	idCounter : 1,
	list : {}
};

entities.createEntity = function (position, zone) {
	var id = this.idCounter;
	this.list[id] = new Entity(id, position, zone);
	this.idCounter++;
	return this.list[id];
};
entities.deleteEntity = function (id) {
	delete this.list[id];
};

module.exports = entities;