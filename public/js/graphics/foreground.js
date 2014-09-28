define(["jquery"], function ($) {
	var foreground = $('#foreground');
	var ctx = foreground[0].getContext('2d');

	return {
		ctx : ctx
	};
});