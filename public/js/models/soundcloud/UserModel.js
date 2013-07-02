define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var _        = require( 'underscore' );

	return Backbone.Model.extend( {
		'idAttribute' : '_id',

		'urlRoot' : function () {
			return '/groups/' + this.groupId + '/' + this.type;
		},

		// Check options for 'type' and 'groupId' for the url.
		// Check options.collection in the case that this model to created by a collection and not on it's own
		'initialize' : function ( properties, options ) {
			if ( options ) {
				if ( options.type ) {
					this.type = options.type;
				} else if ( options.collection.type ) {
					this.type = options.collection.type;
				}

				if ( options.groupId ) {
					this.groupId = options.groupId;
				} else if ( options.collection.groupId ) {
					this.groupId = options.collection.groupId;
				}
			}
		},

		// don't remove this.
		// because we're adding users that already exist with an _id,
		// and backbone checks for the id property
		'isNew' : function () {
			return true;
		}

	} );
} );