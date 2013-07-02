 define( function ( require ) {
	'use strict';

	var _                        = require( 'underscore' );
	var Marionette               = require( 'marionette' );
	var Vent                     = require( 'Vent' );

	var template                 = require( 'text!templates/groups/settings/membershipLayout.html' );

	var RequestedUsersView       = require( 'GroupViews/settings/RequestedUsersView');
	var InvitedUsersView         = require( 'GroupViews/settings/InvitedUsersView');
	var InviteUsersFormView      = require( 'GroupSettingViews/InviteUsersFormView' );
	var CurrentUsersView         = require( 'GroupSettingViews/CurrentUsersView' );

	var UserModel                = require( 'GroupModels/UserModel' );
	var NotificationModel        = require( 'NotificationsModels/NotificationModel' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),
		'tagName'  : 'div',

		'regions' : {
			'requestedUsersRegion' : '#requestedUsers',
			'invitedUsersRegion'   : '#invitedUsers',
			'inviteFormRegion'     : '#inviteForm',
			'currentUsersRegion'   : '#currentUsers'
		},

		'initialize' : function ( options ) {

			_.bindAll( this );
			this.requestedUsers = options.requestedUsers;
			this.invitedUsers   = options.invitedUsers;
			this.currentUsers   = options.currentUsers;
			this.permissions    = options.permissions.membershipPermissions();

			return this;
		},

		'onRender' : function () {
			var self = this;

			if ( this.requestedUsers.length > 0 ) {
				this.requestedUsersView();
			}

			if ( this.invitedUsers.length > 0 ) {
				this.invitedUsersView();
			}

			if ( _.findWhere( this.permissions, { 'method' : 'post', 'route': '/groups/:groupId/invited-users' } )  ) {
				var inviteForm = new InviteUsersFormView( null, { 'group' : this.model } );
				this.inviteFormRegion.show( inviteForm );

				inviteForm.on( 'GroupMembership:inviteUser', function () {
					self.invitedUsers.fetch( { 'success' : function () {
							if ( self.invitedUsers.length > 0 ) {
								self.invitedUsersView();
							}
						}
					} );
				} );
			}

			if ( _.findWhere( this.permissions, { 'method' : 'get', 'route': '/groups/:groupId/users/:userId?' } )  ) {
				this.currentUsersRegion.show( new CurrentUsersView( null, { 'collection' : this.currentUsers } ) );
			}


			return this;
		},

		'requestedUsersView' : function() {
			if ( _.findWhere( this.permissions, { 'method' : 'get', 'route': "/groups/:groupId/notifications/:type" } )  ) {
				var view = new RequestedUsersView( { 'collection' : this.requestedUsers } );

				var self = this;
				view.on( 'requestItemComplete', function ( ) {
					self.currentUsers.fetch( {
						'success' : function () {
							_.each( self.currentUsers.models, function( element, index, list ) {
								if ( element.get( '_id' ) == self.model.get( 'owner' )._id ) {
									self.currentUsers.models[ index ].set( 'groupowner', 'true' );
								}
								if ( _.findWhere( self.permissions, { 'method' : 'get', 'route': '/groups/:groupId/users/:userId?' } )  ) {
									self.currentUsersRegion.show( new CurrentUsersView( null, { 'collection' : self.currentUsers } ) );
								}

							} );
						}
					} );
				} );

				this.requestedUsersRegion.show( view );
			}
		},

		'invitedUsersView' : function() {
			if ( _.findWhere( this.permissions, { 'method' : 'get', 'route': '/groups/:groupId/invited-users/:userId?' } )  ) {
				this.invitedUsersRegion.show( new InvitedUsersView(  { 'collection' : this.invitedUsers } ) );
			}

		}

	} );
} );