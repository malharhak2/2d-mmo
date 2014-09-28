requirejs.config ({
	baseUrl : "js/",
	paths : {
		"jquery" : "../libs/jquery/jquery.min",
		"socket.io" : "/socket.io/socket.io"

	},
	shim : {
		"jquery" : {
			exports : "$"
		},
		"socket.io" : {
			exports : "io"
		}
	},
	urlArgs : "d=" + Date.now()
});

require(['gameInit', 'gameloop'], function (gameInit, gameloop) {
	gameInit( function () {
		console.log("Game launched!");
		gameloop();
	});
});