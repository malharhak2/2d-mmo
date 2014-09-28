define (["graphics/foreground", "graphics/entities", "graphics/background"], 
function (foreground, entities, background) {

	var width = 900, height = 600;

	var GraphicsSystem = function () {

	};

	GraphicsSystem.prototype.preRender = function () {

		foreground.ctx.clearRect(0, 0, width, height);
		entities.ctx.clearRect(0, 0, width, height);
		background.ctx.clearRect(0, 0, width, height);
	};

	return new GraphicsSystem();
});