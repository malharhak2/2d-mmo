define(["systems/rendererSystem", "systems/playerSystem", "entities/enComp", "entities/entities",
	"systems/graphicsSystem"], 
	function (rendererSystem, playerSystem, enComp, entities, 
		graphicsSystem) {
		
	var systems = {
		sys : {}
	};

	systems.registerSystem = function (name, obj) {
		this.sys[name] = obj;
	};

	systems.launch = function (evt) {
		for (var i in this.sys) {
			if (typeof this.sys[i][evt] === "function") {
				this.sys[i][evt](enComp, entities);
			}
		}
	};

	systems.registerSystem ("rendererSystem", rendererSystem);
	systems.registerSystem ("playerSystem", playerSystem);
	systems.registerSystem ("graphicsSystem", graphicsSystem);

	return systems;
});