define([], function () {
	var Renderer = function (values) {
		this.name = "renderer";
		this.image = values.image || "blue";
	};

	return Renderer; 
});