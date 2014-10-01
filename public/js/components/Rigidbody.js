define([], function () {
	var Rigidbody = function (values) {
		this.side = "client";
		this.netType = "server";
		this.name = "rigidbody";
		this.position = values.position;
		this.prevPosition = this.position;
		this.speed = values.speed || {x : 10, y : 10};
		this.prevSpeed = this.speed;
	};

	Rigidbody.netLerp = ["position", "speed"];
	
	return Rigidbody;
});