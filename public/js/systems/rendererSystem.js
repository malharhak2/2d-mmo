define(["jquery"], function ($) {

	var canvas = $('#entities');
	var ctx = canvas[0].getContext('2d');

	var RendererSystem = function () {

	};

	RendererSystem.prototype.postUpdate = function (enComp, entities) {
		for (var i in entities.list) {
			var e = entities.list[i];
			if (e.components.renderer !== undefined) {
				enComp.renderer.comps[e.components.renderer].position = e.position;
			}
		}
	};

	RendererSystem.prototype.render = function (enComp, entities) {
		for (var i in enComp.renderer.comps) {
			var r = enComp.renderer.comps[i];
			ctx.fillStyle = r.image;
			ctx.fillRect(r.position.x, r.position.y, 10, 10);
		}
	};

	return new RendererSystem();
});