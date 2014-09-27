var Client = function (infos) {
	this.socket = infos.socket;
	this.nickname = infos.nickname;
	this.token = infos.token;
};

module.exports = Client;