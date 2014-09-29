define (["Mouse", "buttons", "time", "gameSession", "socket"], 
function (Mouse, buttons, time, gameSession, socket) {

	var Inputs = function () {
		this.buttons = {};
		this.inputSeq = 0;
		for (var i in buttons) {
			this.buttons[i] = new Button(buttons[i]);
		}
		this.commands = [];
	};

	Inputs.prototype.createCommand = function () {
		var command = {
			buttons : this.buttons,
			time : time.localTime,
			seq: ++this.inputSeq
		};
		this.commands.push(command);
		return command;
	};

	Inputs.prototype.reset = function () {
	};

	Inputs.prototype.update = function () {
		for (var i in enComp.player.comps) {
			var p = enComp.player.comps[i];
			if (p.nickname == gameSession.nickname) {
				var cmd = this.createCommand ();

				socket.emit('playerCommand', {
					command: cmd
				});
			}
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