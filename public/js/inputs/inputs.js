define (["inputs/buttons", "inputs/Button", "time", "gameSession", "socket", "inputs/Command"], 
function (buttons, Button, time, gameSession, socket, Command) {

	var Inputs = function () {
		this.buttons = {};
		this.inputSeq = 0;
		for (var i in buttons) {
			this.buttons[i] = new Button(buttons[i]);
		}
		this.commands = [];
	};

	Inputs.prototype.createCommand = function (player) {

		player.inputSeq++;
		var buttons = {};
		for (var i in this.buttons) {
			buttons[i] = this.buttons[i].export();
		}
		var command = new Command (
			buttons,
			time.localTime,
			player.inputSeq
		);
		//console.log(player.inputSeq);
		player.inputs.push(command);
		return command;
	};

	Inputs.prototype.reset = function () {
	};

	Inputs.prototype.update = function (enComp, entities) {
		for (var i in enComp.player.comps) {
			var p = enComp.player.comps[i];
			if (p.nickname == gameSession.nickname) {
				var cmd = this.createCommand (p);
				socket.emit('playerCommand', {
					command : cmd
				});
				//createTimeout(cmd, socket)();
			}
		}
	};

	var createTimeout = function (cmd, socket) {
		return function () {
			setTimeout (function () {
				socket.emit('playerCommand', {
					command : cmd
				});
			}, 50);
		};
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