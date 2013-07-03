// Load modules
var path 					= require( 'path' );
var fs   					= require( 'fs' );
var mime 					= require( 'mime' );
var passport 				= require( 'passport' );
var soundcloud_api_wrapper 	= require( 'soundcloud-api-wrapper' );

// Load helpers
var httpError = require( _paths( 'helpers.httpErrorHelper' ) );

module.exports = function ( app ) {

	// ## Get all tracks
	app.get( 'soundcloud/:clientId/alltracks', function ( request, response ) {
		
		soundcloud_api_wrapper.getTracks( function ( tracks ) { 

			response.send( tracks );	

		});	

	} );
};


// passport.authenticate( 'basic', { 'session' : false } ),