var clientsManager = require('./clientsManager.js');
var db = require('../db/db.js');

	var SocketsManager = function () {

		
	};
	SocketsManager.prototype.init = function (srv) {
		this.ons = [];

		this.io = require('socket.io')(srv);

		var self = this;
		this.io.on('connection', function (socket) {
		    console.log("New socket connected");
		    socket.on('login', function (msg) {
		    	var token = msg.token;
		    	var nickname = msg.nickname;
		    	var client = clientsManager.addClient ({
		    		socket : socket,
		    		token : token,
		    		nickname : nickname
		    	});
		    	console.log(client.nickname + " connecting");
		    	socket.emit('logged', {
		    		token : client.token,
		    		nickname : client.nickname
		    	});
		    });
		    socket.on('register', function (msg) {
		    	var nickname = msg.nickname;
		    	var client = clientsManager.addClient ({
		    		socket : socket,
		    		token : false,
		    		nickname : nickname
		    	});
		    	console.log(client.nickname + " registered");
		    	db.registerUser (client);
		    	socket.emit('registered', {
		    		token : client.token,
		    		nickname : client.nickname
		    	});
		    });
		    socket.on('playerCommand', function (msg) {
		    	if (clientsManager.clients[msg.token] !== undefined) {
			    	var client = clientsManager.clients[msg.token];
			    	client.inputs.push (msg.command);
		    	}
		    });
		    
		    for (var i = 0; i < self.ons.length; i++) {
		    	var o = self.ons[i];
		    	socket.on(o.msg, self.createOn(o, socket));
		    }
		});
	};

SocketsManager.prototype.createOn = function (o, socket) {
	return function (value) {
		o.callback(value, socket);
	};
};

SocketsManager.prototype.addOn = function (msg, callback) {
	this.ons.push ({
		msg : msg,
		callback : callback
	});
};

SocketsManager.prototype.emitGlobal = function (evt, msg) {
	this.io.sockets.emit(evt, msg);
};

module.exports = new SocketsManager();