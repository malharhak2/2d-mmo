var Entity = function (id, position, zone) {
	this.id = id;
	this.position = position;
	this.zone = zone || 0;
	this.components = {};
};

module.exports = Entity;