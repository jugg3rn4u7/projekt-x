var http = require( 'http' );
var util = require( 'util' );

var httpError = function ( request, response, statusCode ) {
	var error = {
		'statusCode'    : parseInt( statusCode, 10 ),
		'statusMessage' : http.STATUS_CODES[statusCode],
		'message'       : 'An error occurred',
		'error'         : {}
	};

	// A message was passed
	if ( typeof arguments[3] === 'string' ) {
		error.message = arguments[3];
	}

	// An error object was passed but a message was not passed
	if ( typeof arguments[3] === 'object' ) {
		error.error = arguments[3];
	}

	// An error object and a message were passed
	if ( typeof arguments[4] === 'object' ) {
		error.error = arguments[4];
	}

	// A callback was passed
	if ( typeof arguments[arguments.length - 1] === 'function' ) {
		arguments[arguments.length - 1]( request, response, error );
	}

	// No callback
	else {
		response.send( statusCode, error );
	}
};

module.exports = httpError;