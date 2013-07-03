define( function ( require ) {
	'use strict';

	var Backbone   				= require( 'backbone' );
	var Marionette 				= require( 'marionette' );
	var SoundCloudController 	= require( 'controllers/soundcloud/SoundCloudController' );

	var Router =  Marionette.AppRouter.extend( {
		'appRoutes' : {
			'soundcloud/:clientId'                        	: 'showMyAccnt',
			'soundcloud/:clientId/tracks'  					: 'showMyTracks',
			'soundcloud/:clientId/alltracks'			    : 'showAllTracks',
			'soundcloud/:clientId/followers'		        : 'showMyFollowers',
			'soundcloud/*actions'                           : 'showDefault'
		}
	} );

	return new Router( { 'controller' : SoundCloudController } );

} );