var path   = require( 'path' );
var base   = path.join( __dirname + '..', '..', '..' );

var paths = {
	'app'         : 'app',
	'config'      : path.join( 'app', 'config' ),
	'controllers' : path.join( 'app', 'controllers' ),
	'helpers'     : path.join( 'app', 'helpers' ),
	'public'      : 'public'
};

Object.keys( paths ).forEach( function ( key ) {
	var value  = paths[key];
	paths[key] = path.join( base, value );
} );

module.exports = function ( ) {
	if ( arguments.length === 0 ) {
		return paths;
	} else {
		var args = arguments[ 0 ].split( '.' );
		if ( paths[ args[ 0 ] ] ) {
			args[ 0 ] = paths[ args[ 0 ] ];
			return path.join.apply( null, args );
		} else {
			throw( new Error( 'The path you requested could not be found!' ) );
		}
	}
};

