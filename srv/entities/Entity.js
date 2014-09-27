var Entity = function (id, zone, position) {
	this.id = id;
	this.position = position;
	this.zone = zone;
	this.components = {};
};

module.exports = Entity;