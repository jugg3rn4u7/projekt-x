define( function ( require ) {
	'use strict';

	var Backbone       = require( 'backbone' );
	var GroupUserModel = require( 'GroupModels/UserModel' );

	return Backbone.Collection.extend( {

		'url' : function () {
			return '/groups/' + this.groupId + '/' + this.type;
		},

		// Check options for 'type' and 'groupId' for the url.
		'initialize' : function ( models, options ) {
			if ( options ) {
				if ( options.type ) {
					this.type = options.type;
				}

				if ( options.groupId ) {
					this.groupId = options.groupId;
				}
			}
		}

	} );
} );