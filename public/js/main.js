define( function ( require ) {
	'use strict';

	var App 				= new Backbone.Marionette.Application();

	var SoundCloudRouter    = require( 'SoundCloudRouters/SoundCloudRouter' );

	$( function () {

		App.SoundCloudRouter = SoundCloudRouter;

		App.start();
	} );

} );