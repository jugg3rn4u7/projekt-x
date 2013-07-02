	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );
	var Session    = require( 'Session' );
	var async      = require( 'async' );

	var SoundCloudController = Marionette.Controller.extend( {

		'initialize' : function( options ){
			_.bindAll( this );
			
		},

		'isAuthenticated' : function () {
			
		}

	} );

	return new SoundCloudController();

} );