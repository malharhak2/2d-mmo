var entities = require('./entities.js');

var enComp = {
	components: {}
};

enComp.registerComponent = function (name, klass) {
	this.components[name] = klass;
	this[name] = new ComponentStorage ();
};

var ComponentStorage = function () {
	this.idCounter = 1;
	this.comps = {};

};
enComp.createComponent = function (name, values) {
	var component = new this.components[name](values);
	this[name].addComponent (component);
	return component;
};
enComp.destroyComponent = function (name, id) {
	var component = this[name].comps[id];
	if (component.entity !== undefined) {
		this.detachComponent(component, entities[component.entity]);
	}
	this[name].deleteComponent(id);

};
enComp.attachComponent = function (component, entity) {
	entity.components[component.name] = component.id;
	component.entity = entity.id;
};
enComp.detachComponent = function (component, entity) {
	delete entity.components[component.name];
};
enComp.extractList = function () {
	var list = [];
	for (var i in entities.list) {
		var e = entities.list[i];
		var val = {
			id : e.id,
			position : e.position,
			components : {}
		};
		for (var j in e.components) {
			val.components[j] = this[j].comps[e.components[j]];
		}
		list.push(val);
	}
	console.log("Extract list");
	console.log(list);
	return list;
}
ComponentStorage.prototype.addComponent = function (component) {
	component.id = this.idCounter;
	this.comps[this.idCounter] = component;
	this.idCounter++;
};

ComponentStorage.prototype.deleteComponent = function (id)  {
	delete this.comps[id];
	// TODO : Detacher le component avant de l'effacer
};


var Renderer = require('../components/Renderer.js');
enComp.registerComponent('renderer', Renderer);

var entitiesList = require('../assets/entitiesList.js');

for (var i = 0; i < entitiesList.length; i++) {
	var d = entitiesList[i];
	var entity = entities.createEntity (d.position);
	for (var j in d.components) {
		var comp = enComp.createComponent(j, d.components[j]);
		enComp.attachComponent(comp, entity);
	}
}

var socketsManager = require('../network/socketsManager.js');
socketsManager.addOn('getEntities', function (msg, socket) {
	var entitiesList = enComp.extractList();
	socket.emit('entitiesList', {
		entitiesList : entitiesList
	});
});

module.exports = enComp;