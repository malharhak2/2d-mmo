define(["entities/entities", "components/Renderer"], 
	function (entities, Renderer) {

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
		this[name].addComponent (component, values.id);
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

	ComponentStorage.prototype.addComponent = function (component, id) {
		component.id = id
		this.comps[id] = component;
		this.idCounter++;
	};

	ComponentStorage.prototype.deleteComponent = function (id)  {
		delete this.comps[id];
		// TODO : Detacher le component avant de l'effacer
	};

	enComp.receiveEntities = function (entitiesList) {
		for (var i = 0; i < entitiesList.length; i++) {
			var d = entitiesList[i];
			var entity = entities.createEntity (d.position, d.id);
			for (var j in d.components) {
				var comp = enComp.createComponent(j, d.components[j]);
				enComp.attachComponent(comp, entity);
			}
		}
	}


	enComp.registerComponent('renderer', Renderer);

	return enComp;
});