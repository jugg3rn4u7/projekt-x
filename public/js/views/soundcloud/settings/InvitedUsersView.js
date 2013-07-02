define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var NotificationItemView       = require( 'NotificationsViews/NotificationItemView' );
	var NotificationsItemEmptyView = require( 'NotificationsViews/NotificationsItemEmptyView' );
	var Template                   = require( 'text!templates/groups/settings/groupInvitedUsers.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( Template ),
		'itemView'          : NotificationItemView,
		'emptyView'         : NotificationsItemEmptyView,
		'itemViewContainer' : 'ul',
		'className'         : 'user-list',
		'itemViewOptions'   : {},

		'initialize': function ( options ) {
			_.bindAll( this );

			this.viewer = this.itemViewOptions.viewer = options.viewer || 'sender';


			return this;
		}
	} );
} );