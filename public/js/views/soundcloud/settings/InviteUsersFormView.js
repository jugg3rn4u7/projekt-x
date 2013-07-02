define( function ( require ) {
	'use strict';

	var Backbone                = require( 'backbone' );
	var _                       = require( 'underscore' );
	var Marionette              = require( 'marionette' );
	var async                   = require( 'async' );
	var tmpl                    = require( 'text!templates/groups/settings/groupInviteForm.html' );
	var Vent                    = require( 'Vent' );

	var MultiSelectSearchBoxLayout = require( 'views/components/search/multi-select-searchbox/user-multi-search/UserMultiSelectSearchBox' );
	var NotificationsCollection    = require( 'NotificationsCollections/NotificationCollection' );

	var UserModel               = require( 'GroupModels/UserModel' );
	var NotificationModel       = require( 'NotificationsModels/NotificationModel' );

	return Marionette.Layout.extend( {

		'template'  : _.template( tmpl ),

		'className' : 'group-user-invite-form',

		'regions' : {
			'searchbox' : '#groups-invite-users'
		},

		'initialize' : function ( models, options  ) {
			_.bindAll( this );
			this.group = options.group;

			this.addUsersListener();
		},

		'onRender' : function( ) {
			this.searchbox.show( new MultiSelectSearchBoxLayout( null, { 'group' : this.group, 'type' : 'groups' } ) );
		},

		'addUsersListener' : function( ) {
			var self = this;
			this.listenTo( Vent, 'MultiSearchBox:Confirm', function ( collection ) {
				event.preventDefault();

				async.each( collection.models, function( user, callback ) {

					var invitedUser = {
						'_id'  : user.get( '_id' ),
						'name' : user.get( 'name' )
					};
					var userModel = new UserModel( null, {
						'groupId' : self.group.id,
						'type'    : 'invited-users'
					} );
					userModel.save( invitedUser, { 'success' : function () {

						var notification = new NotificationModel( null,
						{
							'target'   : 'users',
							'targetId' : user.get( '_id' )
						} );
						notification.save( self.createNotification( user ), { 'success' : function () {

							callback();
						}
					} );
					}
				} );
				}, function ( error ) {
					self.trigger( 'GroupMembership:inviteUser' );
					Vent.trigger( 'MultiSearchBox:Empty' );

				} );

				return this;
			} );
		},

		'createNotification' : function( user ) {
			var model = {
				'type'    : 'group-invite',
				'content' : 'You have been invited to join ' + this.group.get( 'name' ),
				'sender'  : {
					'group' : {
						'_id'  : this.group.id,
						'name' : this.group.get( 'name' )					}
					},

					'receiverActions' : [
					{
						'label'   : 'Accept',
						'message' : 'You have been added as a member of ' + this.group.get( 'name' ) + '.',
						'url'     : '/groups/' + this.group.id + '/accept-invite',
						'method'  : 'post',
						'body'    : {
							'_id'  : user.get( '_id' ),
							'name' : user.get( 'name' )
						},
						'priority' : 1
					},
					{
						'label'   : 'Ignore',
						'message' : 'You have ignored the membership request from ' + this.group.get( 'name' ),
						'url'     : '/groups/' + this.group.id + '/invited-users/' + user.get( '_id' ),
						'method'  : 'delete',
						'priority' : 0
					}
					],

					'senderActions' : [
					{
						'label'   : 'Cancel',
						'message' : 'You\'ve canceled your membership invite to ' + user.get( 'name' ) + '.',
						'url'     : '/groups/' + this.group.id + '/invited-users/' + user.get( '_id' ),
						'method'  : 'delete',
						'body'    : '',
						'priority' : 0
					}
					]
				};

				return model;
			}



		} );
} );