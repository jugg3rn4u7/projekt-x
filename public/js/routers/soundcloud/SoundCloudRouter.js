define( function ( require ) {
	'use strict';

	var Backbone   				= require( 'backbone' );
	var Marionette 				= require( 'marionette' );
	var SoundCloudController 	= require( 'controllers/soundcloud/SoundCloudController' );

	var router =  Marionette.AppRouter.extend( {
		'appRoutes' : {
			'groups/:groupId'                        : 'showGroup',
			'groups/:groupId/resources/:resourceId'  : 'invokeResources',
			'groups/:groupId/settings/membership'    : 'showMembership',
			'groups/:groupId/settings*actions'       : 'showSettings',
			'groups/*actions'                        : 'showDefault'
		}
	} );

	return new router( { 'controller' : SoundCloudController } );

} );