define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var NotificationItemView       = require( 'NotificationsViews/NotificationItemView' );
	var NotificationsItemEmptyView = require( 'NotificationsViews/NotificationsItemEmptyView' );
	var template                   = require( 'text!templates/groups/settings/groupRequestedUsers.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'itemView'          : NotificationItemView,
		'emptyView'         : NotificationsItemEmptyView,
		'itemViewContainer' : 'ul',
		'className'         : 'user-list',
		'itemViewOptions'   : {},



		'initialize': function ( options ) {
			_.bindAll( this );

			this.viewer = this.itemViewOptions.viewer = options.viewer || 'receiver';

			this.on( 'itemview:actionSuccess', function() {
				this.trigger( 'requestItemComplete' );
			} );

			return this;
		}

	} );
} );