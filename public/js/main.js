requirejs.config ({
	baseUrl : "js/",
	paths : {
		"jquery" : "../libs/jquery/jquery.min"

	},
	shim : {
		"jquery" : {
			exports : "$"
		}
	},
	urlArgs : "d=" + Date.now()
});