define(['socket', 'jquery', 'entities/enComp', "inputs/inputs", "gameSession"], 
	function (socket, $, enComp, inputs, gameSession) {
	
	var gameInit = function (callback) {
		var token = localStorage.getItem('token');
		var nickname = localStorage.getItem('nickname');
		var cb = function () {
			getEntities (callback);
		};
		if (token !== null) {
			login(nickname, token, cb);
		} else {
			signup(cb);
		}
		inputs.init($('#game'));
	};

	function getEntities (callback) {
		socket.emit('getEntities');
		socket.on('entitiesList', function (msg) {
			enComp.receiveEntities (msg.entitiesList);
			callback();
		});
	}

	function signup (callback) {
		$('#validNickname').on('click', function () {
			var nickname = $('#nickname').val();
			socket.register(nickname, function (token, nickname) {
				localStorage.setItem('token', token);
				localStorage.setItem('nickname', nickname);
				gameSession.init(token, nickname);
				showGame();
				callback();
			});
		});
	}

	function login (nickname, token, callback) {
		$('#signup').addClass('invisible');
		$('#login').removeClass('invisible');
		$('#characName').html(nickname);
		$('#playBtn').on('click', function () {

			socket.login(nickname, token, function (token, nickname) {
				console.log("Sockets OK");
				console.log("saving token " + token);
				localStorage.setItem('token', token);
				localStorage.setItem('nickname', nickname);
				gameSession.init(token, nickname);
				showGame();
				callback();
			});
		});
	}

	function showGame () {
		$('#page').addClass('invisible');
		$('#game').removeClass('invisible');		
	}

	return gameInit;
});