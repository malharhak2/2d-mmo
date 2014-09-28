define(["graphics/foreground"], function (foreground) {
	var PlayerSystem = function () {

	};

	PlayerSystem.prototype.postUpdate = function (enComp, entities) {
		for (var i in enComp.player.comps) {
			var p = enComp.player.comps[i];
			p.position = entities.list[p.entity].position;
		}
	};

	PlayerSystem.prototype.render = function (enComp, entities) {
		for (var i in enComp.player.comps) {
			var p = enComp.player.comps[i];
			foreground.ctx.fillStyle = "white";
			foreground.ctx.font = "16px Arial";
			foreground.ctx.textAlign = "center";
			foreground.ctx.fillText(p.nickname, p.position.x, p.position.y - 20);
		}
	};

	return new PlayerSystem();
});