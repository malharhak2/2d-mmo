define(["config", "classes/Vector2"], function (config, Vector2) {
	var PlayerControls = function () {

	};

	PlayerControls.prototype.processCommands = function (player) {
		var dir = {
			x : 0,
			y : 0
		};
		var cl = player.inputs.length;
		var command, d, n;
		var biggest = [0, 0];
		for (var i = 0; i < cl; i++) {
			if (player.inputs[i].seq <= player.lastInputSeq) continue;
			d = {
				x : 0,
				y : 0
			};
			if (player.inputs[i].seq > biggest[0]) {
				biggest = [player.inputs[i].seq, i];
			}
			if (player.inputs[i].buttons.Left.down === true) {
				d.x -= 1;
			}
			if (player.inputs[i].buttons.Right.down  === true) {
				d.x += 1;
			}
			if (player.inputs[i].buttons.Up.down  === true) {
				d.y -= 1;
			}
			if (player.inputs[i].buttons.Down.down  === true) {
				d.y += 1;
			}
			n = Vector2.scale(Vector2.normalize(d), 0.015); // Normalise chaque etape pour l'ajouter au resultat
			dir = Vector2.add(dir, n);
			//console.log("Play command" + player.inputs[i].seq + player.inputs[i].buttons.Left.down + ", "+ d.x + "-" + d.y);
		}
		var movement = Vector2.scale(dir, config.player.speed);
		if (player.inputs.length) {
			//console.log(player.lastInputSeq + " to " + player.inputs[biggest[1]].seq);
			player.lastInputTime = player.inputs[biggest[1]].time;
			player.lastInputSeq = player.inputs[biggest[1]].seq;
			//console.log(player.lastInputSeq);
		}
		return movement;
	};

	return new PlayerControls();
});