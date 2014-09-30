define ([], function () {
	var Player = function (values) {
		this.name = "player";
		this.nickname = values.nickname || "";
		this.position = values.position || {x: 0, y : 0};
		this.inputs = values.inputs || [];
		this.lastInputTime = values.lastInputTime || 0;
		this.lastInputSeq = values.lastInputSeq || 0;
		this.inputSeq = 0;
	};

	return Player;
});