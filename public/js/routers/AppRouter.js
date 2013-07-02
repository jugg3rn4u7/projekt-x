define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Controller = require( 'Controller' );

	var AppRouter = Marionette.AppRouter.extend( {
		'appRoutes' : {
			'login'               : 'showSignup',
			'logout'              : 'logout',
			'users-groups'        : 'showUserGroups',
			'users*subroute'      : 'invokeUsersApp',
			'error'               : 'error',
			'notifications'       : 'showNotifications',
			'messages'       	  : 'showMessages',
			'store/*subroute'     : 'invokeStore',
			'resources*subroute'  : 'invokeResources',
			'create-group'        : 'createGroup',
			'search/:query'       : 'search',
			'signup'              : 'showSignup'
		}
	} );

	return new AppRouter( { 'controller' : Controller } );
} );
