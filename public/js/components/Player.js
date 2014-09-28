define ([], function () {
	var Player = function (values) {
		this.name = "player";
		this.nickname = values.nickname;
		this.position = values.position;
		this.inputs = values.inputs;
	};

	return Player;
});