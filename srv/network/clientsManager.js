var Client = require('./Client.js');

var ClientsManager = function () {
	this.clients = {};
};

ClientsManager.prototype.addClient = function (infos) {
	var token;
	if (!infos.token) {
		token = this.guid();
		infos.token = token;
	} else {
		token = infos.token;
	}
	this.clients[token] = new Client(infos);
	return this.clients[token];
};

ClientsManager.prototype.guid = function () {
	return "" + Date.now() + Math.floor(Math.random () * 1000);
};

module.exports = new ClientsManager();