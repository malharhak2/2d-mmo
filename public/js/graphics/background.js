define(["jquery"], function ($) {
	var background = $('#background');
	var ctx = background[0].getContext('2d');

	return {
		ctx : ctx
	};
});