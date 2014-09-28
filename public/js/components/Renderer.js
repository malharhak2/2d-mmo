define([], function () {
	var Renderer = function (values) {
		this.netType = "client";
		this.name = "renderer";
		this.image = values.image || "blue";
		this.position = values.position;
	};

	return Renderer; 
});