define ([], function () {
	var Button = function (keys) {
		this.lastDown = false;
		this.down = false;
		this.pressed = false;
		this.keys = keys;
	};

	Button.prototype.export = function () {
		return {
			down : this.down,
			pressed : this.pressed
		};
	};
	
	Button.prototype.press = function (key) {
		if (this.keys.indexOf(key) > -1) {
			if (!this.down) {
				this.pressed = true;
			}
			this.down = true;
			
		}
	};

	Button.prototype.release = function (key) {
		if (this.keys.indexOf(key) > -1) {
			this.down = false;
		}
	};
	
	Button.prototype.postUpdate = function () {
		this.lastDown = this.down;
		this.pressed = false;
	};

	return Button;
});