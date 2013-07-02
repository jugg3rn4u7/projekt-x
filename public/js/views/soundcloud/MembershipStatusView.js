define( function ( require ) {
	'use strict';

	var $                  = require( 'jquery' );
	var _                  = require( 'underscore' );
	var Marionette         = require( 'marionette' );

	var InvitedTemplate    = require( 'text!templates/groups/invited.html' );
	var RequestedTemplate  = require( 'text!templates/groups/requested.html' );
	var JoinTemplate       = require( 'text!templates/groups/join.html' );

	var NotificationModel  = require( 'NotificationsModels/NotificationModel' );
	var UserModel          = require( 'GroupModels/UserModel' );

	return Marionette.ItemView.extend( {
		'memberTemplate'    : _.template( '' ),
		'invitedTemplate'   : _.template( InvitedTemplate ),
		'requestedTemplate' : _.template( RequestedTemplate ),
		'joinTemplate'      : _.template( JoinTemplate ),
		'className'         : 'pull-right',

		'events' : {
			'click button' : 'joinButtonHandler'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );

			this.status = options.status;
			this.user   = options.user;

			return this;
		},

		'joinButtonHandler' : function ( event ) {

			var requestingUser = {
				'_id'  : this.user.id,
				'name' : this.user.name()
			};

			var properties = {
				'type'    : 'group-request',
				'content' : 'This user is requesting to join ' + this.model.get( 'name' ),

				'receiverActions' : [
					{
						'label'   : 'Accept',
						'message' : 'You\'ve accepted ' + this.user.name() + ' into the group.',
						'url'     : '/groups/' + this.model.id + '/accept-request',
						'method'  : 'post',
						'body'    : requestingUser,
						'priority' : 1
					},
					{
						'label'   : 'Ignore',
						'message' : 'You\'ve ignored the membership request from ' + this.user.name(),
						'url'     : '/groups/' + this.model.id + '/requested-users/' + this.user.id,
						'method'  : 'delete',
						'body'    : '',
						'priority' : 0
					}
				],

				'senderActions' : [
					{
						'label'   : 'Cancel',
						'message' : 'You\'ve canceled your membership request to ' + this.model.get( 'name' ),
						'url'     : '/groups/' + this.model.id + '/requested-users/' + this.user.id,
						'method'  : 'delete',
						'body'    : '',
						'priority' : 0
					}
				]
			};

			var options = {
				'targetId' : this.model.id,
				'target'   : 'groups'
			};

			var notification = new NotificationModel( properties, options );

			notification.save();

			var userModel = new UserModel( requestingUser, {
				'groupId' : this.model.id,
				'type'    : 'requested-users'
			} );
			userModel.save();

			this.status = -2;
			this.render();
		},

		'getTemplate' : function ( ) {

			if ( this.status === 0 ) {
				return Marionette.getOption(this, 'joinTemplate');
			} else if ( this.status === -1 ) {
				return Marionette.getOption(this, 'invitedTemplate');
			} else if ( this.status === -2 ) {
				return Marionette.getOption(this, 'requestedTemplate');
			} else {
				return Marionette.getOption(this, 'memberTemplate');
			}
		}
	} );
} );