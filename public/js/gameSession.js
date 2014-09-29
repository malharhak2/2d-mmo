define ([], function () {
	var GameSession = function () {

	};

	GameSession.prototype.connect = function (token, nickname) {
		this.token = token;
		this.nickname = nickname;
	};
	
	return new GameSession();
});