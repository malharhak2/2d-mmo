define([], function () {
	var Command = function (buttons, time, seq) {
		this.buttons = buttons;
		this.time = time;
		this.seq = seq;
	};

	return Command;
});