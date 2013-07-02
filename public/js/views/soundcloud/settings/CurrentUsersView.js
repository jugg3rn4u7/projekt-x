define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var template                  = require( 'text!templates/groups/settings/groupCurrentUsers.html' );
	var GroupCurrentUsersItemView = require( 'GroupSettingViews/CurrentUsersItemView' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'itemView'          : GroupCurrentUsersItemView,
		'itemViewContainer' : '#user-list',
		'className'         : 'user-list',

		'initialize' : function ( models, options ) {
			_.bindAll( this );

			this.collection = options.collection;

			this.listenTo( Vent, 'GroupUsers:delete', this.deleteUser );
			return this;
		},

		'deleteUser' : function ( options ) {
			options.user.model.destroy();
		}

	} );
} );