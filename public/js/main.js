define( function ( require ) {
	'use strict';

	var App    = require( 'App' );
	var Router = require( 'Router' );

	var SoundCloudRouter    = require( 'routers/soundcloud/SoundCloudRouter' );

	$( function () {

		App.Router           = Router;
		App.SoundCloudRouter = SoundCloudRouter;

		App.start();
	} );

} );