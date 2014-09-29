define([], function () {
    var frame_time = 60/1000; // run the local game at 16ms/ 60hz

    ( function () {

        var lastTime = 0;
        var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

        for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
            window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
            window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
        }

        if ( !window.requestAnimationFrame ) {
            window.requestAnimationFrame = function ( callback, element ) {
                var currTime = Date.now(), timeToCall = Math.max( 0, frame_time - ( currTime - lastTime ) );
                var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if ( !window.cancelAnimationFrame ) {
            window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };
        }

    }() ); 
    return window.requestAnimationFrame;
});