define ([], function () {
	var lerp = function (min, max, step) {
		return (max - min) * step + min;
	};

	return {
		lerp : lerp
	};
});