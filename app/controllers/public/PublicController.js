// The Public Controller serves out files in /public/*.
// `http://localhost/` will redirect you to `http://localhost/public/index.html`
// Currently, there is no file browsing.

// Load modules
var path = require( 'path' );
var fs   = require( 'fs' );
var mime = require( 'mime' );

// Load helpers
var httpError = require( _paths( 'helpers.httpErrorHelper' ) );

module.exports = function ( app ) {

	// ## Default route
	// Redirects to `/public/index.html`
	app.get( '/', function ( request, response ) {
		response.redirect( '/public/index.html' );
	} );

	// ## Expose public files
	// The base for respond
	app.get( '/public/*', function ( request, response ) {
		var file = request.params[0];

		if ( file ) {
			var filePath = path.join( _paths( 'public' ), file );

			// Check if the file exists
			fs.exists( filePath, function ( exists ) {
				if ( exists ) {

					// Get the mime type
					var contentType = mime.lookup( filePath );

					// Read the file and send it
					fs.readFile( filePath, function ( error, data ) {
						if ( !error ) {
							response.header( 'Content-Type', contentType );
							response.send( data );
						} else {
							httpError( request, response, 500, error );
						}
					} );

				} else {
					httpError( request, response, 404 );
				}
			} );

		} else {
			httpError( request, response, 400 );
		}
	} );

};