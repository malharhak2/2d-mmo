define (['socket.io'], function (io) {
	var Socket = function () {
		this.socket = io();
	};
	Socket.prototype.login = function (nickname, token, callback) {
		console.log("Connecting socket...");

		this.socket.emit('login', {
			token : token,
			nickname : nickname
		});
		var self = this;
		this.socket.on('logged', function (msg) {
			self.token = msg.token;
			self.nickname = msg.nickname;
			console.log("Received answer - Token: " + self.token);
			callback(self.token, msg.nickname);
		});
	};
	Socket.prototype.emit = function (msg, value) {
		if (value === undefined) {
			value = {};
		}
		value.token = this.token;
		value.nickname = this.nickname;
		this.socket.emit(msg, value);
	};
	Socket.prototype.on = function (msg, cb) {
		this.socket.on(msg, cb);
	};
	
	Socket.prototype.register = function (nickname, callback) {
		console.log("Registering " + nickname);
		this.socket.emit('register', {
			nickname : nickname
		});
		this.socket.on('registered', function (msg) {
			console.log("registered");
			callback(msg.token, msg.nickname);
		});
	};

	return new Socket();
});