var config = require('../config.js');
var mysql = require('mysql');

var db = {};

db.registerUser = function (client) {
	var connection = mysql.createConnection (config.db);
	connection.connect(function (err) {
		if (err) {
			console.error ("error connecting: " + err.stack);
			return;
		}
		connection.query("INSERT INTO accounts (id, nickname, token, registered) VALUES('', '" + client.nickname + "', '" + client.token + "', now())", 
			function (err, rows) {
				if (err) {
					console.error("error with query: " + err.code);
					return;
				}
				connection.end();
			}
		);
	});

};

module.exports = db;