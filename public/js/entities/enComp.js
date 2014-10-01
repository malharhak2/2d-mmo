define(["entities/entities", "components/Renderer", "components/Player", "components/Rigidbody", "config"], 
	function (entities, Renderer, Player, Rigidbody, config) {

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
		if (values.entity) {
			component.entity = values.entity;
		}
		return component;
	};
	enComp.loadComponents = function (name, components) {
		for (var i in components) {
			this.loadComponent(name, components[i]);
		}
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

	enComp.receiveEntity = function (list, e) {
		var entity = entities.loadEntity(list.entities[e]);
		for (var i in list.components) {
			this.loadComponent(i, list.components[i][entity.components[i]]);
		}
	};
	
	enComp.receiveEntities = function (entitiesList) {
		for (var i in entitiesList.entities) {
			entities.loadEntity(entitiesList.entities[i]);
		}
		for (var c in entitiesList.components) {
			this.loadComponents(c, entitiesList.components[c]);
		}

		// Old version
		/*for (var i = 0; i < entitiesList.length; i++) {
			var d = entitiesList[i];
			var entity = entities.loadEntity (d.position, d.id);
			for (var j in d.components) {
				var comp = enComp.loadComponent(j, d.components[j]);
				enComp.attachComponent(comp, entity);
			}
		}
		console.log(entities.list, this);*/
	};
	enComp.extractList = function () {
		var res = {
			components : {},
			entities : {}
		};
		for (var i in enComp.components) {
			res.components[i] = enComp[i].comps;
		}
		res.entities = entities.list;
		return res;

		// Old version

		/*var list = [];
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
		return list;*/
	};


	enComp.registerComponent('renderer', Renderer);
	enComp.registerComponent('player', Player);
	enComp.registerComponent('rigidbody', Rigidbody);

	if ('undefined' !== typeof(window) && config.debug) {
		window.entities = entities;
		window.enComp = enComp;
	}
	return enComp;
});