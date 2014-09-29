define(["config"], function (config) {
	var PlayerControls = function () {

	};

	PlayerControls.prototype.processCommands = function (player) {
		var dir = {
			x : 0,
			y : 0
		};
		var cl = player.inputs.length;

		for (var i = 0; i < cl; i++) {
			if (player.inputs[i].seq <= player.lastInputSeq) continue;
			
			var command = commands[i];
			if (command.buttons.Left.down) {
				dir.x -= 1;
			}
			if (command.buttons.Right.down) {
				dir.x += 1;
			}
			if (command.buttons.Up.down) {
				dir.y -= 1;
			}
			if (command.buttons.Down.down) {
				dir.y += 1;
			}
		}

		var movement = Vector2.scale(Vector2.normalize (dir.x, dir.y), config.player.speed);
		if (player.inputs.length) {
			player.lastInputTime = player.inputs[cl - 1].time;
			player.lastInputSeq = player.inputs[cl - 1].seq;
		}
		return movement;
	};

	return new PlayerControls();
});