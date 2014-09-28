define(["jquery"], function ($) {
	var entities = $('#entities');
	var ctx = entities[0].getContext('2d');

	return {
		ctx : ctx
	};
});