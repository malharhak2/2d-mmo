define(["entities/entities", "components/Renderer", "components/Player", "components/Rigidbody"], 
	function (entities, Renderer, Player, Rigidbody) {

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
	enComp.loadComponent = function (name, values) {
		var component = new this.components[name](values);
		this[name].loadComponent(component, values.id);
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

	ComponentStorage.prototype.loadComponent = function (component, id) {
		component.id = id;
		this.comps[id] = component;
		this.idCounter++;
	};
	ComponentStorage.prototype.addComponent = function (component) {
		component.id = this.idCounter;
		this.comps[this.idCounter] = component;
		this.idCounter++;
	};
	ComponentStorage.prototype.deleteComponent = function (id)  {
		delete this.comps[id];
		// TODO : Detacher le component avant de l'effacer
	};

	enComp.receiveEntities = function (entitiesList) {
		for (var i = 0; i < entitiesList.length; i++) {
			var d = entitiesList[i];
			var entity = entities.loadEntity (d.position, d.id);
			for (var j in d.components) {
				var comp = enComp.loadComponent(j, d.components[j]);
				enComp.attachComponent(comp, entity);
			}
		}
		console.log(entities.list, this);
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
				console.log(j);
				val.components[j] = this[j].comps[e.components[j]];
			}
			list.push(val);
		}
		console.log("Extract list");
		console.log(list);
		return list;
	};


	enComp.registerComponent('renderer', Renderer);
	enComp.registerComponent('player', Player);
	enComp.registerComponent('rigidbody', Rigidbody);

	return enComp;
});