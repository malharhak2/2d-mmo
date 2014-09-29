define(["time", "classes/Vector2"], function (time, Vector2) {
	var Physics = function () {

	};
	Physics.prototype.update = function (side, enComp, entities) {
		for (var i in enComp.rigidbody.comps) {
			var r = enComp.rigidbody.comps[i];
			if (side == "client" || r.netType == side) {
				this.execute(r, entities.list[r.entity], time.deltaTime);
			}
		}
	};

	Physics.prototype.fullUpdate = function (side, enComp, entities) {
		for (var i in enComp.rigidbody.comps) {
			var r = enComp.rigidbody.comps[i];
			if (r.netType == side) {
				r.position = r.prevPosition;
				r.speed = r.prevSpeed;
				this.execute(r, entities.list[r.entity], 0.015);
				r.prevPosition = r.position;
				r.prevSpeed = r.speed;
			}
		}
	};

	Physics.prototype.execute = function (r, entity, delta) {
		r.position = Vector2.add(r.position, Vector2.scale(r.speed, delta));
		entity.position = r.position;
		
	};

	return new Physics();
});