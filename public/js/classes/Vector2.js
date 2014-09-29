define ([], function () {
	var Vector2 = function (x, y) {
		this.x = x;
		this.y = y;
	};
	Vector2.distance = function (v1, v2) {
		var v3 = new Vector2(v2.x - v1.x, v2.y - v1.y);
		return v3.length();
	};
	
	Vector2.add = function (v1, v2) {
		return {
			x : v1.x + v2.x,
			y : v1.y + v2.y
		};
	};
	Vector2.prototype.add = function (v2) {
		return new Vector2(
			this.x + v2.x,
			this.y + v2.y
		);
	};
	
	Vector2.sub = function (v1, v2) {
		return new Vector2 (
			v1.x - v2.x,
			v1.y - v2.y
		);
	};
	Vector2.scale = function (v1, scl) {
		return {
			x : v1.x * scl,
			y : v1.y * scl
		};
	};

	Vector2.prototype.scale = function (scl) {
		return new Vector2(
			this.x * scl,
			this.y * scl
		);
	};

	Vector2.length = function (v) {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	};
	Vector2.prototype.length = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};
	Vector2.normalize = function (v) {
		var l = Vector2.length(v);
		return {
			x: v.x / l,
			y: v.y / l
		};
	};
	
	Vector2.prototype.normalize = function () {
		var l = this.length();
		return new Vector2(
			this.x / l,
			this.y / l
		);
	};
	return Vector2;
});