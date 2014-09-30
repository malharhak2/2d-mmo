define(["time", "classes/Vector2"], function (time, Vector2) {
	var Physics = function () {

	};
	Physics.prototype.update = function (side, enComp, entities) {
		for (var i in enComp.rigidbody.comps) {
			var r = enComp.rigidbody.comps[i];
			if (side == "client" || r.netType == side) {
				this.execute(r, entities.list[r.entity], 1);
			}
		}
	};

	Physics.prototype.fullUpdate = function (side, enComp, entities) {
		for (var i in enComp.rigidbody.comps) {
			var r = enComp.rigidbody.comps[i];
			if (r.netType == side) {
				r.prevPosition = r.position;
				r.prevSpeed = r.speed;
				this.execute(r, entities.list[r.entity], 1);
			}
		}
	};

	Physics.prototype.execute = function (r, entity, delta) {
		r.position = Vector2.add(r.position, Vector2.scale(r.speed, delta));
		entity.position = Vector2.create(r.position);
		
	};

	return new Physics();
});