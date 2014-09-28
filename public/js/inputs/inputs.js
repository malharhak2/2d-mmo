define (["Mouse", "buttons"], 
function (Mouse, buttons) {

	var Inputs = function () {
		this.buttons = {};

		for (var i in buttons) {
			this.buttons[i] = new Button(buttons[i]);
		}
	};

	Inputs.prototype.reset = function () {
	};

	Inputs.prototype.update = function () {
		for (var i in enComp.player.comps) {

		}
	};

	Inputs.prototype.postUpdate = function () {
		for (var i in this.buttons) {
			this.buttons[i].postUpdate();
		}
	};

	Inputs.prototype._inputs = function (callback) {

	};
	Inputs.prototype.init = function (container) {
		console.log("Stuff detected");
		var self = this;
		container.on('keydown', function (event) {
			for (var i in self.buttons) {
				self.buttons[i].press(event.keyCode);
			}
		});
		container.on('keyup', function (event) {
			for (var i in self.buttons) {
				self.buttons[i].release(event.keyCode);
			}
		});
	};

	return new Inputs();
});