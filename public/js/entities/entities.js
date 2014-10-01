define(["entities/Entity"], function (Entity) {

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
	entities.loadEntity = function (data) {
		var ent = new Entity(data.id, data.position);
		this.list[data.id] = ent;
		ent.components = data.components;
		this.idCounter++;
		return this.list[data.id];
	};
	entities.deleteEntity = function (id) {
		delete this.list[id];
	};

	return entities;
});