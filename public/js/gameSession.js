define ([], function () {
	var GameSession = function () {

	};

	GameSession.prototype.init = function (token, nickname) {
		this.token = token;
		this.nickname = nickname;
	};
	
	return new GameSession();
});