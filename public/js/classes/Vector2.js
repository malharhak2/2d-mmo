define ([], function () {
	Number.prototype.fixed = function(n) { n = n || 3; return parseFloat(this.toFixed(n)); };

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
			x : (v1.x + v2.x).fixed(3),
			y : (v1.y + v2.y).fixed(3)
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
			x : (v1.x * scl).fixed(3),
			y : (v1.y * scl).fixed(3)
		};
	};

	Vector2.prototype.scale = function (scl) {
		return new Vector2(
			this.x * scl,
			this.y * scl
		);
	};

	Vector2.create = function (v) {
		return {
			x : v.x,
			y :  v.y
		};
	};
	Vector2.norm = function (v) {
		return Math.sqrt(v.x * v.x + v.y * v.y).fixed(3);
	};
	Vector2.prototype.length = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};
	Vector2.normalize = function (v) {
		var l = Vector2.norm(v);
		if (l === 0) return {
			x : 0,
			y : 0
		};
		return {
			x: (v.x / l).fixed(3),
			y: (v.y / l).fixed(3)
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