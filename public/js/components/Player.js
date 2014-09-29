define ([], function () {
	var Player = function (values) {
		this.name = "player";
		this.nickname = values.nickname;
		this.position = values.position;
		this.inputs = values.inputs;
		this.lastInputTime = values.lastInputTime;
		this.lastInputSeq = values.lastInputSeq;
	};

	return Player;
});